import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Notification from './components/UI/Notification';
import { getCartData, sendCartData } from './store/cart-actions';

let initial = true;

function App() {
  const showCart = useSelector(state => state.showCart)
  const cart = useSelector(state => state.cartItem);
  const totalQuantity = useSelector(state => state.totalQuantity);
  const isChanged = useSelector(state=> state.changed);
  const notification = useSelector(state => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);


  useEffect(() => {
    if (initial) {
      initial = false;
      return
    }
    if (isChanged) {
      dispatch(sendCartData(cart, totalQuantity))
    }
  }, [cart, dispatch])

  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
