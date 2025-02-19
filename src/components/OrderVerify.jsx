/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, Typography, Card, CardContent, CircularProgress, Button } from "@mui/material";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";



const OrderConfirmation = () => {
    const [searchParams] = useSearchParams();
    const reference = searchParams.get("reference"); // Get reference from URL
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("failed");
    const [buttonText, setButtonText] = useState("Verifying...");
    const handleButtonText = () => {
        loading ? setButtonText("Verifying...") 
        : paymentStatus === "success" ? setButtonText("Check Your Orders") 
        : setButtonText("Retry Payment")
    }
    const handleOrderButton = () => {
        if (loading) {
            console.log("Verifying...");
            return;
        }
        if (paymentStatus === "success") {
            navigate("/orders");
            return;
        }
        if (paymentStatus === "failed") {
            navigate("/checkout");
            return;
        }
    }

    useEffect(() => {
        if (!reference) {
            const verifyPayment = async () => {
                try {
                    const response = await fetch(`/api/verify-payment?reference=${reference}`);
                    const data = await response.json();
                    if (data.success) {
                        setPaymentStatus("success");
                    } else {
                        setPaymentStatus("failed");
                    }
                } catch (error) {
                    setPaymentStatus("error");
                } finally {
                    setLoading(false);
                }
            };
            // verifyPayment();
        } else {
            setLoading(false);
            setPaymentStatus("no-reference");
        }
        handleButtonText();
    }, [reference]);



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
                    {
                        loading ? (
                            <>
                                <CircularProgress size={60} />
                                <Typography variant="body1">Verifying payment...</Typography>
                            </>
                        ) : paymentStatus === "success" ? (
                            <>
                                <CheckCircleOutline style={{ fontSize: 80, color: "green" }} />
                                <Typography variant="h4">Payment Successful!</Typography>
                                <Typography variant="body1">Your order has been confirmed.</Typography>
                            </>
                        ) : (
                            <>
                                <ErrorOutline style={{ fontSize: 80, color: "red" }} />
                                <Typography variant="h4">Payment Failed</Typography>
                                <Typography variant="body1">
                                    {
                                        paymentStatus === "no-reference"
                                            ? "No payment reference found."
                                            : "Your payment could not be verified."
                                    }
                                </Typography>
                            </>
                        )
                    }
                    <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ marginTop: "50px" }}
                        onClick={handleOrderButton}
                    >
                        {buttonText}
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default OrderConfirmation;

