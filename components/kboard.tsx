import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialColumns = {
  todo: {
    name: 'To Do',
    items: [
      { id: `task_1`, content: 'Task 1' },
      { id: `task_2`, content: 'Task 2' },
    ],
  },
  inProgress: {
    name: 'In Progress',
    items: [
      { id: `task_3`, content: 'Task 3' },
    ],
  },
  done: {
    name: 'Done',
    items: [
      { id: `task_4`, content: 'Task 4' },
    ],
  },
};

export default function Kboard() {
  const [columns, setColumns] = useState<any>(initialColumns);

  const onDragEnd = (result: any) => {
    if (!result.destination) return; // Dropped outside

    const { source, destination } = result;
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];

    const [removed] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
      });
    } else {
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
        [destination.droppableId]: { ...destColumn, items: destItems },
      });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(columns).map(([columnId, column]: any) => (
          <div key={columnId} style={{ margin: '0 20px' }}>
            <h2>{column.name}</h2>
            <Droppable droppableId={columnId}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: '#f0f0f0',
                    padding: '20px',
                    width: '250px',
                    minHeight: '400px',
                  }}
                >
                  {column.items.map((item: any, index: any) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: 'none',
                            padding: '16px',
                            margin: '0 0 8px 0',
                            backgroundColor: '#ffffff',
                            borderRadius: '4px',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
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
        ))}
      </DragDropContext>
    </div>
  );
}