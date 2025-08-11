import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', done: false },
    { id: 2, text: 'Build a todo app', done: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;

    setTodos(prev => [
      ...prev,
      { id: Date.now(), text: newTodo.trim(), done: false },
    ]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={{ textAlign: 'center', marginBottom: 30, color: '#fff' }}>Todo List</h1>

        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTodo()}
            style={styles.input}
          />
          <button onClick={addTodo} style={styles.addButton}>Add</button>
        </div>

        <ul style={styles.list}>
          {todos.map(todo => (
            <li key={todo.id} style={styles.listItem}>
              <label style={styles.label}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                  style={styles.checkbox}
                />
                <span style={{
                  ...styles.checkmark,
                  backgroundColor: todo.done ? '#4caf50' : 'transparent',
                  borderColor: todo.done ? '#4caf50' : '#ccc',
                }}>
                  {todo.done && (
                    <svg
                      width="12"
                      height="10"
                      viewBox="0 0 12 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ display: 'block', margin: 'auto' }}
                    >
                      <path
                        d="M1 5L4 8L11 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span style={{
                  marginLeft: 12,
                  textDecoration: todo.done ? 'line-through' : 'none',
                  color: todo.done ? '#bbb' : '#333',
                  userSelect: 'none',
                  fontSize: 16,
                }}>
                  {todo.text}
                </span>
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={styles.deleteButton}
                aria-label={`Delete ${todo.text}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: '30px 40px',
    width: 400,
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
  },
  inputContainer: {
    display: 'flex',
    marginBottom: 24,
    borderRadius: 50,
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  input: {
    flex: 1,
    border: 'none',
    padding: '12px 20px',
    fontSize: 16,
    outline: 'none',
  },
  addButton: {
    backgroundColor: '#764ba2',
    color: '#fff',
    border: 'none',
    padding: '0 24px',
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: '600',
    borderRadius: 0,
    transition: 'background-color 0.3s',
  },
  list: {
    listStyle: 'none',
    paddingLeft: 0,
    margin: 0,
    maxHeight: 320,
    overflowY: 'auto',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    cursor: 'pointer',
    userSelect: 'none',
  },
  checkbox: {
    display: 'none', // hide default checkbox
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    border: '2px solid #ccc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s ease',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#cc0000',
    fontSize: 24,
    lineHeight: 1,
    cursor: 'pointer',
    marginLeft: 16,
    userSelect: 'none',
    transition: 'color 0.2s',
  }
};

export default App;
