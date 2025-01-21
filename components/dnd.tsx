import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

interface Item {
  id: string;
  content: string;
}

const initialItems1: Item[] = [
  { id: "item-1", content: "Item 1" },
  { id: "item-2", content: "Item 2" },
  { id: "item-3", content: "Item 3" },
];

const initialItems2: Item[] = [
  { id: "item-4", content: "Item 4" },
  { id: "item-5", content: "Item 5" },
];

export default function DND() {
  const [list1, setList1] = useState<Item[]>(initialItems1);
  const [list2, setList2] = useState<Item[]>(initialItems2);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // If dropped outside a droppable area
    if (!destination) {
      return;
    }

    // If dropped in the same location, do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // Helper function to reorder items in a list
    const reorder = (list: Item[], startIndex: number, endIndex: number): Item[] => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };

    // Helper function to move items between lists
    const move = (
      sourceList: Item[],
      destinationList: Item[],
      sourceIndex: number,
      destinationIndex: number
    ): { source: Item[]; destination: Item[] } => {
      const sourceClone = Array.from(sourceList);
      const destinationClone = Array.from(destinationList);
      const [removed] = sourceClone.splice(sourceIndex, 1);
      destinationClone.splice(destinationIndex, 0, removed);

      return {
        source: sourceClone,
        destination: destinationClone,
      };
    };

    // Handle drag and drop between lists
    if (source.droppableId === "list1" && destination.droppableId === "list2") {
      const { source: updatedList1, destination: updatedList2 } = move(
        list1,
        list2,
        source.index,
        destination.index
      );
      setList1(updatedList1);
      setList2(updatedList2);
    } else if (source.droppableId === "list2" && destination.droppableId === "list1") {
      const { source: updatedList2, destination: updatedList1 } = move(
        list2,
        list1,
        source.index,
        destination.index
      );
      setList2(updatedList2);
      setList1(updatedList1);
    } else if (source.droppableId === "list1") {
      setList1(reorder(list1, source.index, destination.index));
    } else if (source.droppableId === "list2") {
      setList2(reorder(list2, source.index, destination.index));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", justifyContent: "space-around", padding: "20px" }}>
        {/* List 1 */}
        <Droppable droppableId="list1">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: "#f0f0f0",
                padding: "10px",
                width: "200px",
                minHeight: "300px",
              }}
            >
              <h3>List 1</h3>
              {list1.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        padding: "10px",
                        margin: "0 0 10px 0",
                        background: "#fff",
                        border: "1px solid #ccc",
                        ...provided.draggableProps.style,
                      }}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* List 2 */}
        <Droppable droppableId="list2">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: "#f0f0f0",
                padding: "10px",
                width: "200px",
                minHeight: "300px",
              }}
            >
              <h3>List 2</h3>
              {list2.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        padding: "10px",
                        margin: "0 0 10px 0",
                        background: "#fff",
                        border: "1px solid #ccc",
                        ...provided.draggableProps.style,
                      }}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
