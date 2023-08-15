import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import Product from './components/Product';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Products />}></Route>
          <Route path='/addProduct' element={<AddProduct />}></Route>
          <Route exact path='/product/:sku' element={<Product />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
