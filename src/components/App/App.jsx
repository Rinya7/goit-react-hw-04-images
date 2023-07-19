import { AppCss } from './App.styled';
import { Searchbar } from '../Searchbar/Searchbar';
import { Loader } from '../Loader/Loader';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { useEffect, useState } from 'react';
import { getFromApi } from '../../api/api';
import { Modal } from 'components/Modal/Modal';
//import axios from 'axios';

export function App() {
  const [page, setPage] = useState(1);
  const [searchWord, setSearchWord] = useState('');
  const [loader, setLoader] = useState(false);

  const [totalPictures, setTotalPictures] = useState(null);
  const [error, setError] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (!searchWord) {
      return;
    }
    sendSearchToApi(searchWord, page);
  }, [searchWord, page]);

  const sendSearchSubmit = searchWord => {
    setSearchWord(searchWord);
    setPage(1);
    setPictures([]);
    setIsEmpty(false);
  };

  const sendSearchToApi = async (searchWord, page) => {
    if (!searchWord) {
      return;
    }

    setLoader(true);

    try {
      const { hits, totalHits } = await getFromApi(searchWord, page);

      if (hits.length === 0) {
        setIsEmpty(true);
      }
      setPictures(prev => [...prev, ...hits]);
      setTotalPictures(totalHits);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoader(false);
    }
  };

  const btnLoadMore = () => {
    setPage(prevstate => prevstate + 1);
  };
  const modalOn = imageUrl => {
    setImageModal(imageUrl);
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  return (
    <AppCss>
      <Searchbar handleSearch={sendSearchSubmit}></Searchbar>
      {isEmpty && <p>Sorry. There are no pictures</p>}
      {error && <h3>{error}</h3>}
      {loader && <Loader />}

      {pictures.length > 0 && (
        <>
          <ImageGallery
            pictures={pictures}
            clickOnImage={modalOn}
          ></ImageGallery>

          {totalPictures - pictures.length > 1 ? (
            <Button clickOnMoreBtn={btnLoadMore}></Button>
          ) : (
            <p>Sorry. There are no pictures</p>
          )}
          {modal && (
            <Modal closeModal={closeModal}>
              <img src={imageModal} alt="Big pictures" />
            </Modal>
          )}
        </>
      )}
    </AppCss>
  );
}
