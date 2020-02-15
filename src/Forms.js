import React from 'react';


export class CreateUserForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
        firstName: "",
        lastName: ""
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
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

    handleSubmit(event) {
        console.log('Create User Form was submited: ' + this.state.email);
        event.preventDefault();
      }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Password:
            <input
              name="password"
              type="text"
              value={this.state.password}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            First Name:
            <input
              name="firstName"
              type="text"
              value={this.state.firstName}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Last Name:
            <input
              name="lastName"
              type="text"
              value={this.state.lastName}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      );
    }
}

export class RemoveUserForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: 0
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
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

    handleSubmit(event) {
        console.log('Remove User Form was submited: ' + this.state.id);
        event.preventDefault();
      }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            User ID:
            <input
              name="id"
              type="number"
              value={this.state.id}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      );
    }
}

export class CreateBuildForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: 0
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
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

    handleSubmit(event) {
        console.log('Create Build Form was submited: ' + this.state.id);
        event.preventDefault();
      }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            User ID:
            <input
              name="id"
              type="number"
              value={this.state.id}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      );
    }
}

export class RemoveBuildForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: 0
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
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

    handleSubmit(event) {
        console.log('Remove Build Form was submited: ' + this.state.id);
        event.preventDefault();
      }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Build ID:
            <input
              name="id"
              type="number"
              value={this.state.id}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      );
    }
}



export class AddPartToBuildForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        buildid: 0,
        partid: 0,
        quantity: 0
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
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

    handleSubmit(event) {
        console.log('Add Part To Build Form was submited: ' + this.state.id);
        event.preventDefault();
      }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Build ID:
            <input
              name="buildid"
              type="number"
              value={this.state.buildid}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Part ID:
            <input
              name="partid"
              type="number"
              value={this.state.partid}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Quantity:
            <input
              name="quantity"
              type="number"
              value={this.state.quantity}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      );
    }
}

export class RemovePartFromBuildForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        buildid: 0,
        partid: 0,
        quantity: 0
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
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

    handleSubmit(event) {
        console.log('Remove Part From Build Form was submited: ' + this.state.id);
        event.preventDefault();
      }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Build ID:
            <input
              name="buildid"
              type="number"
              value={this.state.buildid}
              onChange={this.handleInputChange} />
          </label>
          <br/>
          <label>
            Part ID:
            <input
              name="partid"
              type="number"
              value={this.state.partid}
              onChange={this.handleInputChange} />
          </label>
          <br/>
          <label>
            Quantity:
            <input
              name="quantity"
              type="number"
              value={this.state.quantity}
              onChange={this.handleInputChange} />
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
}

export class CreatePartForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        partType: "",
        price: "",
        specs: ""
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
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

    handleSubmit(event) {
        console.log('Create Part Form was submited: ' + this.state.partType);
        event.preventDefault();
      }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Part Type:
            <input
              name="partType"
              type="text"
              value={this.state.partType}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Price:
            <input
              name="price"
              type="number"
              value={this.state.price}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Specs:
            <input
              name="specs"
              type="text"
              value={this.state.specs}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      );
    }
}

export class RemovePartForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: 0
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
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

    handleSubmit(event) {
        console.log('Remove Part Form was submited: ' + this.state.id);
        event.preventDefault();
      }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Part ID:
            <input
              name="id"
              type="number"
              value={this.state.id}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      );
    }
}


export class CreatePartRatingForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        partid: "",
        value: 1,
        comment: ""
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
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

    handleSubmit(event) {
        console.log('Create Part Rating Form was submited: ' + this.state.partType);
        event.preventDefault();
      }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Part ID:
            <input
              name="partid"
              type="text"
              value={this.state.partid}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Rating:
            <input
              name="value"
              type="number"
              min="1"
              max="5"
              value={this.state.value}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Comment:
            <input
              name="comment"
              type="text"
              value={this.state.comment}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      );
    }
}

export class CreateBuildRatingForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        buildid: "",
        value: 1,
        comment: ""
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
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

    handleSubmit(event) {
        console.log('Create Build Rating Form was submited: ' + this.state.partType);
        event.preventDefault();
      }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Build ID:
            <input
              name="buildid"
              type="text"
              value={this.state.buildid}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Rating:
            <input
              name="value"
              type="number"
              min="1"
              max="5"
              value={this.state.value}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Comment:
            <input
              name="comment"
              type="text"
              value={this.state.comment}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      );
    }
}

export class UpdateBuildRatingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingid: "",
      value: 1,
      comment: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
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

  handleSubmit(event) {
      console.log('Update Build Rating Form was submited: ' + this.state.partType);
      event.preventDefault();
    }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Rating ID:
          <input
            name="ratingid"
            type="text"
            value={this.state.ratingid}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Rating:
          <input
            name="value"
            type="number"
            min="1"
            max="5"
            value={this.state.value}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Comment:
          <input
            name="comment"
            type="text"
            value={this.state.comment}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export class RemoveRatingForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: 0
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
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

    handleSubmit(event) {
        console.log('Remove Rating Form was submited: ' + this.state.id);
        event.preventDefault();
      }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Rating ID:
            <input
              name="id"
              type="number"
              value={this.state.id}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      );
    }
}