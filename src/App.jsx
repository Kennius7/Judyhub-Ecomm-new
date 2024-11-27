/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Cart, Category, Login, Home, Product, Logout } from "./pages";
import { navLinks } from "./constants/data";
import { MainContext } from "./context/mainContext";
import bannerPics from "./assets/Offers_BG.jpg";



function App () {

  const [active, setActive] = useState("Home");
  const [loginState, setLoginState] = useState(false);

  return (
    <MainContext.Provider value={{ active, setActive, loginState, setLoginState }}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path={navLinks[0].link} element={<Home/>} />
          <Route path={navLinks[1].link} element={<Category category={navLinks[1].name} banner={bannerPics}/>} />
          <Route path={navLinks[2].link} element={<Category category={navLinks[2].name} banner={bannerPics}/>} />
          <Route path={navLinks[3].link} element={<Category category={navLinks[3].name} banner={bannerPics}/>} />
          <Route path={navLinks[4].link} element={<Category category={navLinks[4].name} banner={bannerPics}/>} />
          <Route path="/product" element={<Product/>}>
            <Route path=":productId" element={<Product/>} />
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

