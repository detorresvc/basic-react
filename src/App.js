import React, { Component, Fragment } from 'react';
import './App.css';

class InputWithLabel extends Component {
  render(){
    return (
      <Fragment>
        <label>{this.props.label}</label>
        <input
          {...this.props}
        />
      </Fragment>
    )
  }
}


class App extends Component {

  state = {
    selected_index: '',
    first_name: '',
    last_name: '',
    names: [],
    middle_name: ''
  }

  onChange = e => {
    
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    this.setState({
      names: this.state.names.concat({
        first_name: this.state.first_name,
        last_name: this.state.last_name
      }),
      first_name: '',
      last_name: ''
    })
  }

  onDelete = i => e => {
    e.preventDefault()

    const newNames = this.state.names.filter((item, x) => {
      return x !== i
    })

    this.setState({
      names: newNames
    })
  }

  onEdit = i => e => {
    e.preventDefault()
    this.setState({
      ...this.state.names[i],
      selected_index: i
    })
  }

  onUpdate = e => {
    e.preventDefault()

      this.setState({
        names: this.state.names.map((item, i) => {
            if(i === this.state.selected_index){
              return {
                first_name: this.state.first_name,
                last_name: this.state.last_name
              }
            }

            return item
        }),
        first_name: '',
        last_name: ''
      })
  }

  render() {
    

    return (
      <div className="container">
        <div>
          <form onSubmit={this.onSubmit}>
          <InputWithLabel 
            className="form-control"
            label="FIRST NAME"
            name="first_name"
            value={this.state.first_name}
            onChange={this.onChange}
          />
          <InputWithLabel 
            className="form-control"
            label="MIDDLE NAME"
            name="middle_name"
            value={this.state.middle_name}
            onChange={this.onChange}
          />
          <InputWithLabel 
            className="form-control"
            label="LAST NAME"
            name="last_name"
            value={this.state.last_name}
            onChange={this.onChange}
          />
          
          <button
            className="btn btn-md btn-primary">ADD</button>
          &nbsp;
          <button
            type="button"
            onClick={this.onUpdate}
            className="btn btn-md btn-warning">UPDATE</button>
          </form>
        </div>
         <ul>
           {this.state.names.map((item, i) => {
              return (
                <li key={`item${i}`} className="p-2">
                  {i})
                  &nbsp;
                  {`${item.first_name} ${item.last_name}`}
                  &nbsp;
                  <button 
                    onClick={this.onEdit(i)}
                    className="btn btn-sm btn-primary">EDIT</button>
                  &nbsp;
                  <button 
                    onClick={this.onDelete(i)}
                    className="btn btn-sm btn-danger">DELETE</button>
                </li>
              )
            })}
         </ul>
      </div>
    );
  }
}

export default App;
