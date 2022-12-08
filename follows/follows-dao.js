import followsModel from "./follows-model.js";
import mongoose from "mongoose";

export const followUser = (follow) => followsModel.create(follow) // function (err) {if (err) {}}

export const unFollowUser = (unFollow) => {
    return followsModel.deleteOne(unFollow)
}


export const findFollowers = (followed) => {
    return followsModel.find({followed}, {follower: true}).populate('follower', '_id username').exec()
}

export const findFollowing = (follower) => {
    return followsModel.find({follower}, {followed: true}).populate('followed', '_id username').exec()
}

export const findIfFollowing =(followed, follower) => {
    const ObjectId = mongoose.Types.ObjectId;
    return followsModel.find({followed: new ObjectId(followed), follower: new ObjectId(follower)})
}