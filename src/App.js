import React from 'react';
import { Route } from 'react-router-dom';
// import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import Search from './Search';

class BooksApp extends React.Component {
  
  render() {
    return (
      <div className="app">
        <Route path="/search"
          render={()=> (
            <Search />
          )}
        />
        <Route
          exact path="/"
          render={()=> (
            <ListBooks />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
