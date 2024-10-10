import mongoose from 'mongoose';
import Medicine from '../models/Medicine.js';

// MongoDB connection
mongoose
    .connect(
        'mongodb+srv://gauravgupta:MGYpibgHvfpLGW51@cluster0.azhi3ij.mongodb.net/medicine-stock',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// CRUD operations
// Create Medicine
export const createMedicine = async medicineData => {
    const medicine = new Medicine(medicineData);
    await medicine.save();
    return JSON.stringify(medicine);
};

// Read Medicines
export const getMedicines = async (search = '') => {
    const list = JSON.stringify(
        await Medicine.find({ name: new RegExp(search) })
    );
    return list;
};

// Update Medicine
export const updateMedicine = async (id, medicineData) => {
    return await Medicine.findByIdAndUpdate(id, medicineData, { new: true });
};

// Delete Medicine
export const deleteMedicine = async id => {
    return await Medicine.findByIdAndDelete(id);
};
