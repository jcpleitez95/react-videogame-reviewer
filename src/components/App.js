
import React, {useState, useEffect} from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import GameList from './GameList';
import GamePage from './GamePage'
import Login from './Login'
import UserPage from './UserPage'
import Nav from './Nav'

function App() {
  const [games, setGames] = useState([])
  const [currentUser, setCurrentUser] = useState(1)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/games`)
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, []);

  console.log(games)
  if (!currentUser) {
    return (
        <Route exact path='/'>
            <Login />
        </Route>
    )
  } else {
    return (
    <div className="root">
        <Route>
            <header>LOGO HEADER</header>
            {/* Navbar prob need its own component? for search and filter, but only when on /games */}
            <Nav />
        </Route>
      <Switch>
          <Route exact path="/games">
            <main className="game-library">
              <GameList games={games}/>
            </main>
          </Route>
          
          <Route exact path="/games/:id">
            <GamePage />
          </Route>
          <Route exact path="/users/:id">
            <UserPage />
          </Route>
          <Route path="*">
            <Redirect to="/games" />
          </Route>
      </Switch>
    </div>
    );
  }
}

export default App;

