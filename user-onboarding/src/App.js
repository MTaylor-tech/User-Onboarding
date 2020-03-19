import React, {useState,useEffect} from 'react';
import './App.css';
import Form from './components/Form.js';
import {Route} from 'react-router-dom';
import UserCard from './components/UserCard.js';

function App() {
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  //<Route exact path="/" component={MovieList} />
  //<Route path="/movies/:id" render={props=><Movie {...props} addToSavedList={addToSavedList} />}/>

  return (
    <div className="App">
      <Form addFunction={addUser} />
      {users.map(user=><UserCard user={user} key={user.id} />)}
    </div>
  );
}

export default App;
