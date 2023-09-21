"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
class jwtTokenManager {
    constructor() {
        this.secret = process.env.JWT_SECRET;
        this.expiresIn = '7d';
    }
    createToken(id) {
        try {
            const token = jsonwebtoken_1.default.sign({ id }, this.secret, {
                expiresIn: this.expiresIn,
            });
            return token;
        }
        catch (err) {
            throw new Error('Error while generating token.');
        }
    }
    verifyToken(token) {
        try {
            const verifiedToken = jsonwebtoken_1.default.verify(token, this.secret);
            return verifiedToken;
        }
        catch (err) {
            throw new Error('Error while generating token.');
        }
    }
}
exports.default = jwtTokenManager;
