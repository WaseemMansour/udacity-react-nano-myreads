import React, { Component } from 'react'

class Book extends Component {
    constructor(props) {
        super(props);
        this.handleMoveToShelf = this.handleMoveToShelf.bind(this);
        // console.log(props)
    }

    handleMoveToShelf(event) {
        const { value } = event.target
        this.props.bookData.shelf = value;
        this.props.onBookUpdate(this.props.bookData)
    }

    render() {
        const { title, authors, imageLinks, shelf } = this.props.bookData;
        
        return (
            
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${imageLinks.thumbnail ? imageLinks.thumbnail :''})` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={this.handleMoveToShelf} value={shelf || 'none'}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors ? authors[0] : ''}</div>
            </div>
        
        );
    }
}

export default Book;