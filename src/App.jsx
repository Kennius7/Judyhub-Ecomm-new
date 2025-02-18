/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Footer, AdminSection, AdvancedSection, MuiNavbar } from "./components";
import { Cart, Category, Login, Home, Product, Logout, Profile, SettingsPage, EditProfilePage } from "./pages";
import { navLinks } from "./constants/data";
import { MainContext } from "./context/mainContext";
import bannerPics from "./assets/Offers_BG.jpg";
import { ToastContainer } from 'react-toastify';
import '@mantine/core/styles.css';
import axios from "axios";
import { browserSessionPersistence, setPersistence } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { userAPI, productAPI } from "./constants/api";



function App () {
  const [active, setActive] = useState("Home");
  const [loginState, setLoginState] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [pathAccess, setPathAccess] = useState(false);
  const [fetchedData, setFetchedData] = useState({ products: [] });
  const [adminChecker, setAdminChecker] = useState(false);

  const checkEditProfilePicture = true;
  const persistence = () => {
    setPersistence(auth, browserSessionPersistence);
    console.log("Persistence fired...");
  }
  persistence();

  const [profileFormData, setProfileFormData] = useState({
    name: "Guest",
    email: "guest@mail.com",
    number: "10000100001",
    address: "",
    image: "",
    cartData: [],
  });


  const uploadCartData = async (email, cartData) => {
    try {
      const apiType = "UPDATECART";
      const response = await axios.post(userAPI, { email, cartData, apiType });
      console.log("Cart Data:>>>>", cartData);
      const message = response.data.message;
      console.log("Response:>>>>", message);
      // downloadProfileData();
    } catch (error) {
        console.error(error);
    }
  }

  const addCartData = (id, name, price, quantity, email, cartData) => {
    console.log("No cart data...");
    setProfileFormData(prevData => {
      const existingCart = prevData.cartData.find(item => item.id === id);
  
      if (!existingCart) {
        // Add new item if it doesn't exist
        return {
          ...prevData,
          cartData: [...prevData.cartData, { id, name, price, quantity }],
        };
      } else {
        // Update quantity if item already exists
        return {
          ...prevData,
          cartData: prevData.cartData.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
    });
    uploadCartData(email, cartData);
  }

  const updateCartData = (id, quantity, role, email, cartData) => {
    if (role === "add") {
      console.log("Role:", role, "Cart Data Id:", id);
      setProfileFormData(prevItems => ({
        ...prevItems,
        cartData: prevItems.cartData.map(item => item.id === id ? { ...item, quantity: quantity + 1 } : item)
      }))
      uploadCartData(email, cartData);
    }
    if (role === "remove") {
      console.log("Role:", role, "Cart Data Id:", id);
      setProfileFormData(prevItems => ({
        ...prevItems,
        cartData: prevItems.cartData.map(item => item.id === id ? { ...item, quantity: quantity - 1 } : item)
      }))
      uploadCartData(email, cartData);
    }
    if (quantity === 0) {
      console.log("Quantity after removed:", quantity);
      setProfileFormData(prevItems => prevItems.cartData.filter(item => item.id !== id))
      uploadCartData(email, cartData);
    } 
  }

  const removeCartData = (id, email, cartData) => {
    setProfileFormData(prevItems => ({
      ...prevItems,
      cartData: prevItems.cartData.filter(item => item.id !== id)
    }));
    uploadCartData(email, cartData);
  }

  const deleteAllCartData = (email, cartData) => { 
    setProfileFormData(prevData => ({ ...prevData, cartData: [] }));
    uploadCartData(email, cartData);
  }


  const downloadData = async () => {
    try {
        const apiType = "GETPRODUCTS";
        const response = await axios.get(productAPI, { apiType });
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
    const apiType = "FETCHUSERDATA"; 
    try {
        const response = await axios.get(userAPI, {
          apiType,
          headers: { 
              "Content-Type": "application/json", 
              Authorization: `Bearer ${userToken}`,
          },
          // withCredentials: false,
        });
        const { name, email, number, image, address, cartData } = response.data.data;

        setProfileFormData({ 
            ...profileFormData, 
            name: name, 
            email: email, 
            number: number,
            address: address,
            image: image,
            cartData: cartData,
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
        isLoggedIn, setIsLoggedIn, isTokenExpired, setIsTokenExpired, downloadProfileData, adminChecker, 
        checkEditProfilePicture, addCartData, updateCartData, removeCartData, deleteAllCartData, uploadCartData
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

