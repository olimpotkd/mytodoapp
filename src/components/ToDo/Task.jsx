import React from 'react';
import './CSS/Task.css'

const Task = (props) => {
  const { task, finishTask, deleteTask, editTask } = props;

  return(
    <li className="task-item">
      <span>{task.taskText}</span>
      <span className="bottom-bar">
        {task.status}
        <ul className="button-wrapper">  
          <li >
            <i onClick={finishTask} className="fas fa-check-circle task-item-buttons color-green"></i>
          </li>
          
          <li >
            <i onClick={editTask} className="fas fa-edit task-item-buttons color-blue" ></i>
          </li>
          
          <li >
            <i onClick={deleteTask} className="fas fa-trash task-item-buttons color-red" ></i>
          </li>  
        </ul>
      </span>
    </li>
  );
}

export default Task;