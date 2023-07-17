import PropTypes from 'prop-types';
import { ButtonLoadMore } from './Button.styled';

export const Button = ({ clickOnMoreBtn }) => {
  return (
    <ButtonLoadMore type="button" onClick={() => clickOnMoreBtn()}>
      Load more...
    </ButtonLoadMore>
  );
};

Button.propTypes = {
  clickOnMoreBtn: PropTypes.func,
};
