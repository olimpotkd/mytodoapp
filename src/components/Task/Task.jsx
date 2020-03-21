import React from 'react';
import './CSS/Task.css';

// import ReactDOM from 'react-dom';

import TaskItem from './TaskItem';
// import TaskItemModal from './TaskItemModal';


class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [
        {
          id: "1", 
          taskText: "I need to accomplish certain task 1",
          status: "Pending"
        },
        {
          id: "2", 
          taskText: "I need to accomplish certain task 2",
          status: "Pending"
        },
        {
          id: "3", 
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
  }
  
  componentDidMount() {
    // const resultTaskList = this.getTaskList();

    // this.setState({taskList: resultTaskList});

    // console.log("Aquí se hace el request");
  }
  
  componentDidUpdate(prevState) {
    
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
    alert("You are editing " + id);
  }
  handleAddTask() {
    this.addTask();
  }

  finishTask(id) {
    //do something
  }
  deleteTask(id) {
      this.setState({taskList: this.state.taskList.filter(x => x.id !== id)})
  }
  addTask() {
    let count = this.state.taskList.length;
    count++;
    
    let newTaskList = this.state.taskList;
    
    newTaskList.push({
      id: count.toString(), 
      taskText: "I need to accomplish certain task " + count,
      status: "Pending"
    });

    this.setState({taskList: newTaskList})

    // const rnode = document.getElementsByTagName('body')[0];
    // console.log(rnode);
    // ReactDOM.render(<TaskItemModal />, rnode)
  }

  getTaskList() {
    //definir
    return [
      {
        id: "1", 
        taskText: "I need to accomplish certain task 1"
      },
      {
        id: "2", 
        taskText: "I need to accomplish certain task 2"
      },
      {
        id: "3", 
        taskText: "I need to accomplish certain task 3"
      }
    ]
  }

  filterTasks(e) {
    console.log(e.target.value)
  }

  render() {
    
    return(
      <div className="task">
        <input type="text" placeholder="Search" onChange={this.filterTasks}></input>

        <button onClick={this.handleAddTask}>New task</button>
        <ul>
          {console.log(this.state.taskList)}
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