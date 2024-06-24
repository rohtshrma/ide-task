import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Note from '../note';

const initialNotes = {
  todo: [],
  inProgress: [],
  done: []
};

const NoteMaker = ({ file }) => {
  const [notes, setNotes] = useState(file.notes || initialNotes);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const items = Array.from(notes[source.droppableId]);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setNotes((prev) => ({
        ...prev,
        [source.droppableId]: items
      }));
    } else {
      const sourceItems = Array.from(notes[source.droppableId]);
      const destItems = Array.from(notes[destination.droppableId]);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);
      setNotes((prev) => ({
        ...prev,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex justify-between">
        {Object.keys(notes).map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                className="w-1/3 p-4 bg-gray-100"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3>{status}</h3>
                {notes[status].map((note, index) => (
                  <Draggable key={note.id} draggableId={note.id} index={index}>
                    {(provided) => (
                      <Note
                        note={note}
                        provided={provided}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default NoteMaker;
