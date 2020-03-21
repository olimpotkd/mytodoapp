import React from 'react';
import './MyToDoApp.css';
import Task from './components/Task/Task.jsx';

function MyToDoApp() {
  return (
    <div>
      <h1>My TODO App</h1>

      <h2>Tasks</h2>
      <div className="tasks-container">
        <Task></Task>
      </div>
    </div>
  );
}

export default MyToDoApp;
