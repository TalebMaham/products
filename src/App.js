import React from 'react';

import Transaction  from "./components/transaction/Transaction";
import ProductsList  from './components/products/ProductsList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

function App() {
  return (
    <div className="App">
      <ProductsList/>
    </div>
  );
}

export default App;
