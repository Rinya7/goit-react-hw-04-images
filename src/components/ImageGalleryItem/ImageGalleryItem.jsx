import PropTypes from 'prop-types';
import {
  ImageGalleryItemLi,
  ImageGalleryItemImg,
} from './ImageGalleryItem.styled';
export const ImageGalleryItem = ({
  tags,
  webformatURL,
  clickOnImage,
  largeImageURL,
}) => {
  return (
    <ImageGalleryItemLi>
      <ImageGalleryItemImg
        src={webformatURL}
        alt={tags}
        onClick={() => clickOnImage(largeImageURL, tags)}
      />
    </ImageGalleryItemLi>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  clickOnImage: PropTypes.func,
  largeImageURL: PropTypes.string.isRequired,
};
