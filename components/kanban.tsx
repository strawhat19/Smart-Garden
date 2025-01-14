import { Swapy, createSwapy } from 'swapy';
import React, { useState, useRef, useEffect } from 'react';

export interface Card {
  id: number;
  title: string;
}

export interface Column {
  id: number;
  title: string;
  cards: Card[];
}

export default function KanbanBoard() {
  const columnRefs = useRef<Swapy[]>([]);
  const swapyRef = useRef<Swapy | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerRefInner = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<Column[]>([
    { id: 1, title: `To Do`, cards: [{ id: 1, title: `Task 1` }, { id: 2, title: `Task 2` }] },
    { id: 2, title: `In Progress`, cards: [{ id: 3, title: `Task 3` }] },
    { id: 3, title: `Done`, cards: [{ id: 4, title: `Task 4` }] },
  ]);

  useEffect(() => {
    // if (containerRef.current) {
    //     swapyRef.current = createSwapy(containerRef.current, {
    //         animation: `spring`,
    //     });
    // }

    const currentCol = columnRefs.current;
    currentCol.forEach((swapyInstance, index) => {
      if (!swapyInstance && document.querySelector(`#column_${index}`)) {
        currentCol[index] = createSwapy(document.querySelector(`#column_${index}`)!, {
          animation: `spring`,
        });

        currentCol[index].onSwapEnd((event) => {
          const { hasChanged, slotItemMap } = event;
          if (hasChanged) {
            const updatedCards = Object.values(slotItemMap.asObject).map((card: string) => JSON.parse(card));
            setColumns((prevColumns) =>
              prevColumns.map((col, colIdx) =>
                colIdx === index ? { ...col, cards: updatedCards } : col
              )
            );
          }
        });
      }
    });

    return () => {
      currentCol.forEach((swapyInstance) => {
        swapyInstance?.destroy();
      });
    };
  }, [columns]);

//   const handleColumnSwapEnd = (event: any) => {
//     const { hasChanged, slotItemMap } = event;
//     if (hasChanged) {
//       const updatedColumns = Object.values(slotItemMap.asObject).map((col: any) =>
//         JSON.parse(col)
//       );
//       setColumns(updatedColumns);
//     }
//   }

  return (
    <div className="kanban-board">
      <div id="kanban-columns" ref={containerRef}>
        {columns.map((column, colIdx) => (
          <div
            key={column.id}
            id={`column_${colIdx}`}
            ref={containerRefInner}
            className="kanban-column slot"
            data-swapy-slot={colIdx + 1}
            data-swapy-item={JSON.stringify(column)}
          >
            <h3 className="kanban-column-title">{column.title}</h3>
            <div id={`column_cards_${colIdx}`} className="kanban-column-cards">
              {column.cards.map((card, cardIdx) => (
                <div
                  key={card.id}
                  className="kanban-card slot"
                  data-swapy-slot={cardIdx + 1}
                  data-swapy-item={JSON.stringify(card)}
                >
                  {card.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}