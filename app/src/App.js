import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MedicineTable from './pages/MedicineTable';

const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<MedicineTable />} />
            </Routes>
        </>
    );
};

export default App;
