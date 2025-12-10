import React, { useEffect, useState } from 'react'
import './todolist.css';
function ToDoList() {
  const [todos, setTodos] = useState([])
  const [task, setTask] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("todos")
    if (saved){
        setTodos(JSON.parse(saved))
    } else{
        setTodos([]);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addToDo = () => {
    if (!task.trim()) return
     const newTodo = { id: Date.now(), text: task}
    setTodos([...todos, newTodo])
    setTask("")
  }

  const deleteToDo = (id) => {
    setTodos(todos.filter((t) => t.id !== id))
  }

  return (
    <div className="container">
  <h1>Todo App</h1>
  <div className="inputBox">
    <input
      type="text"
      value={task}
      onChange={(e) => setTask(e.target.value)}
      placeholder="Add task..."
    />
    <button onClick={addToDo}>Add</button>
  </div>
  <ul>
    {todos.map((t) => (
      <li key={t.id}>
        {t.text} <button onClick={() => deleteToDo(t.id)}>X</button>
      </li>
    ))}
  </ul>
</div>

  )
}

export default ToDoList
