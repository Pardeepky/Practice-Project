import { cartActions } from "."

export const getCartData = () => {
    return async dispatch => {
        const getData = async () => {
            const res = await fetch('https://redux-api-9a076-default-rtdb.firebaseio.com/cart.json')
            if (!res.status) {
                throw new Error('Sending cart data failed')
            } else {
                const data = await res.json();
                return data;
            }
        }
        try {
            const cartData = await getData();
            dispatch(cartActions.replaceCart({
                cartItem: cartData.cartItem || [],
                totalQuantity: cartData.totalQuantity
            }));
        } catch (err) {
            dispatch(cartActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching Cart Data failed!'
            }))
        }
    }
}

export const sendCartData = (cart, totalQuantity) => {
    console.log(cart, totalQuantity);
    return async (dispatch) => {
        dispatch(
            cartActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending Cart Data!'
            })
        )

        const sendRequest = async () => {
            const res = await fetch('https://redux-api-9a076-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify({
                    cartItem: cart,
                    totalQuantity: totalQuantity,
                })
            })
            if (!res.status) {
                throw new Error('Sending cart data failed')
            }
        }

        try {
            await sendRequest();
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
}