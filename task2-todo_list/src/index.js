import React from 'react';
import ReactDOM from 'react-dom/client';
import TodoList from './TodoList';

function App() {
  return(
    <>
      <TodoList />
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

