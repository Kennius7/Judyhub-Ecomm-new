/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const sampleCart = [
    { id: 1, name: "Wireless Mouse", price: 25.99, quantity: 2 },
    { id: 2, name: "Mechanical Keyboard", price: 89.99, quantity: 1 },
    { id: 3, name: "USB-C Hub", price: 45.50, quantity: 1 }
];

const CartSection = ({ cart=sampleCart, addToCart, removeFromCart, updateQuantity, clearCart }) => {
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="py-20 px-4">
            <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
            {
                cart.length === 0 
                ? 
                (
                    <Typography variant="h6">Your cart is empty.</Typography>
                ) 
                : 
                (
                    <>
                        {
                            cart.map((item) => (
                                <Card key={item.id} style={{ marginBottom: '10px' }}>
                                    <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="h6">{item.name}</Typography>
                                        <Typography variant="body1">${item.price} x {item.quantity}</Typography>
                                        <div>
                                            <Button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                                            <Button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</Button>
                                        </div>
                                        <IconButton onClick={() => removeFromCart(item.id)}>
                                        <DeleteIcon />
                                        </IconButton>
                                    </CardContent>
                                </Card>
                            ))
                        }
                        <Typography variant="h6">Total: ${calculateTotal()}</Typography>
                        <Button variant="contained" color="secondary" onClick={clearCart}>Clear Cart</Button>
                    </>
                )
            }
        </div>
    );
};

export default CartSection;

