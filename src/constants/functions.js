import axios from "axios";
import { userAPI } from "../constants/api";



export const uploadCartData = async (email, cartData) => {
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

export const addCartData = (id, name, price, quantity, setProfileFormData) => {
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
    // uploadCartData(email, cartData);
}

export const updateCartData = (id, quantity, role, setProfileFormData) => {
    if (role === "add") {
        console.log("Role:", role, "Cart Data Id:", id);
        setProfileFormData(prevItems => ({
            ...prevItems,
            cartData: prevItems.cartData.map(item => item.id === id ? { ...item, quantity: quantity + 1 } : item)
        }))
        // uploadCartData(email, cartData);
    }
    if (role === "remove") {
        console.log("Role:", role, "Cart Data Id:", id);
        setProfileFormData(prevItems => ({
            ...prevItems,
            cartData: prevItems.cartData.map(item => item.id === id ? { ...item, quantity: quantity - 1 } : item)
        }))
        // uploadCartData(email, cartData);
    }
    if (quantity === 0) {
        console.log("Quantity after removed:", quantity);
        setProfileFormData(prevItems => prevItems.cartData.filter(item => item.id !== id))
        // uploadCartData(email, cartData);
    } 
}

export const removeCartData = (id, setProfileFormData) => {
    setProfileFormData(prevItems => ({
        ...prevItems,
        cartData: prevItems.cartData.filter(item => item.id !== id)
    }));
    // uploadCartData(email, cartData);
}

export const deleteAllCartData = (setProfileFormData) => { 
    setProfileFormData(prevData => ({ ...prevData, cartData: [] }));
    // uploadCartData(email, cartData);
}

export const calculateTotal = (data) => {
    return data.reduce(
        (total, item) => total + Number(item.price.replace(/,/g, "")) * item.quantity, 0
    ).toFixed(2);
};

export const formatNumber = (num) => {
    let [integerPart, decimalPart] = num.toString().split(".");
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
}

export function removeSpaces(str) {
    return str.includes(' ') ? str.replace(/\s+/g, '') : str;
}

export function shortenString(str, maxLength) {
    if (str.length > maxLength) {
        return str.slice(0, maxLength - 3) + "...";
    }
    return str;
}






