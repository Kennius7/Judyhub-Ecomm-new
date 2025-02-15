/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useContext } from 'react';
import { MainContext } from '../context/mainContext';
import getSymbolFromCurrency from 'currency-symbol-map';



const CartSection = () => {
    const { 
        cartData, updateCartData, removeCartData, deleteAllCartData, 
        primaryGreen, secondaryBrown 
    } = useContext(MainContext);

    console.log("Cart Data:>>>", cartData);
    const NGN = getSymbolFromCurrency('NGN');

    const calculateTotal = () => {
        return cartData.reduce(
            (total, item) => total + Number(item.price.replace(/,/g, "")) * item.quantity, 0
        ).toFixed(2);
    };

    const formatNumber = (num) => {
        let [integerPart, decimalPart] = num.toString().split(".");
        // if (!decimalPart) return integerPart;
    
        // Insert commas every 3 digits from the LEFT in the decimal part

        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;

        // integerPart = integerPart.replace(/(\d)(?=(\d{3})+(?!\d))/g, ",");
        // return integerPart + "." + decimalPart;
    }



    return (
        <div className="xs:py-[150px] py-[250px] xs:px-4 px-2 xs:w-[40%] w-full flex flex-col justify-center 
            xs:items-center items-start">
            <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
            {
                cartData.length === 0 
                ? 
                (
                    <Typography variant="h6">Your cart is empty.</Typography>
                ) 
                : 
                (
                    <div className='w-full'>
                        {
                            cartData.map((item) => (
                                <Card 
                                    key={item.id} 
                                    style={{ 
                                        width: window.innerWidth > 500 ? "100%" : "100%", 
                                        marginBottom: '10px',
                                        backgroundColor: "#dae9da"
                                    }}
                                >
                                    <CardContent 
                                        style={{ 
                                            width: "100%",
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center' 
                                        }}
                                    >
                                        <div className="xs:w-[70%] w-[100%] flex xs:flex-row flex-col 
                                            xs:justify-start justify-center xs:items-center items-start">
                                            <Typography 
                                                variant={window.innerWidth > 500 ? "h6" : "body6"} 
                                                fontWeight={"bold"}
                                            >
                                                {item.name}:
                                            </Typography>
                                            <Typography 
                                                variant="body1" 
                                                sx={{ 
                                                    fontSize: window.innerWidth > 500 ? 18 : 13, 
                                                    marginLeft: window.innerWidth > 500 ? 1 : 0 
                                                }}
                                            >
                                                ({NGN}{item.price} &nbsp;X&nbsp; {item.quantity})
                                            </Typography>
                                        </div>
                                        <div className="xs:w-[160px] w-[200px] flex justify-around items-center">
                                            <IconButton 
                                                sx={{ 
                                                    backgroundColor: primaryGreen, 
                                                    width: window.innerWidth > 500 ? 40 : 25, 
                                                    height: window.innerWidth > 500 ? 40 : 25, 
                                                }}
                                                onClick={() => updateCartData(item.id, item.quantity, "add")}
                                            >
                                                <AddIcon sx={{ color: "white", fontWeight: "bold" }}/>
                                            </IconButton>
                                            <IconButton 
                                                sx={{ 
                                                    backgroundColor: secondaryBrown, 
                                                    width: window.innerWidth > 500 ? 40 : 25, 
                                                    height: window.innerWidth > 500 ? 40 : 25, 
                                                }}
                                                onClick={() => updateCartData(item.id, item.quantity, "remove")} 
                                                // disabled={item.quantity === 1}
                                            >
                                                <RemoveIcon sx={{ color: "white", fontWeight: "bold" }}/>
                                            </IconButton>
                                            <IconButton 
                                                sx={{ 
                                                    backgroundColor: "black", 
                                                    width: window.innerWidth > 500 ? 40 : 25, 
                                                    height: window.innerWidth > 500 ? 40 : 25, 
                                                }}
                                                onClick={() => removeCartData(item.id)}
                                            >
                                                <DeleteIcon sx={{ color: "white", fontWeight: "bold" }} />
                                            </IconButton>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        }
                        {/* <Typography variant="h6">Total: ${calculateTotal() || 0}</Typography> */}
                        <div className="w-full flex justify-start items-center mb-8">
                            <Typography variant="h6">Total: {NGN}{formatNumber(calculateTotal())}</Typography>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <Button variant="contained" color="primary" onClick={deleteAllCartData}>
                                Go to Checkout
                            </Button>
                            <Button variant="contained" color="secondary" onClick={deleteAllCartData}>
                                Clear Cart
                            </Button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default CartSection;

