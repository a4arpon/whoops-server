"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const handle_error_1 = require("../errors/handle.error");
const location_model_1 = __importDefault(require("../models/location.model"));
class LocationController {
    constructor() { }
    async allLocation(req, res) {
        try {
            await Promise.resolve().then(async () => {
                const locations = await location_model_1.default.find({});
                res.status(200).json(locations);
            });
        }
        catch (err) {
            await (0, handle_error_1.handleErrors)(err, res);
        }
    }
    async singleLocation(req, res) {
        try {
            const { id } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.send(404).json({ msg: 'location not found' });
                return;
            }
            await Promise.resolve().then(async () => {
                const location = await location_model_1.default
                    .findById(id)
                    .populate('resorts restaurants spots tourPackages ')
                    .exec();
                res.status(200).json(location);
            });
        }
        catch (err) {
            await (0, handle_error_1.handleErrors)(err, res);
        }
    }
    async createLocation(req, res) {
        try {
            const { name, photoUrl, description } = req.body;
            await Promise.resolve().then(async () => {
                const newLocation = await location_model_1.default.create({
                    name,
                    photoUrl,
                    description,
                });
                res.status(200).json(newLocation);
            });
        }
        catch (err) {
            await (0, handle_error_1.handleErrors)(err, res);
        }
    }
    async updateLocation(req, res) {
        try {
            const { id } = req.params;
            const { name, photoUrl, description } = req.body;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ msg: 'Invalid Query' });
                return;
            }
            await Promise.resolve().then(async () => {
                const newLocation = await location_model_1.default.findByIdAndUpdate(id, {
                    name,
                    photoUrl,
                    description,
                }, { new: true });
                res.status(200).json(newLocation);
            });
        }
        catch (err) {
            await (0, handle_error_1.handleErrors)(err, res);
        }
    }
    async deleteLocation(req, res) {
        try {
            const { id } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ msg: 'Invalid Query' });
                return;
            }
            await Promise.resolve().then(async () => {
                const location = await location_model_1.default.findByIdAndDelete(id);
                res.status(200).json(location);
            });
        }
        catch (err) {
            await (0, handle_error_1.handleErrors)(err, res);
        }
    }
}
exports.default = LocationController;
