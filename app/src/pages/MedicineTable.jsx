import React, { useCallback, useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Container,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const MedicineTable = () => {
    const [openAddMedicine, setOpenAddMedicine] = useState(false);
    const [openBuy, setOpenBuy] = useState(false);
    const [openSell, setOpenSell] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newMedicine, setNewMedicine] = useState({ name: '', stock: '' });
    const [buyQuantity, setBuyQuantity] = useState();
    const [sellQuantity, setSellQuantity] = useState();
    const [medicineId, setMedicineId] = useState();
    const [currectStock, setCurrectStock] = useState();

    // Open/Close modals
    const handleClickOpenBuy = (id, quantity) => {
        setMedicineId(id);
        setCurrectStock(quantity);
        setOpenBuy(true);
    };

    const handleClickOpenSell = (id, quantity) => {
        setMedicineId(id);
        setCurrectStock(quantity);
        setOpenSell(true);
    };

    const handleCloseBuy = () => {
        setOpenBuy(false);
    };

    const handleCloseSell = () => {
        setOpenSell(false);
    };

    const handleCloseAddMedicine = () => {
        setOpenAddMedicine(false);
        setNewMedicine({ name: '', stock: '' });
    };

    // Handle form input changes
    const handleInputChange = e => {
        const { name, value } = e.target;
        setNewMedicine(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle search input change
    const handleSearchChange = e => {
        setSearchQuery(e.target.value);
    };

    // Add new medicine to table
    const handleAddMedicine = async () => {
        handleCloseAddMedicine();

        const createdMedicine = await window.electron.createMedicine({
            name: newMedicine.name,
            stock: newMedicine.stock,
        });
        console.log(createdMedicine);

        setMedicines(prev => [...prev, JSON.parse(createdMedicine)]);
    };

    const getMedicines = useCallback(async () => {
        const list = JSON.parse(
            await window.electron.getMedicines(searchQuery)
        );

        setMedicines(list);
    }, [searchQuery]);

    useEffect(() => {
        getMedicines();
    }, [getMedicines]);

    // Handle buy and sell actions
    const handleBuy = async () => {
        const updatedStock = parseInt(currectStock) + parseInt(buyQuantity);
        await window.electron.updateMedicine(medicineId, {
            stock: updatedStock,
        });

        setMedicines(prev =>
            prev.map(med =>
                med._id === medicineId ? { ...med, stock: updatedStock } : med
            )
        );
        handleCloseBuy();
        setBuyQuantity();
    };

    const handleSell = async () => {
        const updatedStock = parseInt(currectStock) - parseInt(sellQuantity);
        await window.electron.updateMedicine(medicineId, {
            stock: updatedStock,
        });

        setMedicines(prev =>
            prev.map(med =>
                med._id === medicineId ? { ...med, stock: updatedStock } : med
            )
        );

        handleCloseSell();
        setSellQuantity();
    };

    return (
        <Container maxWidth='false' sx={{ py: 5 }}>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'>
                <Box>
                    <Typography variant='h4' fontWeight={500}>
                        Medicine List
                    </Typography>
                    <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{ wordSpacing: '2px' }}>
                        A dedicated space for medicine inventory management.
                    </Typography>
                </Box>
                <Box>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => setOpenAddMedicine(true)}>
                        Add Medicine
                    </Button>
                </Box>
            </Box>

            {/* Search Box */}
            <Box mt={3} display='flex' alignItems='center'>
                <TextField
                    size='small'
                    margin='dense'
                    label='Search Medicine'
                    fullWidth
                    variant='outlined'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{ flexGrow: 1, mr: 1 }}
                    InputProps={{
                        endAdornment: <SearchIcon position='end' />,
                    }}
                />
            </Box>

            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S. No</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!medicines.length ? (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    sx={{ textAlign: 'center' }}>
                                    No data available
                                </TableCell>
                            </TableRow>
                        ) : (
                            medicines.map((medicine, index) => (
                                <TableRow key={medicine._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{medicine.name}</TableCell>
                                    <TableCell>{medicine.stock}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            size='small'
                                            onClick={() =>
                                                handleClickOpenBuy(
                                                    medicine._id,
                                                    medicine.stock
                                                )
                                            }>
                                            Buy
                                        </Button>
                                        <Button
                                            variant='contained'
                                            color='secondary'
                                            size='small'
                                            sx={{ ml: 1 }}
                                            onClick={() =>
                                                handleClickOpenSell(
                                                    medicine._id,
                                                    medicine.stock
                                                )
                                            }>
                                            Sell
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal for adding medicine */}
            <Dialog open={openAddMedicine} onClose={handleCloseAddMedicine}>
                <DialogTitle>Add New Medicine</DialogTitle>
                <DialogContent>
                    <TextField
                        size='small'
                        margin='dense'
                        label='Medicine Name'
                        name='name'
                        fullWidth
                        variant='outlined'
                        value={newMedicine.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        size='small'
                        margin='dense'
                        label='Stock'
                        name='stock'
                        type='number'
                        fullWidth
                        variant='outlined'
                        value={newMedicine.stock}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseAddMedicine}
                        variant='contained'
                        color='secondary'
                        size='small'>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAddMedicine}
                        variant='contained'
                        color='primary'
                        size='small'>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal for buying medicine */}
            <Dialog open={openBuy} onClose={handleCloseBuy}>
                <DialogTitle>Buy Medicine</DialogTitle>
                <DialogContent>
                    <TextField
                        size='small'
                        margin='dense'
                        label='Quantity to Buy'
                        type='number'
                        fullWidth
                        variant='outlined'
                        value={buyQuantity}
                        onChange={e => setBuyQuantity(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseBuy}
                        variant='contained'
                        color='secondary'
                        size='small'>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleBuy}
                        variant='contained'
                        color='primary'
                        size='small'>
                        Buy
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal for selling medicine */}
            <Dialog open={openSell} onClose={handleCloseSell}>
                <DialogTitle>Sell Medicine</DialogTitle>
                <DialogContent>
                    <TextField
                        size='small'
                        margin='dense'
                        label='Quantity to Sell'
                        type='number'
                        fullWidth
                        variant='outlined'
                        value={sellQuantity}
                        onChange={e => setSellQuantity(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseSell}
                        variant='contained'
                        color='secondary'
                        size='small'>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSell}
                        variant='contained'
                        color='primary'
                        size='small'>
                        Sell
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default MedicineTable;
