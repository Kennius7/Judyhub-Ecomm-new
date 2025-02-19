
import { Container, Typography, Card, CardContent, Button } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


const OrderConfirm = () => {
    const navigate = useNavigate();

    const handleGoToOrders = () => {
        navigate("/orders"); // Redirect to orders page
    };

    return (
        <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
            <Card elevation={3} style={{ padding: "20px" }}>
                <CheckCircleOutline style={{ fontSize: 80, color: "green" }} />
                <Typography variant="h4" gutterBottom>
                    Thank You for Your Order!
                </Typography>
                <Typography variant="body1">
                    Your order has been placed successfully. You will receive a confirmation email shortly.
                </Typography>
                <Typography variant="body2" style={{ marginTop: "10px" }}>
                    Order Number: <strong>#123456789</strong>
                </Typography>
                <CardContent>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleGoToOrders}
                        style={{ marginTop: "20px" }}
                    >
                        View My Orders
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default OrderConfirm;

