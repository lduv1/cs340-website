import React from 'react';

export class MySelect extends React.Component {
    constructor(props) {
      super(props);
      // this.state = { value: Object.keys(props.options)[0] };
      this.handleChange = this.handleChange.bind(this);
      console.log(this.props.value);
    }
    
    handleChange(event) {
      // this.setState({ value: event.target.value });
      this.props.onValueChange(event.target.value);
    }
    
    render() {
      return (
        <div className="selectContainer">
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
  