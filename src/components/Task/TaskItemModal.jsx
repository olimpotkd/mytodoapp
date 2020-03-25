import React from 'react';

import './CSS/TaskItemModal.css';

const TaskItemModal = (props) => {
  console.log(props.showModal)
  let showHideClassName = props.showModal === "show" ? "modal show-modal" : "modal hide-modal";
  // let taskText = props.taskText ? props.taskText : "";

  return (
    <div className={showHideClassName}>
      <div className="centered modal-content">
        <label>Task</label>
        <input type="text" ></input>
        {/* <button onClick={props.handleSave(task)}></button> */}
        {/* <button onClick={props.handleClose}></button> */}
      </div>
    </div>
  )
}

export default TaskItemModal;