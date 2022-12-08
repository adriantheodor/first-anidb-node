import ratingsModel from "./ratings-model.js";

export const createRating = (rating) => ratingsModel.create(rating)

export const updateRating = (rating) => ratingsModel.findOneAndUpdate(
    {
        animeId: rating.animeId,
        user: rating.user
    },
    {
        rating: rating.rating
    },
    {
        returnDocument: "after",
        projection: { rating: true, _id: false }
    }
)

export const findRatingForAnime = (animeId, user) => ratingsModel.find({animeId, user}, {rating: true, _id: false})

export const findRatingsByUser = (user) => ratingsModel.find({user})