/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Cart, Category, Login, Home, Product } from "./pages";



function App () {

  const [active, setActive] = useState("Home");

  return (
    // eslint-disable-next-line no-undef
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/men" element={<Category/>} />
          <Route path="/women" element={<Category/>} />
          <Route path="/kids" element={<Category/>} />
          <Route path="/product" element={<Product/>}>
            <Route path=":productID" element={<Product/>} />
          </Route>
          <Route path="/cart" element={<Cart/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
  )
}

export default App

