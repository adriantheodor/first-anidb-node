import mongoose from "mongoose"
import express from 'express'
import cors from 'cors'
import session from 'express-session';
import UsersController from "./users/users-controller.js";
import SessionController from "./session-controller.js";
import {ReviewsController} from "./reviews/reviews-controller.js";
import {FavoritesController} from "./favorites/favorites-controller.js";
import FollowsController from "./follows/follows-controller.js";
import {RatingsController} from "./ratings/ratings-controller.js";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10, // Maintain up to 10 socket connections
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://0.0.0.0:27017/anidb"
//console.log(CONNECTION_STRING)
mongoose.connect(CONNECTION_STRING, options);

const app = express();



app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(session({
                    secret: 'could be anything',
                    resave: false,
                    saveUninitialized: true,
                    cookie: { secure: false }
                }))

app.use(express.json())
UsersController(app)
ReviewsController(app)
FavoritesController(app)
SessionController(app)
FollowsController(app)
RatingsController(app)

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Started on port ${port}`)
})