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
import { baseUrl } from './services/api';
import ProtectedRoute from './helpers/ProtectedRoute';
import { useSelector } from 'react-redux';
import { selectToken, selectUser } from './redux/user';
import hasRole from './helpers/hasRole';
import EditCategories from './pages/EditCategories';
import ManageUsers from './pages/ManageUsers';
import CoinPage from './pages/CoinPage';

library.add(fas)

function App() {

  const user = useSelector(selectUser)
  const token = useSelector(selectToken)

  const fetchOption = {
    cacheLife: 0,
    cachePolicy: 'no-cache',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  return (
    <Provider options={fetchOption} url={baseUrl}>
      <BrowserRouter>
      <div className='bg-light'>
        <Routes>
          <Route path="/" element={<NavBar/>}>
            <Route index element={<ViewProducts />} />
            <Route element={<ProtectedRoute isAllowed={!!user} redirectPath="/login"/>}>
             <Route path="make/order" element={<MakeOrder />} />
             <Route path="profile" element={<Profile />} />
             <Route path="my-orders/:userId" element={<MyOrders />} />
             <Route path="user-orders/:userId" element={<MyOrders />} />
             <Route path="order/:orderId" element={<OrderDetails />} />
             <Route path="edit/categories" element={<EditCategories />} />
             <Route path="manage-users" element={<ManageUsers />} />
            </Route>
            <Route element={<ProtectedRoute isAllowed={hasRole(user,"Admin")} redirectPath="/login"/>}>
              <Route path="edit/product/" element={<EditProduct />} />
              <Route path="edit/product/:productId" element={<EditProduct />} />
              <Route path="manage-orders" element={<ManageOrders />} />
            </Route>
            <Route path="coins" element={<CoinPage />} />
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="product/:productId" element={<ProductDetails />} />
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
