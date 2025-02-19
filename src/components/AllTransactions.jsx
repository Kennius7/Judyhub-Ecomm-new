
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Container, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Select, MenuItem,
} from "@mui/material";



const AllTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const fetchTransactions = async () => {
            const querySnapshot = await getDocs(collection(db, "transactions"));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTransactions(data);
        };

        fetchTransactions();
    }, []);

    const filteredTransactions = transactions.filter(tx =>
        filter === "all" ? true : tx.status === filter
    );

    return (
        <Container>
            <Typography variant="h4" style={{ margin: "20px 0" }}>
                Transactions
            </Typography>

            <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{ marginBottom: "20px" }}
            >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="success">Successful</MenuItem>
                <MenuItem value="failed">Failed</MenuItem>
            </Select>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>Amount (₦)</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            transactions.length > 0 
                            ? 
                                filteredTransactions.map((tx) => (
                                    <TableRow key={tx.id}>
                                        <TableCell>{tx.email}</TableCell>
                                        <TableCell>{tx.amount}</TableCell>
                                        <TableCell
                                            style={{ color: tx.status === "success" ? "green" : "red" }}
                                        >
                                            {tx.status}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(tx.createdAt?.seconds * 1000).toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))
                            :
                            <TableRow>
                                <TableCell>&nbsp;-----</TableCell>
                                <TableCell>&nbsp;-----</TableCell>
                                <TableCell>&nbsp;-----</TableCell>
                                <TableCell>&nbsp;-----</TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
        );
};

export default AllTransactions;

