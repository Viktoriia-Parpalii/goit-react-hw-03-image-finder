import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';

export class Searchbar extends Component {
  handleSearchSubmit = e => {
    e.preventDefault();
    const searchedImagesName =
      e.currentTarget.elements.searchedImagesName.value;
    this.props.saveSearchedImagesNameInState(searchedImagesName);
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSearchSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label "></span> <BsSearch />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            name="searchedImagesName"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
