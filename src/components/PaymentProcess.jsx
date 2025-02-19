/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { Container, Typography, CircularProgress, Card, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";



const PaymentProcess = () => {
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const processPayment = async () => {
            try {
                const response = await fetch("/api/payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: "user@example.com", // Replace with dynamic user email
                        amount: 5000, // Amount in kobo (5000 kobo = 50 NGN)
                    }),
                });

                const data = await response.json();
                if (data.success && data.authorization_url) {
                    window.location.href = data.authorization_url; // Redirect to Paystack for payment
                } else {
                    setError(data.message || "Payment failed.");
                }
            } catch (err) {
                setError("Server error. Please try again.");
            } finally {
                setProcessing(false);
            }
        };
        // processPayment();
    }, []);


    return (
        <Container 
            maxWidth="sm" 
            style={{ 
                textAlign: "center", 
                paddingTop: "200px", 
                paddingBottom: "200px"
            }}
        >
            <Card elevation={3} style={{ padding: "20px" }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Payment Processing
                    </Typography>
                    {
                        processing ? (
                        <>
                            <CircularProgress size={60} />
                            <Typography variant="body1" style={{ marginTop: "10px" }}>
                                Redirecting to Paystack for payment...
                            </Typography>
                        </>
                        ) : error ? (
                            <Typography variant="body1" color="error">
                                {error}
                            </Typography>
                        ) : (
                            <Typography variant="body1" color="green">
                                Payment Successful! Redirecting...
                            </Typography>
                        )
                    }
                </CardContent>
                <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ marginTop: "50px" }}
                    onClick={() => navigate("/verify")}
                >
                    Confirm Payment
                </Button>
            </Card>
        </Container>
    );
};

export default PaymentProcess;

