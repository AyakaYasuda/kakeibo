import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import Router from './Router';

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <main>
          <Router />
        </main>
        <Footer />
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
