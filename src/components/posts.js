import React from 'react';


class myComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      bomji: []
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
  render() {
    const { error, isLoaded, bomji } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
    	return (<div>
    {bomji.map((bomj, index) => (
        <p>Name: {bomj.Name} Id: {bomj.Id}!</p>
    ))}
    </div>); 
    
// return <p>Namehaha : {bomji[0].Name} Id: {bomji[0].Id} </p>
    }
  }

}
export default myComponent;