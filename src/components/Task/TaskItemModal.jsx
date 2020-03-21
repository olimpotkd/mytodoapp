import React from 'react';
import './CSS/TaskItemModal.css';

const TaskItemModal = (props) => {
  return (
    <div className="modal-wrapper">
      <div className="centered modal-content">
        <button onClick={props.destroy}></button>
      </div>
    </div>
  )
}

export default TaskItemModal;