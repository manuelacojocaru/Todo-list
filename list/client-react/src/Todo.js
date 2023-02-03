export default function Todo({ text, done, toggle, editable, setEditable, enter, id, deleteTodo }) {
  return (
    <div className='todo'>
      {done ? (
        <i onClick={toggle} className='fa-regular fa-square-check'></i>
      ) : (
        <i onClick={toggle} className='fa-regular fa-square'></i>
      )}
      <span
        className={editable ? 'todo-text border' : 'todo-text'}
        maxLength='30'
        onKeyDown={(e) => enter(e, id)}
        contentEditable={editable ? 'true' : 'false'}
      >
        {text}
      </span>
      <div className='edit'>
        <i onClick={setEditable} className='fa-solid fa-pen'></i>
        <i onClick={deleteTodo} className='fa-solid fa-trash'></i>
      </div>
    </div>
  );
}
