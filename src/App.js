import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Learn React', done: false },
      { id: 2, text: 'Build a todo app', done: false },
    ];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);


  const addTodo = () => {
    const trimmed = newTodo.trim();
    if (trimmed === '') return;

    if (editingId) {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === editingId ? { ...todo, text: trimmed } : todo
        )
      );
      setEditingId(null); // Exit edit mode
    } else {
      setTodos(prev => [
        ...prev,
        { id: Date.now(), text: trimmed, done: false },
      ]);
    }

    setNewTodo('');
  };

  const startEditing = (todo) => {
  setNewTodo(todo.text);
  setEditingId(todo.id);
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
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: 30, 
          color: '#000', 
          textShadow: '0 2px 6px rgba(0,0,0,0.6)',
          fontWeight: '700',
          fontSize: '2.5rem',
        }}>
          Todo List
        </h1>

        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTodo()}
            style={styles.input}
          />
          <button onClick={addTodo} style={styles.addButton}>
            {editingId ? 'Update' : 'Add'}
          </button>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setNewTodo('');
              }}
              style={{ ...styles.addButton, backgroundColor: '#aaa', marginLeft: 8 }}
            >
              Cancel
            </button>
          )}
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
                <span
                  onClick={() => startEditing(todo)}
                  style={{
                    marginLeft: 12,
                    textDecoration: todo.done ? 'line-through' : 'none',
                    color: todo.done ? '#bbb' : '#333',
                    userSelect: 'none',
                    fontSize: 16,
                    cursor: 'pointer',
                  }}
                >
                  {todo.text}
                </span>
              </label>

              <div style={{ display: 'flex', gap: 8, marginLeft: 16 }}>
                <button
                  onClick={() => startEditing(todo)}
                  style={styles.editButton}
                  aria-label={`Edit ${todo.text}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg"
                    width="15" 
                    height="15" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#a30407" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round">
                    <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                    <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                  </svg>
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={styles.deleteButton}
                  aria-label={`Delete ${todo.text}`}
                >
                  ×
                </button>
              </div>
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
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 80,
    paddingBottom: 40,
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
  // addButton: {
  //   backgroundColor: '#764ba2',
  //   color: '#fff',
  //   border: 'none',
  //   padding: '0 24px',
  //   cursor: 'pointer',
  //   fontSize: 16,
  //   fontWeight: '600',
  //   borderRadius: 0,
  //   transition: 'background-color 0.3s',
  // },
  // cancelButton: {
  //   backgroundColor: '#aaa', // grayish
  //   color: '#333',
  //   border: 'none',
  //   padding: '0 24px',
  //   cursor: 'pointer',
  //   fontSize: 16,
  //   fontWeight: '600',
  //   borderRadius: 4,
  //   transition: 'background-color 0.3s',
  //   marginLeft: 8,
  // },
  editButton: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    margin: 0,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 4,
    transition: 'background-color 0.2s',
  },

  updateButton: {
    backgroundColor: '#764ba2', // purple
    color: '#fff',
    border: 'none',
    padding: '0 24px',
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: '600',
    borderRadius: 4,       // smoother radius for better look
    transition: 'background-color 0.3s',
    marginLeft: 8,         // some spacing if next to cancel
  },

  
  addButton: {
    backgroundColor: '#764ba2',
    color: '#fff',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: '600',
    borderRadius: 50,          // big radius to make pill shape
    transition: 'background-color 0.3s',
    userSelect: 'none',
  },

  cancelButton: {
    backgroundColor: '#aaa',
    color: '#333',
    border: 'none',
    padding: '10px 28px',     
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: '600',
    transition: 'background-color 0.3s',
    marginLeft: 0,
    userSelect: 'none',
  },

  list: {
    listStyle: 'none',
    paddingLeft: 0,
    margin: 0,
    maxHeight: 700,
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
