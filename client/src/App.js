import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/UI/Header';
import Router from './Router';

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <main>
          <Router />
        </main>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
