import React from 'react';
// import ReactDOM from 'react-dom';
import './CSS/Task.css';

// import ReactDOM from 'react-dom';

import TaskItem from './TaskItem';
import TaskItemModal from './TaskItemModal';


class Task extends React.Component {
  constructor(props) {
    super(props);
    this.currentTask = {};
    this.state = {
      showModal: "hide",
      taskList: [
        {
          id: "1", 
          title: "My task 1",
          taskText: "I need to accomplish certain task 1",
          status: "Pending"
        },
        {
          id: "2", 
          title: "My task 2",
          taskText: "I need to accomplish certain task 2",
          status: "Pending"
        },
        {
          id: "3", 
          title: "My task 3",
          taskText: "I need to accomplish certain task 3",
          status: "Done"
        }
      ]
    }
    this.handleFinishTask = this.handleFinishTask.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.filterTasks = this.filterTasks.bind(this);
    this.handleCancelModal = this.handleCancelModal.bind(this);
    this.handleSaveTask = this.handleSaveTask.bind(this);
  }
  
  componentDidMount() {
    // const resultTaskList = this.getTaskList();

    // this.setState({taskList: resultTaskList});

    // console.log("Aquí se hace el request");
  }
  
  componentDidUpdate(prevState) {
    console.log("Cambió")
    // ReactDOM.render(<TaskItemModal task={this.state.taskList[0]} />, document.getElementsByClassName('modal')[0]);
  }

  handleFinishTask(id) {
    alert("You have finished " + id);
  }
  handleDeleteTask(id) {
    if (window.confirm("¿Seguro desea eliminar esta tarea?")) {
      this.deleteTask(id);
    }
  }
  handleEditTask(id) {
    this.currentTask = this.state.taskList.filter(task => task.id === id)[0];
    this.setState({
      showModal: "show"
    });
  }
  handleAddTask() {
    this.currentTask = {}
    this.setState({
      showModal: "show"
    });
    //this.addTask();
  }

  finishTask(id) {
    //do something
  }
  deleteTask(id) {
      this.setState({taskList: this.state.taskList.filter(task => task.id !== id)})
  }
  createTask(task) {
    let count = this.state.taskList.length;
    count++;
    
    let newTaskList = this.state.taskList;
    
    newTaskList.push({
      id: count.toString(), 
      taskText: "I need to accomplish certain task " + count,
      status: "Pending"
    });
  }
  
  isValidTask(task) {
    return task.taskTitle && task.taskText;
  }

  handleSaveTask(task) {
    if (this.isValidTask(task)) {
      task.id ? this.editTask(task) : this.createTask(task);
    }
  }
  handleCancelModal() {   
    console.log("Cancel");
    this.setState({
      showModal: "hide",
    });
    this.currentTask = Object.create({});
  }
  editTask(task) {
    let modTaskList = this.state.taskList;
    let index = modTaskList.indexOf(t => t.id === task.id);
    modTaskList[index] = task;

    this.setState({ taskList: modTaskList });
  }

  getTaskList() {
    //definir
    return [
      {
        id: "1", 
        title: "My task 1",
        taskText: "I need to accomplish certain task 1",
        status: "Pending"
      },
      {
        id: "2", 
        title: "My task 2",
        taskText: "I need to accomplish certain task 2",
        status: "Pending"
      },
      {
        id: "3", 
        title: "My task 3",
        taskText: "I need to accomplish certain task 3",
        status: "Done"
      }
    ]
  }

  filterTasks(e) {
    //
  }

  render() {
    
    return(
      <div className="task">
        <TaskItemModal task={this.currentTask} showModal={this.state.showModal} handleSave={this.handleSaveTask} handleCancel={this.handleCancelModal}>
          {/* <TaskItem task={this.state.currentTask}/> */}
        </TaskItemModal>
        <input type="text" className="txt-box" placeholder="Search" onChange={this.filterTasks}></input>

        <button onClick={this.handleAddTask}>New task</button>
        <ul>
          {this.state.taskList.map((task) => <TaskItem 
                                              finishTask={() => this.handleFinishTask(task.id)} 
                                              editTask={() => this.handleEditTask(task.id)} 
                                              deleteTask={() => this.handleDeleteTask(task.id)} 
                                              task={task} key={task.id}  />
                                  )}
        </ul>
      </div>
    );
  }

}

export default Task;