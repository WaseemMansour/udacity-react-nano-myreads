import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import Search from "./Search";
import ListBooks from "./ListBooks";

class BooksApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleUpdateShelf = this.handleUpdateShelf.bind(this);
    }
    state = {
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll().then(res => {
            this.setState(() => ({
                books: res
            }));
        });
    }

    handleUpdateShelf(book) {
        this.setState(prevState => {
            let newBooks = prevState.books.filter(b => b.id !== book.id);
            return {
                books: [...newBooks, book]
            };
        });

        BooksAPI.update(book, book.shelf);
    }

    render() {
        return (
            <div className="app">
                <Route
                    path="/search"
                    render={() => <Search myReads={this.state.books} onShelfUpdated={this.handleUpdateShelf} />}
                />
                <Route
                    exact
                    path="/"
                    render={() => (
                        <ListBooks
                            onShelfUpdated={this.handleUpdateShelf}
                            books={this.state.books}
                        />
                    )}
                />
            </div>
        );
    }
}

export default BooksApp;
