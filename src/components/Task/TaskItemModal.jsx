import React from 'react';
import './CSS/TaskItemModal.css';

class TaskItemModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {}
    }
  }

  componentDidMount() {
    this.setState({
      task: {}
    })
  }
  componentDidUpdate(prev) {
    // this.setState({
      
    // })
  }
  render() {    
    let showHideClassName = this.props.showModal === "show" ? "modal show-modal" : "modal hide-modal";
    // let taskText = props.taskText ? props.taskText : "";
    let {task} = this.state;

    return (
      <div className={showHideClassName}>
        <div className="wrapper" onClick={this.props.handleCancel}>
        </div>
        <div className="centered modal-content">
            <h2>{this.props.mode}</h2>
          
            <label>Task title</label>
            <input className="txt-box task-title" type="text" onChange={(e => {task.title = e.target.value})} value={task.taskTitle || ""}></input>
            
            <label>Task Text</label>
            <input className="txt-box task-text" type="text" value={task.taskText || ""}></input>

            <span className="btn-row">
              {/* <button onClick={this.props.handleSave(task)}>Save</button>
              <button onClick={this.props.handleCancel}>Cancel</button> */}
            </span>
          </div>
      </div>
    )
  }
}

export default TaskItemModal;