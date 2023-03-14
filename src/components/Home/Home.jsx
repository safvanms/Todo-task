import React, { useState, useEffect } from 'react'
import './Home.css'
import { BiEdit } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'

export default function Home() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('')

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || []
    setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (todo) {
      const newTodo = { id: Date.now(), title: todo, completed: false }
      setTodos([...todos, newTodo])
      setTodo('')
    }
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const editTodo = (id, title) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)))
  }

  return (
    <div className="App">
      <div className="todo">
        <h1>Todo App</h1>
        <div className="input-sec">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter task here..."
            required
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <div>
          {todos.map((todo) => (
            <div key={todo.id} className="lists">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}
              >
                <div className="list">{todo.title}</div>
              </span>
              <div className="actions">
                <button
                  onClick={() => {
                    const newTitle = prompt('Edit Todo', todo.title)
                    if (newTitle !== null) {
                      editTodo(todo.id, newTitle)
                    }
                  }}
                >
                  <BiEdit />
                </button>
                <button onClick={() => deleteTodo(todo.id)}>
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
