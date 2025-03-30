import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";





function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={ <Home /> }/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
