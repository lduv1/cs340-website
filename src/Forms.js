import React from 'react';
import {apiUrl} from './App';
import { MySelect } from './components/Select';

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
      async function sendPost(e,p,f,l, updateCount, updateValue) {
        if ( e && p && f && l) {
          const body = {
            email: e,
            password: p,
            firstName: f,
            lastName: l
          }
          console.log(body)
          const response = await fetch(
            apiUrl + 'users',
            {
              method: 'POST',
              body: JSON.stringify(body),
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          const responseBody = await response.json();
          console.log("== Response:", responseBody);
          updateCount(updateValue);
        }
      }
      event.preventDefault();
      sendPost(this.state.email,this.state.password,this.state.firstName,this.state.lastName, this.props.updateCount, this.props.refreshCount+1);
      console.log('Create User Form was submited: ' + this.state.email);
      // this.props.updateCount(this.props.refreshCount+1);
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
        this.props.updateCount(this.props.refreshCount+1);

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
        id: 0,
        keys: ["loading"]
      };
      
      const controller = new AbortController();

      async function fetchSearchResults(th) {
        let responseBody = {};
        let newKeys = []
        try {
          const response = await fetch(
            apiUrl + 'users',
            { signal: controller.signal }
          );
          responseBody = await response.json();
        } catch (e) {
          console.log("caught error: " + e);
          responseBody.results = [{error:"error"}];
          th.setState({
            keys: ['error']
          });
          return;
          
        }
        console.log(responseBody)
        console.log(responseBody.results)
        newKeys = responseBody.results.map( user => {
          return `${user.userID} ${user.first_name} ${user.last_name}`;
        });
        th.setState({
          keys: newKeys
        });
        
      }

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      fetchSearchResults(this);

    }
    handleInputChange(value) {
     
      this.setState({
        id: value
      });
    }
    

    handleSubmit(event) {
      async function sendPost(userID, updateCount, updateValue) {
        if ( userID) {
          const body = {
            userID
          }
          console.log(body)
          const response = await fetch(
            apiUrl + 'builds',
            {
              method: 'POST',
              body: JSON.stringify(body),
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          const responseBody = await response.json();
          console.log("== Response:", responseBody);
          updateCount(updateValue);
        }
      }
      sendPost(parseInt(this.state.id, 10) + 1, this.props.updateCount, this.props.refreshCount+1);
      console.log('Create Build Form was submited: ' + this.state.id);
      event.preventDefault();

      }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            User ID:
            <MySelect
              name="id"
              options={this.state.keys}
              value={this.state.id}
              onValueChange={this.handleInputChange}
            />
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
        this.props.updateCount(this.props.refreshCount+1);

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
        buildkeys: ["loading"],
        partid: 0,
        partkeys: ["loading"]
      };
      const controller = new AbortController();

      async function fetchBuildSearchResults(th) {
        let responseBody = {};
        let newKeys = []
        try {
          const response = await fetch(
            apiUrl + 'builds',
            { signal: controller.signal }
          );
          responseBody = await response.json();
        } catch (e) {
          console.log("caught error: " + e);
          responseBody.results = [{error:"error"}];
          th.setState({
            keys: ['error']
          });
          return;
          
        }
        console.log(responseBody)
        console.log(responseBody.results)
        newKeys = responseBody.results.map( build => {
          return build.buildID;
        });
        th.setState({
          buildkeys: newKeys
        });
        
      }
      async function fetchPartSearchResults(th) {
        let responseBody = {};
        let newKeys = []
        try {
          const response = await fetch(
            apiUrl + 'parts',
            { signal: controller.signal }
          );
          responseBody = await response.json();
        } catch (e) {
          console.log("caught error: " + e);
          responseBody.results = [{error:"error"}];
          th.setState({
            partkeys: ['error']
          });
          return;
          
        }
        console.log(responseBody)
        console.log(responseBody.results)
        newKeys = responseBody.results.map( part => {
          return part.partID;
        });
        th.setState({
          partkeys: newKeys
        });
        
      }

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSelectBuildChange = this.handleSelectBuildChange.bind(this);
      this.handleSelectPartChange = this.handleSelectPartChange.bind(this);
      fetchBuildSearchResults(this);
      fetchPartSearchResults(this);
    }


  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
    handleSelectBuildChange(value) {
     
      this.setState({
        buildid: value
      });
    }
    handleSelectPartChange(value) {
     
      this.setState({
        partid: value
      });
    }

    handleSubmit(event) {
      async function sendPost(b,p, updateCount, updateValue) {
        if ( b && p) {
          const body = {
            buildID: b,
            partID: p
          }
          console.log(body)
          const response = await fetch(
            apiUrl + 'builds/parts',
            {
              method: 'POST',
              body: JSON.stringify(body),
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          const responseBody = await response.json();
          console.log("== Response:", responseBody);
          updateCount(updateValue);
        }
      }
      console.log("add part to build submitted")
      event.preventDefault();
      sendPost(parseInt(this.state.buildkeys[this.state.buildid], 10),
          parseInt(this.state.partkeys[this.state.partid], 10),
          this.props.updateCount,
          this.props.refreshCount+1);
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Build ID:
            <MySelect
              name="buildid"
              options={this.state.buildkeys}
              value={this.state.buildid}
              onValueChange={this.handleSelectBuildChange}
            />
          </label>
          <br />
          <label>
            Part ID:
            <MySelect
              name="partid"
              options={this.state.partkeys}
              value={this.state.partid}
              onValueChange={this.handleSelectPartChange}
            />
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
        this.props.updateCount(this.props.refreshCount+1);

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
      async function sendPost(pt,p,s, updateCount, updateValue) {
        if ( pt && p && s) {
          const body = {
            partType: pt,
            price: p,
            specs: s
          }
          console.log(body)
          const response = await fetch(
            apiUrl + 'parts',
            {
              method: 'POST',
              body: JSON.stringify(body),
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          const responseBody = await response.json();
          console.log("== Response:", responseBody);
          updateCount(updateValue);
        }
      }
      event.preventDefault();
      sendPost(this.state.partType,this.state.price,this.state.specs, this.props.updateCount, this.props.refreshCount+1);
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
        this.props.updateCount(this.props.refreshCount+1);

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
        userID: 0,
        userkeys: ["loading"],
        partkeys: ["loading"],
        partid: "",
        value: 1,
        comment: ""
      };
      const controller = new AbortController();

      async function fetchUserSearchResults(th) {
        let responseBody = {};
        let newKeys = []
        try {
          const response = await fetch(
            apiUrl + 'users',
            { signal: controller.signal }
          );
          responseBody = await response.json();
        } catch (e) {
          console.log("caught error: " + e);
          responseBody.results = [{error:"error"}];
          th.setState({
            keys: ['error']
          });
          return;
          
        }
        console.log(responseBody)
        console.log(responseBody.results)
        newKeys = responseBody.results.map( user => {
          return `${user.userID} ${user.first_name} ${user.last_name}`;
        });
        th.setState({
          userkeys: newKeys
        });
        
      }
      async function fetchPartSearchResults(th) {
        let responseBody = {};
        let newKeys = []
        try {
          const response = await fetch(
            apiUrl + 'parts',
            { signal: controller.signal }
          );
          responseBody = await response.json();
        } catch (e) {
          console.log("caught error: " + e);
          responseBody.results = [{error:"error"}];
          th.setState({
            keys: ['error']
          });
          return;
          
        }
        console.log(responseBody)
        console.log(responseBody.results)
        newKeys = responseBody.results.map( part => {
          return part.partID;
        });
        th.setState({
          partkeys: newKeys
        });
        
      }
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSelectPartChange = this.handleSelectPartChange.bind(this);
      this.handleSelectUserChange = this.handleSelectUserChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      fetchUserSearchResults(this);
      fetchPartSearchResults(this);

    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
    handleSelectUserChange(value) {
     
      this.setState({
        userID: value
      });
    }
    handleSelectPartChange(value) {
     
      this.setState({
        partid: value
      });
    }

    handleSubmit(event) {
      async function sendPost(u,p,v,c, updateCount, updateValue) {
        if ( u && p && v && c) {
          const body = {
            userID: u,
            ratedID: p,
            buildOrPart: 'part',
            ratingValue: v,
            comment: c
          }
          console.log(body)
          const response = await fetch(
            apiUrl + 'ratings',
            {
              method: 'POST',
              body: JSON.stringify(body),
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          const responseBody = await response.json();
          console.log("== Response:", responseBody);
          updateCount(updateValue);
        }
      }
      event.preventDefault();
      sendPost(parseInt(this.state.userID, 10) + 1,parseInt(this.state.partid, 10) + 1,this.state.value,this.state.comment, this.props.updateCount, this.props.refreshCount+1);
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            User ID:
            <MySelect
              name="userID"
              options={this.state.userkeys}
              value={this.state.userID}
              onValueChange={this.handleSelectUserChange}
            />
          </label>
          <br />
          <label>
            Part ID:
            <MySelect
              name="partid"
              options={this.state.partkeys}
              value={this.state.partid}
              onValueChange={this.handleSelectPartChange}
            />
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
      userID: 0,
      userkeys: ["loading"],
      buildkeys: ["loading"],
      buildid: "",
      value: 1,
      comment: ""
    };
    const controller = new AbortController();

    async function fetchUserSearchResults(th) {
      let responseBody = {};
      let newKeys = []
      try {
        const response = await fetch(
          apiUrl + 'users',
          { signal: controller.signal }
        );
        responseBody = await response.json();
      } catch (e) {
        console.log("caught error: " + e);
        responseBody.results = [{error:"error"}];
        th.setState({
          keys: ['error']
        });
        return;
        
      }
      console.log(responseBody)
      console.log(responseBody.results)
      newKeys = responseBody.results.map( user => {
        return `${user.userID} ${user.first_name} ${user.last_name}`;
      });
      th.setState({
        userkeys: newKeys
      });
      
    }
    async function fetchBuildSearchResults(th) {
      let responseBody = {};
      let newKeys = []
      try {
        const response = await fetch(
          apiUrl + 'builds',
          { signal: controller.signal }
        );
        responseBody = await response.json();
      } catch (e) {
        console.log("caught error: " + e);
        responseBody.results = [{error:"error"}];
        th.setState({
          keys: ['error']
        });
        return;
        
      }
      console.log(responseBody)
      console.log(responseBody.results)
      newKeys = responseBody.results.map( build => {
        return build.buildID;
      });
      th.setState({
        buildkeys: newKeys
      });
      
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectBuildChange = this.handleSelectBuildChange.bind(this);
    this.handleSelectUserChange = this.handleSelectUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    fetchUserSearchResults(this);
    fetchBuildSearchResults(this);

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleSelectUserChange(value) {
   
    this.setState({
      userID: value
    });
  }
  handleSelectBuildChange(value) {
   
    this.setState({
      buildid: value
    });
  }

  handleSubmit(event) {
    async function sendPost(u,b,v,c, updateCount, updateValue) {
      if ( u && b && v && c) {
        const body = {
          userID: u,
          ratedID: b,
          buildOrPart: 'build',
          ratingValue: v,
          comment: c
        }
        console.log(body)
        const response = await fetch(
          apiUrl + 'ratings',
          {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        const responseBody = await response.json();
        console.log("== Response:", responseBody);
        updateCount(updateValue);
      }
    }
    event.preventDefault();
    sendPost(parseInt(this.state.userID, 10) + 1,parseInt(this.state.buildid, 10) + 1,this.state.value,this.state.comment, this.props.updateCount, this.props.refreshCount+1);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <label>
            User ID:
            <MySelect
              name="userID"
              options={this.state.userkeys}
              value={this.state.userID}
              onValueChange={this.handleSelectUserChange}
            />
          </label>
          <br />
          <label>
            Build ID:
            <MySelect
              name="buildid"
              options={this.state.buildkeys}
              value={this.state.buildid}
              onValueChange={this.handleSelectBuildChange}
            />
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
      this.props.updateCount(this.props.refreshCount+1);

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
        this.props.updateCount(this.props.refreshCount+1);

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