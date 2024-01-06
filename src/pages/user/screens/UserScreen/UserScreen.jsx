import { mockData } from "@/api/mock-data";
import ColumnWrapper from "@/pages/user/components/Column/Column";
import Column from "@/pages/user/components/Column/Column";
import { generatePlaceholderCard, mapOrder } from "@/utils/formatters";
import {
  DndContext,
  DragOverlay,
  MouseSensor, // PointerSensor,
  TouchSensor,
  closestCorners,
  defaultDropAnimationSideEffects,
  getFirstCollision,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Box } from "@mui/material";
import { cloneDeep, isEmpty } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useCallback } from "react";

import Card from "../../components/Card/Card";
import { ACTIVE_DRAG_ITEM_TYPE } from "../../constants/constants";

export default function UserScreen() {
  const [orderedColumns, setOrderedColumns] = useState([]);
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null);

  // điểm va chạm cuối cùng (xử lý thuật toán phát hiện va chạm)
  const lastOverId = useRef(null);
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 },
  // });
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 500 },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(
    () =>
      setOrderedColumns(
        mapOrder(
          mockData?.board?.columns,
          mockData?.board?.columnOrderIds,
          "_id"
        )
      ),
    []
  );

  const findColumnByCardId = cardId => {
    return orderedColumns.find(c =>
      c.cards.map(card => card._id)?.includes(cardId)
    );
  };
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(pre => {
      const overCardIndex = overColumn?.cards?.findIndex(
        c => c._id === overCardId
      );

      let newCardIndex;
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;
      const modifier = isBelowOverItem ? 1 : 0;

      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1;

      const nextColumns = cloneDeep(pre);
      const nextActiveColumn = nextColumns.find(
        c => c._id === activeColumn._id
      );
      const nextOverColumn = nextColumns.find(c => c._id === overColumn._id);

      if (nextActiveColumn) {
        // xoá card ở cái Column active ( cũng có thể hiểu là column cũ, cái lúc mà kéo card ra khỏi nó để sang column khác)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          c => c._id !== activeDraggingCardId
        );

        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)];
        }
        // cập nhật lại mảng cardOderIds cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(c => c._id);
      }

      if (nextOverColumn) {
        // kiểm tra xem Card đang kéo có tồn tại ở ovẻColumn chưa, nếu có thì cần xoá nó trước
        nextOverColumn.cards = nextOverColumn.cards.filter(
          c => c._id !== activeDraggingCardId
        );

        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id,
        };

        // tiếp theo là thêm card đnag kéo vào overColumn theo vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards
          .toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
          .filter(card => !card.FE_placeholderCard);

        // cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextOverColumn.cardOderIds = nextOverColumn.cards.map(c => c._id);
      }

      return nextColumns;
    });
  };
  const collisionDetectionStrategy = useCallback(
    args => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args });
      }

      const pointerIntersections = pointerWithin(args);
      if (!pointerIntersections?.length) return;
      // eslint-disable-next-line no-extra-boolean-cast
      // const intersections = !!pointerIntersections?.length
      //   ? pointerIntersections
      //   : rectIntersection(args);

      // tìm overId đầu tiên của Intersections
      let overId = getFirstCollision(pointerIntersections, "id");
      if (overId) {
        const checkColumn = orderedColumns.find(c => c._id === overId);

        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              container =>
                container._id !== overId &&
                checkColumn?.cardOrderIds?.includes(container.id)
            ),
          })[0]?.id;
        }
        lastOverId.current = overId;
        return [{ id: overId }];
      }
    },
    [activeDragItemType, orderedColumns]
  );

  const handleDragStart = e => {
    const { active } = e;

    setActiveDragItemId(active?.id);
    setActiveDragItemType(
      active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(active?.data?.current);

    if (active?.data?.current?.columnId)
      setOldColumnWhenDraggingCard(findColumnByCardId(active?.id));
  };
  const handleDragOver = e => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    const { active, over } = e;

    if (!active || !over) return;

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const { id: overCardId } = over;

    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      );
    }
  };
  const handleDragEnd = e => {
    const { active, over } = e;

    if (!active || !over) return;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      const { id: overCardId } = over;

      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);

      if (!oldColumnWhenDraggingCard || !overColumn) return;

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        );
      } else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          c => c._id === activeDragItemId
        );
        const newCardIndex = overColumn?.cards?.findIndex(
          c => c._id === overCardId
        );

        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        );

        setOrderedColumns(pre => {
          const nextColumns = cloneDeep(pre);
          const targetColumn = nextColumns.find(c => c._id === overColumn._id);

          targetColumn.cards = dndOrderedCards;
          targetColumn.cardOrderIds = dndOrderedCards.map(c => c._id);

          return nextColumns;
        });
      }
    }

    if (
      activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN &&
      active.id !== over.id
    ) {
      const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id);
      const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id);

      const dndOrderedColumn = arrayMove(
        orderedColumns,
        oldColumnIndex,
        newColumnIndex
      );

      setOrderedColumns(dndOrderedColumn);
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: "0.5",
      },
    }),
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={orderedColumns?.map(c => c?._id)}
        strategy={horizontalListSortingStrategy}
      >
        <Box
          sx={{
            height: theme =>
              `calc(100vh - ${theme.trello.appBarHeigh} - ${theme.trello.boardBarHeight} - 10px)`,
            display: "flex",
            alignItems: "start",
            width: "100%",
            bgcolor: "transparent",
            padding: "15px",
            gap: "15px",
            overflowX: "auto",
          }}
        >
          {orderedColumns?.map(column => (
            <ColumnWrapper column={column} key={column._id} />
          ))}
        </Box>
      </SortableContext>

      <DragOverlay dropAnimation={dropAnimation}>
        {!activeDragItemType && null}

        {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
          <Column column={activeDragItemData} />
        )}
        {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
          <Card card={activeDragItemData} />
        )}
      </DragOverlay>
    </DndContext>
  );
}
