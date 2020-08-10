import Formsy from 'formsy-react';
import React from 'react';
import MyInput from './MyInput';
import {
  Link,
} from 'react-router-dom';


class myComponent extends React.Component {
  constructor(props) {
    super(props);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this); 
    this.state = {
      error: null,
      isLoaded: false,
      bomji: [],
      canSubmit: false
    };
  }

  componentDidMount() {
    const apiUrl = 'http://localhost:80/posts';
    fetch(apiUrl)
      .then((response) => response.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            bomji: data
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

  create(bomjname) {
  	const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( bomjname )
    };
    fetch('http://localhost:80/posts', requestOptions)
        .then(response => response.json())
        .then(
        (data) => {
          this.setState({bomji: [...this.state.bomji, data]});
          this.refs.form.reset();
        },
        // (error) => {
        //   this.setState({
        //     isLoaded: true,
        //     error
        //   });
        // },
      )
  }


  render() {
    const { error, isLoaded, bomji } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
    	return (
    		<div><Formsy onValidSubmit={this.create.bind(this)} onValid={this.enableButton} onInvalid={this.disableButton} ref="form">
        <MyInput name="Name"/>
        <button type="submit" disabled={!this.state.canSubmit}>
          Submit
        </button>
      </Formsy>
    		<div>{bomji.map((bomj, index) => (
        <p>Name: {bomj.Name} Id: {bomj.Id}!
        <Link to={`/posts/${bomj.Id}`}>К посту</Link>
        </p>

    ))}
    </div>
    </div>);     
    }
  }

}
export default myComponent;