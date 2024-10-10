import { contextBridge } from 'electron';
import {
    createMedicine,
    updateMedicine,
    deleteMedicine,
    getMedicines,
} from './utils/server.js';

contextBridge.exposeInMainWorld('electron', {
    createMedicine,
    updateMedicine,
    deleteMedicine,
    getMedicines,
});
