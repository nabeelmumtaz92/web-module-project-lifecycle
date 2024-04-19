import React from 'react'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: 'foo',
  }

    onTodoNameInputChange = evt => {
      const {value} = evt.target
      this.setState({...this.state, todoNameInput: value})
    }
    resetForm = () => this.setState({...this.state, todoNameInput: ''})
    setAxiosResponseError = (err) => this.setState ({...this.state, error: err.response.data.message})
    postNewTodo= () => {
      axios.post(URL, {name: this.state.todoNameInput})
       .then(response => {
      this.fetchAllTodos
      this.resetForm()
      this.setState({...this.state, todos:this.state.todos.concat(res.data.data), todoNameInput: ''})
    })
      .catch(this.setAxiosResponseError)
      }

      onTodoFormSubmit = evt => {
        evt.preventDefault ()
        this.postNewTodo()
      }

  fetchAllTodos= () => {
    axios.get(URL)
     .then(response => {
      this.setState({ ...this.state, todos:response.data.data})
     })
     .catch(this.setAxiosResponseError)
    }

  toggleDisplayCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({
          ...this.state, todos: this.state.todos.map(td => {
          if (td.id !== id) return td
            return res.data.data
        })
      })
    })
     .catch(this.setAxiosResponseError)
  }

  componentDidMount() {
    //fetch all todos from server
    this.fetchAllTodos()
  }
  
  render() {
    return (
      <div>
        <div id ="error">Error: {this.state.error}</div>
        <div id = "todos">
          <h2>Todos:</h2>
          {
          this.state.todos.reduce((acc, td => {
            if(this.state.displayCompleted || !td.completed) return acc.concat(
              <div onClick = {this.toggleCompleted(td.id)} key = {td.id}> {td.name} {td.completed ? 'check' : ''}</div>
            )
            return acc
          }, [])
       </div>
          <form id = "todoForm" onSubmit = {this.onTodoFormSubmit}>
          <input 
            value={this.props.todoNameInput} 
            onChange = {this.props.onTodoNameInputChange} 
            type="text" 
            placeholder = "Type todo">
          </input>
            
            <input type="submit"></input>
          </form>
      
        <button 
          onClick = {this.toggleDisplayCompleted}>
            {this.state.displayCompleted ? 'Hide' : 'Show'} Completed 
            </button>
        </div>
    )
  }
}
