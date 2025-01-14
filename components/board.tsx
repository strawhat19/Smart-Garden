import { createSwapy, Swapy } from "swapy";
import { useEffect, useRef, useState } from "react";

export interface Card {
  id: number;
  title: string;
}

export interface Column {
  id: number;
  title: string;
  cards: Card[];
}

export default function Board() {
  const columnSwapyRef = useRef<Swapy | null>(null);
  const columnContainerRef = useRef<HTMLDivElement>(null);

  const [columns, setColumns] = useState<Column[]>([
    { id: 1, title: `To Do`, cards: [{ id: 1, title: `Task 1` }, { id: 2, title: `Task 2` }] },
    { id: 2, title: `In Progress`, cards: [{ id: 3, title: `Task 3` }] },
    { id: 3, title: `Done`, cards: [{ id: 4, title: `Task 4` }] },
  ]);

  useEffect(() => {
    // Initialize Swapy for columns
    if (columnContainerRef.current) {
      columnSwapyRef.current = createSwapy(columnContainerRef.current, {
        animation: "spring",
      });

      columnSwapyRef.current.onSwapEnd((event) => {
        const { hasChanged, slotItemMap } = event;
        if (hasChanged) {
          const updatedColumns = Object.values(slotItemMap.asObject).map((col: string) =>
            JSON.parse(col)
          );
          setColumns(updatedColumns);
        }
      });
    }

    // Cleanup Swapy instance on unmount
    return () => {
      columnSwapyRef.current?.destroy();
    };
  }, []);

  const handleCardReorder = (columnIndex: number, event: any) => {
    const { hasChanged, slotItemMap } = event;
    if (hasChanged) {
      const updatedCards = Object.values(slotItemMap.asObject).map((card: any) =>
        JSON.parse(card)
      );

      setColumns((prevColumns) =>
        prevColumns.map((col, idx) =>
          idx === columnIndex ? { ...col, cards: updatedCards } : col
        )
      );
    }
  };

  return (
    <div
      className="board"
      ref={columnContainerRef}
      style={{ display: "flex", gap: "15px" }}
    >
      {columns.map((col, colIdx) => (
        <div
          key={col.id}
          className="slot colSlot"
          data-swapy-slot={colIdx + 1}
          style={{ flex: 1 }}
        >
          <div
            className="column"
            data-swapy-item={JSON.stringify(col)}
            style={{
              color: "black",
              padding: "15px 30px",
              background: "white",
              borderRadius: "15px",
            }}
          >
            <h3>{col.title}</h3>
            <div
              className="colCards"
              id={`column_${colIdx}`}
              style={{ marginTop: "15px" }}
              ref={(el) => {
                if (el) {
                  const cardSwapy = createSwapy(el, { animation: "spring" });
                  cardSwapy.onSwapEnd((event) => handleCardReorder(colIdx, event));
                }
              }}
            >
              {/* {col.cards.map((card, cardIdx) => (
                <div
                  key={card.id}
                  className="slot colCardSlot"
                  data-swapy-slot={cardIdx + 1}
                >
                  <div
                    className="colCard"
                    data-swapy-item={JSON.stringify(card)}
                    style={{
                      color: "white",
                      padding: "15px 30px",
                      background: "black",
                      borderRadius: "15px",
                    }}
                  >
                    {card.title}
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


// import ColumnCards from './columncards';
// import { createSwapy, Swapy } from 'swapy';
// import { useEffect, useRef, useState } from 'react';

// export interface Card {
//     id: number;
//     title: string;
// }
  
// export interface Column {
//     id: number;
//     title: string;
//     cards: Card[];
// }

// export default function Board() {
//     let swapyRef = useRef<Swapy | null>(null);
//     let containerRef = useRef<HTMLDivElement>(null);
//     // let containerRefInner = useRef<HTMLDivElement>(null);
    
//     let [columns, setColumns] = useState<Column[]>([
//         { id: 1, title: `To Do`, cards: [{ id: 1, title: `Task 1` }, { id: 2, title: `Task 2` }] },
//         { id: 2, title: `In Progress`, cards: [{ id: 3, title: `Task 3` }] },
//         { id: 3, title: `Done`, cards: [{ id: 4, title: `Task 4` }] },
//     ]);

//     useEffect(() => {
//         if (containerRef.current) {
//             swapyRef.current = createSwapy(containerRef.current, {
//                 animation: `spring`,
//             });
//             // if (containerRefInner.current) {
//             //     swapyRef.current = createSwapy(containerRefInner.current, {
//             //         animation: `spring`,
//             //     });
//             // }
//         }

//         return () => {
//             swapyRef.current?.destroy();
//         }
//     }, [])

//     const handleCardReorder = (columnIndex: number, event: any) => {
//         const { hasChanged, slotItemMap } = event;
//         if (hasChanged) {
//           const updatedCards = Object.values(slotItemMap.asObject).map((card: any) =>
//             JSON.parse(card)
//           );
    
//           setColumns((prevColumns) =>
//             prevColumns.map((col, idx) =>
//               idx === columnIndex ? { ...col, cards: updatedCards } : col
//             )
//           );
//         }
//     };

//     return (
//         <div className={`board`} ref={containerRef} style={{ display: `flex`, gridGap: 15 }}>
//             {columns.map((col: Column, cIdx: any) => {
//                 return (
//                     <div key={cIdx} className={`slot colSlot`} data-swapy-slot={cIdx + 1}>
//                         <div className={`column cursorGrab`} data-swapy-item={JSON.stringify(col)} style={{ color: `black`, padding: `15px 30px`, background: `white`, borderRadius: `15px` }}>
//                             {col.title}
//                             <div className={`colCards`} ref={(el) => {
//                                 if (el) {
//                                     const cardSwapy = createSwapy(el, { animation: `spring` });
//                                     cardSwapy.onSwapEnd((event) => handleCardReorder(cIdx, event));
//                                 }
//                             }}>
//                                 {col.cards.map((crd: Card, cdIndx: any) => {
//                                     return (
//                                         <div key={cdIndx} className={`slot colCardSlot`}>
//                                             <div className={`colCard`} style={{ color: `white`, padding: `15px 30px`, background: `black`, borderRadius: `15px` }}>
//                                                 {crd.title}
//                                             </div>
//                                         </div>
//                                     )
//                                 })}
//                             </div>
//                         </div>
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }