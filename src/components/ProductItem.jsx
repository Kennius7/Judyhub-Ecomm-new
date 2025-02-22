/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, CardActions, Typography, Box } from '@mui/material';
import { ShoppingCart, Search } from "@mui/icons-material";
import getSymbolFromCurrency from 'currency-symbol-map'
import { useContext } from "react";
import { MainContext } from "../context/mainContext";
import { primaryGreen, secondaryBrown } from "../constants/colors";
import { addCartData } from "../constants/functions";



const ProductItem = ({ item: { id, name, image, newPrice, oldPrice } }) => {
    // const tags = ['New', 'Popular', 'Limited Edition'] 
    const navigate = useNavigate();
    const { profileFormData, setProfileFormData } = useContext(MainContext);
    const stock = 20;
    const NGN = getSymbolFromCurrency('NGN');
    const itemQuantity = profileFormData.cartData.find(item => item.id === id);
    const productQuantity = itemQuantity ? itemQuantity.quantity : 1;
    // console.log("Filtered Data:>>>", productQuantity);


    return (
        <Card
            sx={{ 
                width: window.innerWidth > 500 ? 195 : (window.innerWidth * 0.333) - 10, 
                boxShadow: 5, 
                borderRadius: 2,
                padding: 0,
                margin: 0, 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                alignItems: "flex-start",
                position: "relative",
            }}
        >
            <CardMedia
                onClick={() => navigate(`/product/${id}`) }
                component="img"
                height="100"
                image={image}
                alt={name}
            />
            <Search 
                htmlColor={"#fff"} 
                sx={{ 
                    width: 30, 
                    height: 30,
                    position: "absolute",
                    zIndex: 4,
                    top: "25%",
                    left: "40%",
                }} 
            />

            {/* Product Details */}
            <CardContent 
                sx={{ 
                    padding: 1,
                    marginTop: -1,
                    height: 100, 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center", 
                    alignItems: "flex-start",
                }}
            >
                {/* Product Name */}
                <Typography 
                    variant="h6" 
                    component="div" 
                    color={secondaryBrown}
                    sx={{ 
                        mt: -3,
                        fontSize: window.innerWidth > 500 ? 14 : 12
                    }}
                >
                    {name}
                </Typography>
        
                {/* Price Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0 }}>
                    <Typography 
                        variant="body1" 
                        color={primaryGreen} 
                        sx={{ 
                            mr: 1, 
                            fontSize: window.innerWidth > 500 ? 14 : 11 
                        }}
                    >
                        {NGN}{newPrice}
                    </Typography>
                    {
                        oldPrice && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ 
                                    textDecoration: 'line-through', 
                                    fontSize: window.innerWidth > 500 ? 14 : 10
                                }}
                            >
                                {NGN}{oldPrice}
                            </Typography>
                        )
                    }
                </Box>

                <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                        mt: window.innerWidth > 500 ? 0 : 0.5, 
                        fontSize: window.innerWidth > 500 ? 14 : 9 
                    }}
                >
                    Stock: {stock || 1} pieces.
                </Typography>
            </CardContent>

            {/* Actions */}
            <CardActions className="w-full h-[25px] flexBetween xs:-mt-6 -mt-8 !important">
                <ShoppingCart 
                    onClick={() => addCartData(id, name, newPrice, productQuantity, setProfileFormData)}
                    htmlColor={primaryGreen} 
                    sx={{ 
                        width: window.innerWidth > 500 ? 22 : 15, 
                        height: window.innerWidth > 500 ? 22 : 15, 
                        borderRadius: "51%" 
                    }} 
                />
                <Typography 
                    onClick={() => navigate(`/product/${id}`) }
                    variant="body2" 
                    color={secondaryBrown} 
                    sx={{ mt: 0, fontSize: window.innerWidth > 500 ? 14 : 9 }}>
                    See more
                </Typography>
            </CardActions>
        </Card>
    )
}


export default ProductItem
