import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector(state=> state.totalQuantity);

  return (
    <button className={classes.button} onClick={() => dispatch(cartActions.cartToggle())}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
