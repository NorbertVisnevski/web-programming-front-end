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
import Profile from './pages/Profile';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MyOrders from './pages/MyOrders';
import OrderDetails from './components/UserOrders/OrderDetails';
import ManageOrders from './pages/ManageOrders';

library.add(fas)

function App() {

  return (
    <Provider url="https://localhost:7070/api">
      <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<NavBar/>}>
            <Route path="edit/product/" element={<EditProduct />} />
            <Route path="edit/product/:productId" element={<EditProduct />} />
            <Route path="make/order" element={<MakeOrder />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="product/:productId" element={<ProductDetails />} />
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="manage-orders" element={<ManageOrders />} />
            <Route path="order/:orderId" element={<OrderDetails />} />
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
