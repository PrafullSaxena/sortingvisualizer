import { useState } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <>
      <Provider store={store}>
        <div>Sample Project</div>
      </Provider>
    </>
  );
}

export default App;
