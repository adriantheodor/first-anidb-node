import reviewsModel from "./reviews-model.js";

export const createReview = (review) => reviewsModel.create(review)

export const findReviewsByAnime = (animeId) => reviewsModel.find({animeId}).populate('author').exec()

export const findReviewsByAuthor = (author) => reviewsModel.find({author})
