/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Footer, AdminSection, AdminButton } from "./components";
import { Cart, Category, Login, Home, Product, Logout } from "./pages";
import { navLinks } from "./constants/data";
import { MainContext } from "./context/mainContext";
import bannerPics from "./assets/Offers_BG.jpg";
import { ToastContainer } from 'react-toastify';
import '@mantine/core/styles.css';
import axios from "axios";
import { useEffect } from "react";
import Profile from "./pages/Profile";



function App () {
  const [active, setActive] = useState("Home");
  const [loginState, setLoginState] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [pathAccess, setPathAccess] = useState(false);
  const [fetchedData, setFetchedData] = useState({ products: [] });
  const apiGetDataUrl = import.meta.env.VITE_API_GETDATA_URL;

  const downloadData = async () => {
    console.log("Fetched Data:", fetchedData);
    if (fetchedData.products.length === 0 || fetchedData.products.length === undefined) {
      try {
          const response = await axios.get(apiGetDataUrl);
          const allProducts = response.data.data;
          setFetchedData({ ...fetchedData, products: allProducts, });
          console.log("Updated Data: ", fetchedData);
      } catch (error) {
        console.error("Error downloading data: >>>>", error.message);
        // downloadData();
      }
    } else {
      console.log("Data already fetched:", fetchedData);
      setPathAccess(true);
    }
  };

  useEffect(() => {
    downloadData();
  })



  return (
    <MainContext.Provider 
      value={{ 
        active, setActive, loginState, setLoginState, fetchedData, menuOpened, 
        setMenuOpened, pathAccess, setPathAccess 
      }}
    >
      <ToastContainer 
        position='top-right' 
        autoClose={4000} 
        hideProgressBar={false} 
        newestOnTop={true} 
        closeOnClick
        draggable
        pauseOnHover
        theme='light'
      />
      <BrowserRouter>
        <Header/>
        { !menuOpened && <AdminButton/> }
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
          <Route path="/admin" element={<AdminSection/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </MainContext.Provider>
  )
}

export default App

