import { useEffect, useState } from 'react';
import Todo from './Todo';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editableId, setEditableId] = useState(-1);

  const fetchData = async () => {
    const raw = await fetch('http://localhost:8081/todo');
    const data = await raw.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleDone = (id, done) => {
    const toggle = async () => {
      await fetch(`http://localhost:8081/todo/${id}/done/${done}`, {
        method: 'PUT',
      });
      fetchData();
    };
    toggle();
  };

  const addTodo = () => {
    const add = async () => {
      await fetch('http://localhost:8081/todo', {
        method: 'POST',
        body: JSON.stringify({ text: text, done: false }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchData();
    };
    add();
  };

  const keyDown = async (e, id) => {
    const isValidShortcut = e.ctrlKey && e.keyCode != 86;

    const isValidKeyCode = [8, 16, 17, 37, 38, 39, 40, 46].includes(e.keyCode);
    const maxLength = parseInt(e.target.getAttribute('maxLength'));
    const text = e.target.innerText;
    console.log(1, maxLength, text);

    if (text.length >= maxLength && !isValidKeyCode && !isValidShortcut) {
      e.preventDefault();
    }

    if (e.keyCode === 13) {
      e.target.classList.remove('border');
      e.target.setAttribute('contenteditable', 'false');
      const text = e.target.textContent;
      await fetch(`http://localhost:8081/todo/${id}/text/${text}`, {
        method: 'PUT',
      });
      e.preventDefault();
      fetchData();
    }
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:8081/todo/${id}`, {
      method: 'DELETE',
    });
    fetchData();
  };

  return (
    <div className='main'>
      <h1>Todo List</h1>
      <div className='add-todo'>
        <input
          type='text'
          placeholder='Your task'
          maxLength={30}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addTodo}>Add todo</button>
      </div>
      <div className='todos'>
        {todos.map((todo, i) => (
          <Todo
            key={i}
            toggle={() => toggleDone(todo.id, !todo.done)}
            text={todo.text}
            done={todo.done}
            setEditable={() => setEditableId(todo.id)}
            editable={editableId === todo.id}
            id={todo.id}
            enter={keyDown}
            deleteTodo={() => deleteTodo(todo.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
