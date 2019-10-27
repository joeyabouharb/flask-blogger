import React from 'react';
import { InjectRoutes as Routes } from '../services/routes';
import Header from './header';
import Footer from './footer';

const App = () => (
  <>
    <Header />
    { Routes }
    <Footer />
  </>
);

export default App;
