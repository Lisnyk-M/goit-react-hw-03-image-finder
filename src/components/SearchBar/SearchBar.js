import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.css';

class SearchBar extends Component {
    state = {
        inputValue: ''
    }

    handleChange = e => {
        this.setState({inputValue: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.inputValue);
        this.setState({inputValue: ''});
    }

    render() {
        return (
            <header className={styles.Searchbar} id="SearchBar">
                <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={styles.SearchForm_button}>
                        <span className={styles.SearchForm_button_label}>Search</span>
                    </button>

                    <input
                        className={styles.SearchForm_input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleChange}
                    />
                </form>
            </header>
        )
    }
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default SearchBar;

