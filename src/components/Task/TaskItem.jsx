import React from 'react';
import './CSS/TaskItem.css'

const TaskItem = (props) => {
  const { task, finishTask, deleteTask, editTask } = props;

  return(
    <li className="task-item">
      <span>{task.taskText}</span>
      <span className="bottom-bar">
        {task.status}
        <ul className="button-wrapper">  
          <li >
            <i onClick={finishTask} class="fas fa-check-circle task-item-buttons color-green"></i>
          </li>
          
          <li >
            <i onClick={editTask} class="fas fa-edit task-item-buttons color-blue" ></i>
          </li>
          
          <li >
            <i onClick={deleteTask} class="fas fa-trash task-item-buttons color-red" ></i>
          </li>  
        </ul>
      </span>
    </li>
  );
}

export default TaskItem;