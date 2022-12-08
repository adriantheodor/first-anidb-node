import mongoose from "mongoose";
import ratingsSchema from "./ratings-schema.js";

const ratingsModel = mongoose.model('RatingsModel', ratingsSchema)

export default ratingsModel