import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            query: ''
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleShelfUpdate = this.handleShelfUpdate.bind(this);
    }

    mergeResultswithMyReads(results, myReads) {
        const currentIDs = {};
        Object.keys(myReads).map(book => 
            currentIDs[myReads[book].id] = myReads[book].shelf
        )
        Object.keys(results).map(book => 
            results[book].shelf = currentIDs[results[book].id]
        )
        return results;
    }
    handleSearch(e) {
        
        const {myReads} = this.props;
        const {value} = e.target;
        let modifiedResults = [];
        value.length ? 
            this.debounce(BooksAPI.search(e.target.value)
            .then(res => {
                (res === undefined || res.error) ? 
                    this.setState({
                        results: []
                    })    
                :
                res.length && (modifiedResults = this.mergeResultswithMyReads(res, myReads))
                this.setState({
                    results: modifiedResults
                })
            }), 500)
        : 
        this.setState({results: []})
    }

    debounce(func, wait, immediate) {
        var timeout;
        
        return function executedFunction() {
            var context = this;
            var args = arguments;
                
            var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
            };
        
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
        
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        }
    }

    handleShelfUpdate(book) {
        this.props.onShelfUpdated(book)
    }

    componentDidMount(){
        this.nameInput.focus();
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input 
                        ref={(input) => { this.nameInput = input; }}
                        type="text"
                        onChange={this.handleSearch} 
                        placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        { this.state.results.length ? 
                            this.state.results.map(book => {
                                return <li key={book.id}><Book myReads={this.props.myReads} onBookUpdate={this.handleShelfUpdate} bookData={book} /></li>
                            })
                        : 
                            null
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;