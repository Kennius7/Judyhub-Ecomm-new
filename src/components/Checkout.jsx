
import { useContext } from "react";
import { MainContext } from '../context/mainContext';
import { 
    Container, Grid2, TextField, Button, Typography, Card, 
    CardContent, FormControl, InputLabel, Select, MenuItem 
} from "@mui/material";
import { calculateTotal, formatNumber } from "../constants/functions";
import getSymbolFromCurrency from 'currency-symbol-map';
import ScrollToTop from "../../ScrollToTop";



const CheckoutPage = () => {
    const { profileFormData, setProfileFormData } = useContext(MainContext);
    const { cartData, paymentMethod } = profileFormData;
    const NGN = getSymbolFromCurrency('NGN');

    const handleChange = (e) => {
        setProfileFormData({ ...profileFormData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Order placed successfully!");
    };


    return (
        <Container maxWidth="md">
            <ScrollToTop/>
            <Typography variant="h4" gutterBottom>
                Checkout
            </Typography>
            <Grid2 container spacing={4}>
                {/* Billing Details */}
                <Grid2 
                    item 
                    xs={12} 
                    md={6} 
                    sx={{ 
                        width: window.innerWidth > 500 ? "60%" : "100%" 
                    }}
                >
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                Billing Details
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <TextField 
                                    fullWidth 
                                    label="Full Name"
                                    name="name" 
                                    margin="normal" 
                                    required 
                                    onChange={handleChange} 
                                />
                                <TextField 
                                    fullWidth 
                                    label="Email" 
                                    name="email" 
                                    type="email" 
                                    margin="normal" 
                                    required 
                                    onChange={handleChange} 
                                />
                                <TextField 
                                    fullWidth 
                                    label="Address" 
                                    name="address" 
                                    margin="normal" 
                                    required 
                                    onChange={handleChange} 
                                />
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Payment Method</InputLabel>
                                    <Select 
                                        name="paymentMethod" 
                                        value={paymentMethod} 
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="creditCard">Credit Card</MenuItem>
                                        <MenuItem value="paypal">PayPal</MenuItem>
                                        <MenuItem value="bankTransfer">Bank Transfer</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    color="primary" 
                                    fullWidth
                                    sx={{ marginTop: 4 }}
                                >
                                    Place Order
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid2>
                
                {/* Order Summary */}
                <Grid2 item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                Order Summary:
                            </Typography>
                            <hr className="w-full h-[2px] bg-slate-600 mb-4" />
                                {
                                    cartData.map((item) => (
                                        <Typography key={item.id} variant="h6" sx={{ fontSize: 18 }}>
                                            {item.name}: {NGN}{item.price}&nbsp;&nbsp;X&nbsp;&nbsp;{item.quantity}
                                        </Typography>
                                    ))
                                }
                            <Typography 
                                variant="h6" 
                                marginTop={2}
                            >
                                Total: {NGN}{formatNumber(calculateTotal(cartData))}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </Container>
    );
};

export default CheckoutPage;

