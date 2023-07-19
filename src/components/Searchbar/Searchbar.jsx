import PropTypes from 'prop-types';
import {
  SearchbarCss,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';
const { useState } = require('react');

export function Searchbar({ handleSearch }) {
  const [searchWord, setSearchWord] = useState('');

  const handleInputSearch = evt => {
    const { value } = evt.currentTarget;
    setSearchWord(value);
  };
  const hundelSearchSubmit = evt => {
    evt.preventDefault();
    if (searchWord.trim() === '') {
      return alert('Input what you search');
    }
    handleSearch(searchWord);

    setSearchWord('');
  };

  return (
    <SearchbarCss>
      <SearchForm onSubmit={hundelSearchSubmit}>
        <SearchFormBtn type="submit">
          <FcSearch></FcSearch>
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          value={searchWord}
          placeholder="Search images and photos"
          onChange={handleInputSearch}
        />
      </SearchForm>
    </SearchbarCss>
  );
}

Searchbar.propTypes = {
  handleSearch: PropTypes.func,
};
