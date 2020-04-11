import React from 'react';
import './CSS/ToDo.css';

// import ReactDOM from 'react-dom';

import Task from './Task';

import NewTaskModal from './NewTaskModal';


class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: "hide",
      taskList : [],
      currentTask: {},
      searchField: ''
    }
    this.handleFinishTask = this.handleFinishTask.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleNewTaskButtonClick = this.handleNewTaskButtonClick.bind(this);
    this.filterTasks = this.filterTasks.bind(this);
    this.handleCancelModal = this.handleCancelModal.bind(this);
    this.handleSaveTask = this.handleSaveTask.bind(this);
    this.isValidTask = this.isValidTask.bind(this);
    this.getTaskList = this.getTaskList.bind(this);
    this.completeTask = this.completeTask.bind(this);

    this.resetModalData = React.createRef();
  }
  
  componentDidMount() {
    this.setState({
      taskList: this.getTaskList()
    })
  }
  
  handleFinishTask(id) { 
    if (window.confirm("Mark task as completed?")) {
      this.completeTask(id);
    }
  }
  completeTask(id) {

    let modTask =  this.state.taskList.filter(t => t.id === id)[0];
    let modTaskList = this.state.taskList.filter(t => t.id !== id);
    console.log(modTask);
    modTask.status = "Done";
    modTaskList.push(modTask);

    this.setState({
      taskList: modTaskList
    })
  }
  handleDeleteTask(id) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      this.deleteTask(id);
    }
  }
  handleEditTask(id) {
    console.log(this.state.taskList.filter(task => task.id === id)[0])
    this.setState(state => ({
        showModal: "show",
        currentTask: state.taskList.filter(task => task.id === id)[0]
      }), () => {
        this.resetModalData.current.resetTaskData(this.state.currentTask)
      }
    );
  }
  handleNewTaskButtonClick() {
    this.setState({
      currentTask: {},
      showModal: "show"
    }, 
    this.resetModalData.current.resetTaskData({}));
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
      title: task.title, 
      description: task.description,
      status: "Pending"
    });

    this.setState((state) => ({
      taskList: newTaskList,
      showModal: "hide"
    }), () => {
      this.resetModalData.current.resetTaskData(this.state.currentTask);
    });
  }
  
  isValidTask(task) {
    return task.title && task.description ? true : false;
  }

  handleSaveTask(task) {
    if (this.isValidTask(task)) {
      console.log('outter save task')
      task.id ? this.editTask(task) : this.createTask(task);
    }
  }
  handleCancelModal() {   
    this.setState({
      showModal: "hide",
      currentTask: {}
    });
  }
  editTask(task) {
    let modTaskList = this.state.taskList;
    let index = modTaskList.findIndex(t => t.id === task.id);

    modTaskList[index] = task;
    this.setState({ taskList: modTaskList});
  }

  getTaskList() {
    //definir
    return [
      {
        id: "1", 
        title: "My task 1",
        description: "I need to accomplish certain task 1",
        status: "Pending"
      },
      {
        id: "2", 
        title: "My task 2",
        description: "I need to accomplish certain task 2",
        status: "Pending"
      },
      {
        id: "3", 
        title: "My task 3",
        description: "I need to accomplish certain task 3",
        status: "Done"
      }
    ]
  }

  filterTasks(e) {
    this.setState({
      searchField: e.target.value
    })
  }

  render() {
    
    let {currentTask, searchField, taskList} = this.state;

    let fileteredTasks = taskList.filter( task => {
      return task.description.toLocaleLowerCase().includes(searchField.toLocaleLowerCase()) ||
        task.title.toLocaleLowerCase().includes(searchField.toLocaleLowerCase())
    })

    return(
      <div className="todo">
        <NewTaskModal ref={this.resetModalData} task={currentTask} showModal={this.state.showModal} handleSave={this.handleSaveTask} handleCancel={this.handleCancelModal}>
         </NewTaskModal>
        <span className='todo-top'>
          <input type="text" className="txt-box" placeholder="Filter" value={this.searchField} onChange={this.filterTasks}></input>

          <button onClick={this.handleNewTaskButtonClick}>New task</button>
        </span>
        
        <ul className="task-list">
          {fileteredTasks.map((task) => <Task 
                                              finishTask={task.status === 'Pending' ? () => this.handleFinishTask(task.id) : () => {}} 
                                              editTask={task.status === 'Pending' ? () => this.handleEditTask(task.id) : () => {}} 
                                              deleteTask={() => this.handleDeleteTask(task.id)} 
                                              task={task} key={task.id}  />
                                  )}
        </ul>
      </div>
    );
  }

}

export default ToDo;