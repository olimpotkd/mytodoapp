import React from 'react';

import './CSS/NewTaskModal.css';

class NewTaskModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      task: {}
    }


    this.handleTitleChange = this.handleTitleChange.bind();
    this.handleTextChange = this.handleTextChange.bind();
    this.handleSaveClick = this.handleSaveClick.bind();
  }
  
    componentDidMount() {

    }
  
    resetTaskData(newTask) {
      this.setState({
        showHideError: "hide",
        task: {
          id: newTask.id || "",
          title: newTask.title || "",
          description: newTask.description || "",
          status: newTask.status || "Pending"
        }
      });
    }

  handleTitleChange = (e) => {
    let task = this.state.task;
    task.title = e.target.value;

    this.setState({
      task
    });
  }
  handleTextChange = (e) => {
    let task = this.state.task;
    task.description = e.target.value;

    this.setState({
      task
    });
  }
  handleSaveClick = (task) => {
    if(this.validateFields())
      this.props.handleSave(task);
  }
  validateFields = () => {
    let title = document.getElementsByClassName('task-title')[0].value;
    let text = document.getElementsByClassName('task-text')[0].value;

    if (title && text) {
      console.log("READY");
      this.setState({
        showHideError: 'hide'
      });
      return true;
    }
    
    this.setState({
      showHideError: 'show'
    });
    return false;
  }
  
  render() {
    let showHideClassName = this.props.showModal === 'show' ? 'modal show-modal' : 'modal hide-modal'
    let showHideError = this.state.showHideError === 'show' ? 'error show-error' : 'error hide-error'
    let { task } = this.state;
    let mode = this.state.task.id ? "Edit task" : "New task";

    return (
      <div className={showHideClassName}>
        <div className="wrapper" onClick={this.props.handleCancel}></div>
        <div className="centered modal-content">
            <h2>{mode}</h2>
            <i className={showHideError}>Fields cannot be empty</i>
            <label>Task title</label>
            <input className="txt-box task-title" type="text" value={task.title || ""} onChange={this.handleTitleChange}></input>

            
            <label>Task Text</label>
            <input className="txt-box task-text" type="text" value={task.description || ""} onChange={this.handleTextChange}></input>

            <span className="btn-row">
              <button onClick={() => this.handleSaveClick(task)}>Save</button>
              <button onClick={this.props.handleCancel}>Cancel</button>
            </span>
          </div>
      </div>
    )
  }
}

export default NewTaskModal;