/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, query, orderBy, limit, startAfter, getDocs } from "firebase/firestore";
import { Container, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Select, MenuItem, Button,
} from "@mui/material";



const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("all");
    const [lastDoc, setLastDoc] = useState(null);
    const [firstDoc, setFirstDoc] = useState(null);
    const [isNext, setIsNext] = useState(true);
    const [isPrev, setIsPrev] = useState(false);
    const pageSize = 10;

  // Fetch orders from Firebase
    const fetchOrders = async (direction = "next") => {
        let orderQuery;
        const ordersRef = collection(db, "orders");

        if (direction === "next") {
            orderQuery = lastDoc
                ? query(ordersRef, orderBy("createdAt", "desc"), startAfter(lastDoc), limit(pageSize))
                : query(ordersRef, orderBy("createdAt", "desc"), limit(pageSize));
        } else {
            orderQuery = query(ordersRef, orderBy("createdAt", "desc"), limit(pageSize));
        }

        const querySnapshot = await getDocs(orderQuery);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setOrders(data);
        setFirstDoc(querySnapshot.docs[0]); // First doc on new page
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]); // Last doc for pagination
        setIsPrev(direction === "next" && firstDoc !== null);
        setIsNext(querySnapshot.docs.length === pageSize);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(order =>
        filter === "all" ? true : order.status === filter
    );


    return (
        <Container>
            <Typography variant="h4" style={{ margin: "20px 0" }}>Orders</Typography>

            <Select value={filter} onChange={e => setFilter(e.target.value)} style={{ marginBottom: "20px" }}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Amount (₦)</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            orders.length > 0 
                            ?
                            filteredOrders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.customer}</TableCell>
                                    <TableCell>{order.amount}</TableCell>
                                    <TableCell 
                                        style={{ 
                                            color: order.status === "completed" 
                                            ? "green" : order.status === "pending" 
                                            ? "orange" : "red" 
                                        }}
                                    >
                                        {order.status}
                                    </TableCell>
                                    <TableCell>{new Date(order.createdAt?.seconds * 1000).toLocaleString()}</TableCell>
                                </TableRow>
                            ))
                            :
                            <TableRow>
                                <TableCell>&nbsp;-----</TableCell>
                                <TableCell>&nbsp;-----</TableCell>
                                <TableCell>&nbsp;-----</TableCell>
                                <TableCell>&nbsp;-----</TableCell>
                                <TableCell>&nbsp;-----</TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <Button 
                    variant="contained" 
                    disabled={!isPrev} 
                    onClick={() => fetchOrders("prev")}
                >
                    Previous
                </Button>
                <Button 
                    variant="contained" 
                    disabled={!isNext} 
                    onClick={() => fetchOrders("next")}
                >
                    Next
                </Button>
            </div>
        </Container>
    );
};

export default OrderList;

