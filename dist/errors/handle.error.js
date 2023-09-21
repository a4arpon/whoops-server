"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
const handleErrors = async (error, res) => {
    try {
        await Promise.reject(error);
    }
    catch (err) {
        if (err instanceof Error)
            res.status(400).json({ msg: err.message });
        else
            res.status(400).json({ msg: 'An error occurred.' });
    }
};
exports.handleErrors = handleErrors;
