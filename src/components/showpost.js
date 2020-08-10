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

  destroy(id) {
    // const id = this.props.match.params.id
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(`http://localhost:80/posts/${id}`, requestOptions)
        .then(response => {
          if( response.status === 200){
            localStorage.setItem('bomji', response);
            // TODO : else ( error )
            this.props.history.push('/posts');
          }          
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
  	const { error, isLoaded, bomj } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
    	return ( <div><p>Name: {bomj.Name} Id: {bomj.Id}!
        </p>
        <button onClick={()=>this.destroy(bomj.Id)}>
        Удалить Бомжа
        </button></div> ) 
  	}
	}

}

export default withRouter(myComponent);