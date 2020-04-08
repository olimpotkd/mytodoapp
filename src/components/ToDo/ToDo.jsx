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
       taskList : [
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
        ],
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

    this.resetModalData = React.createRef();
  }
  
  componentDidMount() {

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

    this.setState({
      taskList: newTaskList
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
      <div className="task">
        <NewTaskModal ref={this.resetModalData} task={currentTask} showModal={this.state.showModal} handleSave={this.handleSaveTask} handleCancel={this.handleCancelModal}>
          {/* <TaskItem task={this.state.currentTask}/> */}
        </NewTaskModal>
        <input type="text" className="txt-box" placeholder="Search" value={this.searchField} onChange={this.filterTasks}></input>

        <button onClick={this.handleNewTaskButtonClick}>New task</button>
        <ul>
          {fileteredTasks.map((task) => <Task 
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

export default ToDo;