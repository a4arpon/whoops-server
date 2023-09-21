"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const handle_error_1 = require("../errors/handle.error");
const jwt_token_manager_1 = __importDefault(require("../manager/jwt_token_manager"));
const user_model_1 = __importDefault(require("../models/user.model"));
const tokenManager = new jwt_token_manager_1.default();
class UserController {
    constructor() { }
    async register(req, res) {
        try {
            const { name, email, password, phone, photoUrl, address } = req.body;
            await Promise.resolve().then(async () => {
                const user = await user_model_1.default.register(name, email, password, phone, photoUrl, address);
                const token = tokenManager.createToken(user === null || user === void 0 ? void 0 : user._id);
                res.status(200).json({ user, token });
            });
        }
        catch (err) {
            await (0, handle_error_1.handleErrors)(err, res);
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            await Promise.resolve().then(async () => {
                const user = await user_model_1.default.login(email, password);
                const token = tokenManager.createToken(user._id);
                res.status(200).json({
                    id: user === null || user === void 0 ? void 0 : user._id,
                    token,
                });
            });
        }
        catch (err) {
            await (0, handle_error_1.handleErrors)(err, res);
        }
    }
    async getSingleUSer(req, res) {
        var _a;
        try {
            const { id } = req.params;
            const userID = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ msg: 'Invalid Query' });
                return;
            }
            if (id !== userID) {
                res.status(403).json({ msg: 'Forbidden' });
                return;
            }
            console.log(id, userID);
            await Promise.resolve().then(async () => {
                const user = await user_model_1.default.findById(id);
                res.status(200).json(user);
            });
        }
        catch (err) {
            await (0, handle_error_1.handleErrors)(err, res);
        }
    }
    async updateAnUser(req, res) {
        var _a;
        try {
            const { id } = req.params;
            const userID = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const { name, photoUrl, phone, address } = req.body;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ msg: 'Invalid Query' });
                return;
            }
            if (!id == userID) {
                res.status(404).json({ msg: 'Forbidden' });
                return;
            }
            await Promise.resolve().then(async () => {
                const user = await user_model_1.default.findByIdAndUpdate(id, {
                    name,
                    photoUrl,
                    phone,
                    address,
                }, { new: true });
                res.status(200).json(user);
            });
        }
        catch (err) {
            await (0, handle_error_1.handleErrors)(err, res);
        }
    }
    async deleteUser(req, res) {
        var _a;
        try {
            const { id } = req.params;
            const userID = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ msg: 'Invalid Query' });
                return;
            }
            if (!id == userID) {
                res.status(404).json({ msg: 'Forbidden' });
                return;
            }
            await Promise.resolve().then(async () => {
                const user = await user_model_1.default.findByIdAndDelete(id);
                res.status(200).json(user);
            });
        }
        catch (err) {
            await (0, handle_error_1.handleErrors)(err, res);
        }
    }
    async getAllUsers(req, res) {
        try {
            await Promise.resolve().then(async () => {
                const users = await user_model_1.default.find({});
                res.status(200).json(users);
            });
        }
        catch (err) {
            await (0, handle_error_1.handleErrors)(err, res);
        }
    }
}
exports.default = UserController;
