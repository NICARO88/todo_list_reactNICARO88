import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState ("");
  const [todoList, setTodoList] = useState([]);
  console.log (inputValue);
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
              onKeyDown={(e)=> e.key === 'Enter' ? setTodoList(todoList.concat(inputValue), setInputValue("")) : null}
            ></input>
          </li>
          {todoList.map((todoItem, index) => (
            <li key={index} className="li_css">
              <div>{todoItem}</div> <div><i className="fa-solid fa-x" onClick={()=> setTodoList(todoList.filter(item => item !== todoItem))}></i></div>
            </li>
          ))}
        </ul>
      </div>
      <div id="tasks_left">{todoList.length} item left</div>
    </div>
  );
}

export default App;