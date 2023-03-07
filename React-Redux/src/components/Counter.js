import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter)

  const incrementHandler = () => { 
    dispatch({type : 'INCREMENTBY5'})
  }

  const decrementHandler = () => { 
    dispatch({type : 'DECREMENTBY5'})
  }

  const toggleCounterHandler = () => { };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={decrementHandler}>Decrement by 5</button>
        <button onClick={incrementHandler}>Increment by 5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
