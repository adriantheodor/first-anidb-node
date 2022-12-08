import mongoose from "mongoose";

const ratingsSchema = mongoose.Schema(
    {
        animeId: String,
        animeTitle: String,
        rating: Number,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UsersModel'
        }
    }, {collection: 'ratings'}
)

ratingsSchema.index({animeId: 1, user: 1}, {unique: true}, {background: false})

export default ratingsSchema

