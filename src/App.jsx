import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Wishlist from "./Components/Wishlist/Wishlist";
import Notfound from "./Components/Notfound/Notfound";
import TokenContextProvider from "./context/TokenContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Logged from "./Components/LoggedProtectedRoute/Logged";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { ToastContainer } from "react-toastify";
import CheckoutSession from "./Components/CheckoutSession/CheckoutSession";
import WishlistProvider from "./context/WishlistContext";
import AllOrders from "./Components/AllOrders/AllOrders";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: (
            <Logged>
              <Login />
            </Logged>
          ),
        },
        {
          path: "register",
          element: (
            <Logged>
              <Register />
            </Logged>
          ),
        },
        {
          path: "forgetpassword",
          element: (
            <Logged>
              <ForgetPassword />
            </Logged>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "ProductDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkoutsession/:cartId",
          element: (
            <ProtectedRoute>
              <CheckoutSession />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <>
      <WishlistProvider>
        <TokenContextProvider>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition:Bounce
          />
        </TokenContextProvider>
      </WishlistProvider>
    </>
  );
}

export default App;
