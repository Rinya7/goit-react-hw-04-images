import { AppCss } from './App.styled';
import { Searchbar } from '../Searchbar/Searchbar';
import { Loader } from '../Loader/Loader';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Component } from 'react';
import { getFromApi } from '../../api/api';
import { Modal } from 'components/Modal/Modal';
//import axios from 'axios';

class App extends Component {
  state = {
    page: 1,
    searchWord: '',
    loader: false,
    loaderMore: false,
    totalPictures: null,
    error: null,
    pictures: [],
    imageModal: null,
    isEmpty: false,
    modal: null,
  };

  componentDidUpdate = (_, prevState) => {
    const { searchWord, page } = this.state;

    if (prevState.searchWord !== searchWord || prevState.page !== page) {
      this.sendSearchToApi(searchWord, page);
    }
  };

  sendSearchSubmit = ({ searchWord }) => {
    this.setState({
      searchWord: searchWord,
      page: 1,
      pictures: [],
      isEmpty: false,
    });
  };

  sendSearchToApi = async (searchWord, page) => {
    if (!searchWord) {
      return;
    }
    this.setState({
      loader: true,
    });
    try {
      const { hits, totalHits } = await getFromApi(searchWord, page);

      if (hits.length === 0) {
        this.setState({
          isEmpty: true,
        });
      }
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...hits],
        totalPictures: totalHits,
      }));
    } catch (error) {
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({
        loader: false,
      });
    }
  };

  btnLoadMore = () => {
    this.setState(prevstate => ({
      page: prevstate.page + 1,
    }));
  };
  modalOn = imageUrl => {
    this.setState({
      imageModal: imageUrl,
      modal: true,
    });
  };
  closeModal = modal => {
    this.setState({
      modal: false,
    });
  };

  render() {
    const {
      error,
      loader,
      totalPictures,
      loaderMore,
      pictures,
      isEmpty,
      imageModal,
      modal,
    } = this.state;

    return (
      <AppCss>
        <Searchbar handleSearch={this.sendSearchSubmit}></Searchbar>
        {isEmpty && <p>Sorry. There are no pictures</p>}
        {error && <h3>{error}</h3>}
        {loader && <Loader />}

        {pictures.length > 0 && (
          <>
            <ImageGallery
              pictures={pictures}
              clickOnImage={this.modalOn}
            ></ImageGallery>
            {loaderMore && <Loader />}
            {totalPictures - pictures.length > 1 ? (
              <Button clickOnMoreBtn={this.btnLoadMore}></Button>
            ) : (
              <p>Sorry. There are no pictures</p>
            )}
            {modal && (
              <Modal closeModal={this.closeModal}>
                <img src={imageModal} alt="Big pictures" />
              </Modal>
            )}
          </>
        )}
      </AppCss>
    );
  }
}

export { App };
