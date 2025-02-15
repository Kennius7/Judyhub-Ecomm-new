/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Footer, AdminSection, AdvancedSection } from "./components";
import { Cart, Category, Login, Home, Product, Logout } from "./pages";
import { navLinks } from "./constants/data";
import { MainContext } from "./context/mainContext";
import bannerPics from "./assets/Offers_BG.jpg";
import { ToastContainer } from 'react-toastify';
import '@mantine/core/styles.css';
import axios from "axios";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import MuiNavbar from "./components/MuiNavbar";
import SettingsPage from "./pages/SettingsPage";
import EditProfilePage from "./pages/EditProfilePage";
import { browserSessionPersistence, setPersistence } from "firebase/auth";
import { auth } from "../firebaseConfig";



function App () {
  const [active, setActive] = useState("Home");
  const [loginState, setLoginState] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [pathAccess, setPathAccess] = useState(false);
  const [fetchedData, setFetchedData] = useState({ products: [] });
  const apiGetDataUrl = import.meta.env.VITE_API_GETDATA_URL;
  const apiGetProfileUrl = import.meta.env.VITE_API_GETPROFILE_URL;

  const primaryGreen = "#0db915";
  const secondaryBrown = "#613207";
  const checkEditProfilePicture = true;
  setPersistence(auth, browserSessionPersistence);

  const [profileFormData, setProfileFormData] = useState({
    name: "Guest",
    email: "guest@mail.com",
    number: "10000100001",
    address: "",
    image: "",
  });

  const [cartData, setCartData] = useState([]);

  const addCartData = (id, name, price, quantity) => {
    console.log("No cart data...");
    const cartDataList = cartData.find(item => item.id === id);

    if (!cartDataList) {
      setCartData(prevItems => [
        ...prevItems, { id: id, name: name, price: price, quantity: quantity },
      ])
    } else {
      setCartData(
        prevItems => prevItems.map(item => item.id === id ? { ...item, quantity: quantity + 1 } : item)
      )
    }
  }

  const updateCartData = (id, quantity, role) => {
    if (role === "add") {
      console.log("Role:", role, "Cart Data Id:", id);
      setCartData(
        prevItems => prevItems.map(item => item.id === id ? { ...item, quantity: quantity + 1 } : item)
      )
    }
    if (role === "remove") {
      console.log("Role:", role, "Cart Data Id:", id);
      setCartData(
        prevItems => prevItems.map(item => item.id === id ? { ...item, quantity: quantity - 1 } : item)
      )
    }
    if (quantity === 0) {
      console.log("Quantity after removed:", quantity);
      setCartData(prevItems => prevItems.filter(item => item.id !== id))
    } 
  }

  const removeCartData = (id) => {
    setCartData(prevItems => prevItems.filter(item => item.id !== id))
  }

  const deleteAllCartData = () => {
    setCartData([]);
  }


  const downloadData = async () => {
    try {
        const response = await axios.get(apiGetDataUrl);
        const allProducts = response.data.data;
        setFetchedData({ ...fetchedData, products: allProducts, });
        console.log("Updated Data: ", fetchedData);
        setPathAccess(true);
    } catch (error) {
      console.error("Error downloading data: >>>>", error.message);
      setPathAccess(false);
    }
  };

  const downloadProfileData = async () => {
    const userToken = localStorage.getItem("user-token");
    console.log("User Token: >>>>", userToken);
    try {
        const response = await axios.get(apiGetProfileUrl, {
          headers: { 
              "Content-Type": "application/json", 
              Authorization: `Bearer ${userToken}`,
          },
          // withCredentials: false,
        });
        const { name, email, number, image, address } = response.data.data;

        setProfileFormData({ 
            ...profileFormData, 
            name: name, 
            email: email, 
            number: number,
            address: address,
            image: image,
        });
        console.log("Updated Profile Data: ", profileFormData);
        setIsTokenExpired(false);
    } catch (error) {
      const errorMessage = error?.response?.data;
      if (userToken && errorMessage === "Invalid Token!") setIsTokenExpired(true);
      console.error("Error downloading data: >>>>", error);
    }
  };

  useEffect(() => {downloadData()}, [])

  useEffect(() => {
    if (profileFormData.name !== "Guest") {
      setIsLoggedIn(true);
      console.log("Logged In (Success):", isLoggedIn);
      console.log("Has Token Expired:", isTokenExpired);
    } else {
      downloadProfileData();
      setIsLoggedIn(false);
      console.log("Logged In (Failure):", isLoggedIn);
      console.log("Has Token Expired:", isTokenExpired);
    }
  });

  const [adminChecker, setAdminChecker] = useState(false);

  useEffect(() => {
    setAdminChecker(["ogbogukenny@yahoo.com", "wealthyjudy@gmail.com"].includes(profileFormData.email));
  }, [profileFormData.email])

  const AdminProtectedRoute = ({ isAuthenticated }) => {
    let location = useLocation();
    if (!isAuthenticated) {
      return <Navigate to="/" state={{ from: location }} replace />
    }
    return <Outlet />;
  }



  return (
    <MainContext.Provider 
      value={{ 
        active, setActive, loginState, setLoginState, fetchedData, menuOpened, profileFormData,
        setMenuOpened, pathAccess, setPathAccess, setFetchedData, downloadData, setProfileFormData,
        isLoggedIn, setIsLoggedIn, isTokenExpired, setIsTokenExpired, downloadProfileData,
        primaryGreen, secondaryBrown, adminChecker, checkEditProfilePicture, cartData, setCartData,
        addCartData, updateCartData, removeCartData, deleteAllCartData
      }}
    >
      <ToastContainer 
        position='top-right' 
        autoClose={1000} 
        hideProgressBar={false} 
        newestOnTop={true} 
        closeOnClick
        draggable
        pauseOnHover
        theme='light'
      />
      <BrowserRouter>
        <MuiNavbar/>
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
          <Route path="profile">
            <Route index element={<Profile/>}/>
            <Route path="settings">
              <Route index element={<SettingsPage/>} />
              <Route element={<AdminProtectedRoute isAuthenticated={adminChecker}/>}>
                <Route path="admin" element={<AdminSection/>} />
              </Route>
              <Route path="advanced" element={<AdvancedSection/>} />
            </Route>
            <Route path="editprofile" element={<EditProfilePage/>} />
          </Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </MainContext.Provider>
  )
}

export default App

