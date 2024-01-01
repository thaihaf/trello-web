import { mockData } from "@/api/mock-data";
import ColumnWrapper from "@/pages/user/components/Column/Column";
import Column from "@/pages/user/components/Column/Column";
import { mapOrder } from "@/utils/formatters";
import {
  DndContext,
  DragOverlay,
  MouseSensor, // PointerSensor,
  TouchSensor,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import Card from "../../components/Card/Card";
import { ACTIVE_DRAG_ITEM_TYPE } from "../../constants/constants";

export default function UserScreen() {
  const [orderedColumns, setOrderedColumns] = useState([]);
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
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

  const handleDragStart = e => {
    const { active, over } = e;

    setActiveDragItemId(active?.id);
    setActiveDragItemType(
      active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(active?.data?.current);
  };
  const handleDragEnd = e => {
    const { active, over } = e;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id);
      const newIndex = orderedColumns.findIndex(c => c._id === over.id);

      const dndOrderedColumn = arrayMove(orderedColumns, oldIndex, newIndex);
      // const dndOrderedColumnIds = dndOrderedColumn.map(c => c._id);
      // console.log(dndOrderedColumnIds);
      setOrderedColumns(dndOrderedColumn);
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
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
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
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
