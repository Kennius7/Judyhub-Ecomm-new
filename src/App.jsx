/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Cart, Category, Login, Home, Product, Logout } from "./pages";
import { navLinks } from "./constants/data";
import { MainContext } from "./context/mainContext";



function App () {

  const [active, setActive] = useState("Home");

  return (
    <MainContext.Provider value={{active, setActive}}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path={navLinks[0].link} element={<Home/>} />
          <Route path={navLinks[1].link} element={<Category/>} />
          <Route path={navLinks[2].link} element={<Category/>} />
          <Route path={navLinks[3].link} element={<Category/>} />
          <Route path={navLinks[4].link} element={<Category/>} />
          <Route path="/product" element={<Product/>}>
            <Route path=":productID" element={<Product/>} />
          </Route>
          <Route path="/cart" element={<Cart/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/logout" element={<Logout/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </MainContext.Provider>
  )
}

export default App

