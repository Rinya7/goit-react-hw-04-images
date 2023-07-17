import PropTypes from 'prop-types';
import { ImageGalleryUl } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
export const ImageGallery = ({ pictures, clickOnImage }) => {
  return (
    <ImageGalleryUl>
      {pictures.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          tags={tags}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          clickOnImage={clickOnImage}
        ></ImageGalleryItem>
      ))}
    </ImageGalleryUl>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,

  clickOnImage: PropTypes.func,
};
