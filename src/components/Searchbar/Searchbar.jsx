import PropTypes from 'prop-types';
import {
  SearchbarCss,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';
const { Component } = require('react');

class Searchbar extends Component {
  state = {
    searchWord: '',
  };
  handleInputSearch = evt => {
    const { value } = evt.currentTarget;
    this.setState({
      searchWord: value,
    });
  };
  hundelSearchSubmit = evt => {
    const { searchWord } = this.state;
    evt.preventDefault();
    if (searchWord.trim() === '') {
      return alert('Input what you search');
    }
    this.props.handleSearch(this.state);

    this.setState({
      searchWord: '',
    });
  };
  render() {
    return (
      <SearchbarCss>
        <SearchForm onSubmit={this.hundelSearchSubmit}>
          <SearchFormBtn type="submit">
            <FcSearch></FcSearch>
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          </SearchFormBtn>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            value={this.state.searchWord}
            placeholder="Search images and photos"
            onChange={this.handleInputSearch}
          />
        </SearchForm>
      </SearchbarCss>
    );
  }
}

export { Searchbar };

Searchbar.propTypes = {
  handleSearch: PropTypes.func,
};
