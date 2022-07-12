import { Fragment } from 'react';
import Header from './components/UI/Header';
import Router from './Router';

const App = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <Router />
      </main>
    </Fragment>
  );
};

export default App;
