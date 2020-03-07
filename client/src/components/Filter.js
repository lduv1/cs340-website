import React from 'react';
import {MySelect} from './Select';

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
      event.preventDefault();

      const value = this.state.search;
      const column = this.props.searchkeys[this.state.where];
      console.log("Searching for " + value + " in " + column);
      this.props.searchSubmit(`?value=${value}&column=${column}`);
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
              options={this.props.searchkeys}
              value={this.state.where}
              onValueChange={this.handleWhereValueChange}
            />
            
            <button type="submit" >Search</button>
          </form>
        </div>
      );
    }
  }
