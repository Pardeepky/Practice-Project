import { useDispatch } from 'react-redux';
import { cartActions } from '../../store';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch();
  return (
    <button className={classes.button} onClick={() => dispatch(cartActions.cartToggle())}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
