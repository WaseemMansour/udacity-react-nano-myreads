import React from 'react'
const Book = props => {
    const { title, authors, imageLinks, shelf } = props.bookData;

    const handleMoveToShelf = event => {
        const { value } = event.target
        props.bookData.shelf = value;
        props.onBookUpdate(props.bookData)
    }
    return (
        <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${imageLinks.thumbnail ? imageLinks.thumbnail :''})` }}></div>
            <div className="book-shelf-changer">
                <select onChange={handleMoveToShelf} value={shelf || 'none'}>
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

export default Book;