import React from 'react';

import { 
	withRouter, } from "react-router";


class myComponent extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false, 
      bomj: [],
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



  render() {
  	const { error, isLoaded, bomj } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
    	return ( <p>Name: {bomj.Name} Id: {bomj.Id}!</p> ) 
  	}
	}

}

export default withRouter(myComponent);