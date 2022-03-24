import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'use-http'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import EditProduct from './pages/EditProduct';
import NotFound from './pages/NotFound';
import ViewProducts from './pages/ViewProducts';
import NavBar from './layout/NavBar/NavBar';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import ProductCart from './pages/ProductCart';
import MakeOrder from './pages/MakeOrder';

library.add(fas)

function App() {

  return (
    <Provider url="https://localhost:7070/api">
      <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/edit/product">Edit</Link>
            </li>
            <li>
              <Link to="products">Products</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<NavBar/>}>
            <Route path="edit/product/" element={<EditProduct />} />
            <Route path="edit/product/:productId" element={<EditProduct />} />
            <Route path="make/order" element={<MakeOrder />} />
            <Route path="cart" element={<ProductCart />} />
            <Route path="products" element={<ViewProducts />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
