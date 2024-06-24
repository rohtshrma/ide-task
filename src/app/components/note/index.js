const Note = ({ note, provided }) => {
  return (
    <div
      className="p-2 bg-white border my-2"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {note.content}
    </div>
  );
};

export default Note;
