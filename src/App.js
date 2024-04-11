import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);

  function obtenerTareas() {
    fetch("https://playground.4geeks.com/todo/users/Daniel", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch todo list');
        }
        return response.json();
      })
    .then(data => setTodoList(Array.isArray(data)? data : []))
    .catch(error => console.error(error));
  }
  

  useEffect(() => {
    obtenerTareas();
  }, [])

  function agregarTareas() {
    if (inputValue.trim()!== "") {
      fetch("https://playground.4geeks.com/todo/todos/Daniel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: inputValue, is_done: false }),
      })
     .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add todo');
          }
          return response.json();
        })
     .then(data => {
          setTodoList([...todoList, data]);
          setInputValue("");
        })
     .catch(error => {
          console.error(error);
        });
    }
  }
  

  function quitarTarea(index) {
    const todoListActualizada = todoList.filter((elemento, indice)=>indice!== index);
    
  
    fetch("https://playground.4geeks.com/todo/todos/" + todoList[index].id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoListActualizada.length > 0? todoListActualizada:[{label:"example task", is_done:false}]),
    })
   .then(response => {
        if (!response.ok) {
          throw new Error('Failed to modify todo');
        }
        return response.text(); 
      })
   .then(data => {
        console.log(data); 
        setTodoList(todoListActualizada);
      })
   .catch(error => {
        console.error(error); 
      });
  }

  function borrarTodasLasTareas() {
    let ids = todoList.map((todoItem) => todoItem.id);
    ids.forEach((id) => {
      fetch("https://playground.4geeks.com/todo/todos/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to clean todos");
          }
          return response.text();
        })
        .then((data) => {
          setTodoList([]);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  return (
    <div className="container">
      <div className="todolistcard">
        <div className="todo"><h1>todos</h1></div>
        <ul>
          <li>
            <input
              type="text"
              placeholder="What needs to be done?"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              onKeyDown={(event) => {
                if (event.key === "Enter" && inputValue.trim()!== "") {
                  event.preventDefault();
                  agregarTareas(inputValue);
                }
              }}
              
            ></input>
          </li>
          {Array.isArray(todoList) && todoList.map((todoItem, index) => (
            <li key={index} className="li_css">
              <div>{todoItem.label}</div>
              <div>
                <i className="fa-solid fa-x" onClick={() => quitarTarea(index)}></i>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div id="tasks_left">{todoList.length} item left</div>
      <button onClick={borrarTodasLasTareas}>Clean All</button>
    </div>
  );
}

export default App;
