"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const booking_route_1 = __importDefault(require("./routes/booking.route"));
const location_route_1 = __importDefault(require("./routes/location.route"));
const resort_route_1 = __importDefault(require("./routes/resort.route"));
const resturant_route_1 = __importDefault(require("./routes/resturant.route"));
const spot_route_1 = __importDefault(require("./routes/spot.route"));
const tourPackage_route_1 = __importDefault(require("./routes/tourPackage.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.configureMiddlewares();
        this.setupRoutes();
        this.connectToDatabase();
    }
    configureMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, helmet_1.default)());
        // this.app.use(
        //   rateLimit({
        //     windowMs: 10 * 60 * 1000,
        //     max: 100,
        //   })
        // );
        this.app.use((0, express_mongo_sanitize_1.default)());
        this.app.use((0, hpp_1.default)());
    }
    setupRoutes() {
        this.app.get('/', (req, res) => {
            res.status(200).json({
                message: 'Server is up and running and waiting for human to handle! 😎',
            });
        });
        this.app.use('/api/user', user_route_1.default);
        this.app.use('/api/locations', location_route_1.default);
        this.app.use('/api/locations', resort_route_1.default);
        this.app.use('/api/locations/:id/restaurants', resturant_route_1.default);
        this.app.use('/api/locations/:id/spots', spot_route_1.default);
        this.app.use('/api/locations/:id/tour_packages', tourPackage_route_1.default);
        this.app.use('/api/bookings', booking_route_1.default);
    }
    connectToDatabase() {
        const URI = process.env.MONGO_URI;
        mongoose_1.default
            .connect(URI)
            .then(() => {
            const PORT = process.env.PORT || 4000;
            this.app.listen(PORT, () => {
                console.log(`✅ Server is up and running on port: ${PORT}`);
            });
        })
            .catch((error) => {
            console.error('❌ Error connecting to MongoDB:', error);
        });
    }
}
dotenv_1.default.config();
new App();
