import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { cartActions } from './store';
import Notification from './components/UI/Notification';

let initial = true;

function App() {
  const showCart = useSelector(state => state.showCart)
  const cart = useSelector(state => state.cartItem);
  const notification = useSelector(state => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initial) {
      initial = false;
      return
    }

    const sendResponseData = async () => {
      dispatch(cartActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending Cart Data!'
      }))
      try {
        const res = await fetch('https://redux-api-9a076-default-rtdb.firebaseio.com/cart.json', {
          method: 'PUT',
          body: JSON.stringify(cart)
        })
        if (!res.status) {
          throw new Error('Sending cart data failed')
        }
        dispatch(cartActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent Cart Data successfully!'
        }))
      } catch (err) {
        console.log(err);
        dispatch(cartActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending Cart Data failed!'
        }))
      }
    }
    sendResponseData();
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
