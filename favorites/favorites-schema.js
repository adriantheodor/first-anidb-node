import mongoose from "mongoose";

const favoritesSchema = mongoose.Schema(
    {
        animeId: String,
        animeTitle: String,
        animeImg: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UsersModel'
        }
    }, {collection: 'favorites'}
)

await favoritesSchema.index({animeId: 1, user: 1}, {unique: true}, {background: false})

export default favoritesSchema