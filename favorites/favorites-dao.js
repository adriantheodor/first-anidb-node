import favoritesModel from "./favorites-model.js";

export const addToFavorites = (favorite) => favoritesModel.create(favorite)

export const removeFromFavorties = (animeId, user) => favoritesModel.deleteOne({animeId, user})

export const findFavoritesByUser = (user) => favoritesModel.find({user})

export const isFav = (animeId, user) => favoritesModel.find({animeId, user}, {_id: true})