"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_token_manager_1 = __importDefault(require("../manager/jwt_token_manager"));
const user_model_1 = __importDefault(require("../models/user.model"));
const tokenManager = new jwt_token_manager_1.default();
class AuthMiddleware {
    constructor() { }
    async verifyUser(req, res, next) {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            res.status(401).json({ msg: 'Unauthorized' });
            return;
        }
        try {
            const payload = tokenManager.verifyToken(token);
            const user = await user_model_1.default.findById(payload.id);
            if (!user) {
                res.status(401).json({ msg: 'Unauthorized' });
                return;
            }
            req.user = user;
            next();
        }
        catch (err) {
            res.status(401).json({ msg: 'Unauthorized' });
            return;
        }
    }
    verifyAdmin(req, res, next) {
        const user = req.user;
        if (user && user.role === 'admin') {
            next();
        }
        else {
            res.status(401).json({ msg: 'Unauthorized' });
            return;
        }
    }
}
exports.default = AuthMiddleware;
