import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SellerDashboard from "./pages/seller/SellerDashboard";
import NotFound from "./pages/NotFound";
import AdminRoute from "./components/admin/AdminRoute";
import SellerRoute from "./components/seller/SellerRoute";
import SellerLayout from "./layout/SellerLayout";
import AdminLayout from "./layout/DashboardLayout";
import Profile from "./pages/Profile/Profile";
import AllSellers from "./pages/admin/AllSellers";
import AllUsers from "./pages/admin/AllUsers";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import UserAuthRoute from "./components/UserAuthRoute";
import Search from "./pages/Search/Search";
import Order from "./pages/Order/Order";
import AllOrders from "./pages/admin/AllOrders";
import AllSellerOrders from "./pages/seller/AllSellerOrders";

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout> <Home /> </Layout>}/>
      <Route path="/product/:id" element={<Layout> <ProductDetails /> </Layout>}/>
      <Route path="/search" element={<Layout> <Search/> </Layout>}/>
      
      <Route element={<UserAuthRoute />}>
        <Route path="/me" element={<Layout> <Profile /> </Layout>}/>
        <Route path="/order/:productId" element={<Layout> <Order /> </Layout>}/>
      </Route>

      
      <Route path="/login" element={<Login />} />
      <Route path="/signup/:role" element={ <Signup /> }/>

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          
          <Route path="/admin/product" element={<AdminDashboard />} />
          <Route path="/admin/sellers" element={<AllSellers />} />
          <Route path="/admin/users" element={<AllUsers />} />
          <Route path="/admin/orders" element={<AllOrders />} />
          
        </Route>
      </Route>

      {/* seller routes */}
      <Route element={<SellerRoute/>}>
        <Route element={<SellerLayout />}>
          <Route path="/seller/product" element={<SellerDashboard />} />
          <Route path="/seller/orders" element={<AllSellerOrders />} />
        </Route>
      </Route>

      {/* Not Found Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
