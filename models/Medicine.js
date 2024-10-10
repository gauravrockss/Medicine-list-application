import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
});

const Medicine = mongoose.model('Medicine', medicineSchema);

export default Medicine;
