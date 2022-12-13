import express from 'express'
import cors from 'cors'
import session from 'express-session'
import mongoose from "mongoose"
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
    autoIndex: false,
    maxPoolSize: 10, // Maintain up to 10 socket connections
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb+srv://adrian:RcJ8nOXvz7Qd8BZQ@cluster0.q3n6zem.mongodb.net/?retryWrites=true&w=majority"
//console.log(CONNECTION_STRING)

mongoose.connect(CONNECTION_STRING, options);

const port = process.env.PORT || 4000

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



app.listen(port, () => {
    console.log(`Started on port ${port}`)
})