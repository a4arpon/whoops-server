"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
exports.userSchema = new mongoose_1.Schema({
    name: {
        required: true,
        type: String,
    },
    photoUrl: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    password: {
        required: true,
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    role: {
        enum: ['user', 'admin'],
        default: 'user',
        type: String,
        required: true,
    },
    bookings: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Booking',
        },
    ],
    payments: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Payment',
        },
    ],
}, { timestamps: true });
exports.userSchema.statics.register = async function (name, email, password, phone, photoUrl, address) {
    if (!name || !email || !password || !photoUrl) {
        throw new Error('Must fill email, password and photo url.');
    }
    const existingUser = await this.findOne({ email });
    if (existingUser) {
        throw new Error('User is already exist.');
    }
    if (!validator_1.default.isEmail(email)) {
        throw new Error('Email must be valid.');
    }
    // if (!validator.isStrongPassword(password)) {
    //   throw new Error('Password must be strong. EX. Arpon69');
    // }
    const salt = await bcrypt_1.default.genSalt(10);
    // Hash generation
    const hash = await bcrypt_1.default.hash(password, salt);
    const user = await this.create({
        name,
        email,
        phone,
        photoUrl,
        address,
        password: hash,
    });
    return user;
};
exports.userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw new Error('Email and Password is required.');
    }
    const existingUser = await this.findOne({ email });
    if (!existingUser) {
        throw new Error('Incorrect email or password');
    }
    const match = bcrypt_1.default.compare(password, existingUser === null || existingUser === void 0 ? void 0 : existingUser.password);
    if (!match) {
        throw new Error('Incorrect email or password.');
    }
    return existingUser;
};
const UserModel = (0, mongoose_1.model)('User', exports.userSchema);
exports.default = UserModel;
