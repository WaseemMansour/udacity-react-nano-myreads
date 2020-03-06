import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

class ListBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
        this.handleShelfUpdate = this.handleShelfUpdate.bind(this);
    }
    componentDidMount() {
        this.setState({books: this.props.books})
    }

    static getDerivedStateFromProps(props, state) {
        if (props.books !== state.books) {
            return {
            books: props.books,
            };
        }

        // Return null if the state hasn't changed
        return null;
    }

    handleShelfUpdate(value) {
        this.props.onShelfUpdated(value);
    }

    render() {
        const currentlyReadingBooks = this.state.books.filter(book => {
            return book.shelf === "currentlyReading";
        });
        const wantToRead = this.state.books.filter(book => {
            return book.shelf === "wantToRead";
        });
        const read = this.state.books.filter(book => {
            return book.shelf === "read";
        });
        return (
            <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf onShelfUpdate={this.handleShelfUpdate} shelfName="Currently Reading" shelfBooks={currentlyReadingBooks} />
                    <BookShelf onShelfUpdate={this.handleShelfUpdate} shelfName="Want to Read" shelfBooks={wantToRead} />
                    <BookShelf onShelfUpdate={this.handleShelfUpdate} shelfName="Read" shelfBooks={read} />
                </div>
            </div>
            <div className="open-search">
                <Link 
                    to={{
                        pathname: "/search",
                        books: this.props.books
                    }}>
                    <button type="button">
                    Add a book
                    </button>
                </Link>
            </div>
            </div>
        );
    }
}

export default ListBooks;