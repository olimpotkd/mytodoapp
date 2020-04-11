import React from 'react';
import './MyToDoApp.css';
import ToDo from './components/ToDo/ToDo.jsx';

function MyToDoApp() {
  return (
    <div className="todo-app">
      <h1>My TODO App</h1>

      <h2>Tasks</h2>
      <div className="tasks-container">
        <ToDo></ToDo>
      </div>
    </div>
  );
}

export default MyToDoApp;