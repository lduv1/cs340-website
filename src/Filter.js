import React from 'react';

export class Filter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        search: "",
        where: 0
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleWhereValueChange = this.handleWhereValueChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
    
    handleWhereValueChange(value) {
      this.setState({
        where: value
      });
    }
    
    handleSubmit(event) {
        // console.log(this.props.data[this.state.where]);
      alert("Searching for " +
       this.state.search + 
       " in " + 
       Object.keys(this.props.data[0])[this.state.where]
    )
      event.preventDefault();
    }
    
    render() {
      return (
        <div className="searchFilter">
          <form onSubmit={this.handleSubmit}>
            <label>
            Search:  
            <input
              name="search"
              type="text"
              value={this.state.search}
              onChange={this.handleInputChange} />
            in:
          </label>
            <MySelect
              options={Object.keys(this.props.data[0])}
              value={this.state.where}
              onValueChange={this.handleWhereValueChange}
            />
            
            <button type="submit">Search</button>
          </form>
        </div>
      );
    }
  }


class MySelect extends React.Component {
    constructor(props) {
      super(props);
      // this.state = { value: Object.keys(props.options)[0] };
      this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
      // this.setState({ value: event.target.value });
      this.props.onValueChange(event.target.value);
    }
    
    render() {
      return (
        <div>
          <select
            value={this.props.value}
            onChange={this.handleChange}
          >
            {Object.keys(this.props.options).map(key => (
              <option key={key} value={key}>
                {this.props.options[key]}
              </option>
            ))}
          </select>
        </div>
      );
    }
  }
  