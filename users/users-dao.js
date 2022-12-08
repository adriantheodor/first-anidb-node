import usersModel from "./users-model.js";
import favoritesModel from "../favorites/favorites-model.js";
import followsModel from "../follows/follows-model.js";
import ratingsModel from "../ratings/ratings-model.js";
import reviewsModel from "../reviews/reviews-model.js";
import mongoose from "mongoose";

export const findUsersList = (uid) => {
    return usersModel.find({accountType: 'OTAKU', _id: {$ne: uid}})
}

export const createUser = (user) =>
    usersModel.create(user)

export const register = async (user) => {
    const existingUser = await findByUsername(user.username)
    if (existingUser) {

    }
}

export const findAllUsers = () =>
    usersModel.find({accountType: 'OTAKU'})

export const findUserById = (uid) =>
    usersModel.findById(uid)

export const findByUsername = (username) =>
    usersModel.findOne({username})

export const findByCredentials = (username, password) =>
    usersModel.findOne({username, password})

export const deleteUser = (uid) => {
    const delete_user = usersModel.findByIdAndDelete(uid)
    const delete_ratings = ratingsModel.deleteMany({user: uid})
    const delete_followed = followsModel.deleteMany({followed: uid})
    const delete_follower = followsModel.deleteMany({follower: uid})
    const delete_favourites = favoritesModel.deleteMany({user: uid})
    const delete_reviews = reviewsModel.deleteMany({author: uid})
    return Promise.all([delete_user, delete_ratings, delete_followed, delete_follower, delete_favourites, delete_reviews])
}



export const updateUser = (uid, userUpdates) =>
    usersModel.updateOne({_id: uid},
        {$set: userUpdates})

export const updateCurrentUser = (uid, update) =>
    usersModel.findOneAndUpdate({_id: uid},
        {$set: update}, {returnDocument: "after"})
