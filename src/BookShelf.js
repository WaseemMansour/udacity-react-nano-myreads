import React, { Component } from 'react';
import Book from './Book';

class BookShelf extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
        this.handleShelfUpdate = this.handleShelfUpdate.bind(this);
    }
    static getDerivedStateFromProps(props, state) {
        if (props.shelfBooks !== state.books) {
            return {
            books: props.shelfBooks,
            };
        }
        // Return null if the state hasn't changed
        return null;
    }

    handleShelfUpdate(value) {
        this.props.onShelfUpdate(value);
    }

    render() {
        const {shelfName } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfName}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.state.books.map(book => {
                        return <li key={book.id}><Book onBookUpdate={this.handleShelfUpdate} bookData={book} /></li>
                    })                
                    }
                </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf;