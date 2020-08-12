import Formsy from 'formsy-react';
import React from 'react';
import MyInput from './MyInput';
import {
  Link,
} from 'react-router-dom';
import { 
  withRouter, } from "react-router";

class myComponent extends React.Component {
  constructor(props) {
    super(props);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this); 
    this.state = {
      error: null,
      isLoaded: false,
      bomj: [],
      canSubmit: false,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id
 
    const apiUrl = `http://localhost:80/posts/${id}`;
    fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          return response.json() } else { throw Error("Bomj ne naiden 404") }})
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            bomj: data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }
 
  enableButton() {
    this.setState({ canSubmit: true });
  }

  update(bomjname) {
    const id = this.props.match.params.id
  	const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( bomjname )
    };
    fetch(`http://localhost:80/posts/${id}`, requestOptions)
      .then(response => {
          if( response.status === 200){
            this.props.history.push(`/posts/${id}`);
          } else { throw Error("Bomj ne naiden 404") }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        },
      )
  }


  render() {
    const { error, isLoaded, bomj } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
    	return (
    		<div><Formsy onValidSubmit={this.update.bind(this)} onValid={this.enableButton} onInvalid={this.disableButton} value='zzz'>
        <MyInput name="Name" value={bomj.Name}/>
        <button type="submit" disabled={!this.state.canSubmit}>
          Submit
        </button>
      </Formsy>
    </div>);     
    }
  }

}
export default withRouter(myComponent);