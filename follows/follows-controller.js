import * as dao from './follows-dao.js'

const FollowsController = (app) => {
    const followUser = async (req, res) => {
        const follow = req.body
        const currentUser = req.session['currentUser']
        follow.follower = currentUser._id
        const actualFollow = await dao.followUser(follow)
        res.json(actualFollow)
    }
    const unFollowUser = async (req, res) => {
        const unFollow = req.body
        const currentUser = req.session['currentUser']
        unFollow.follower = currentUser._id
        const result = await dao.unFollowUser(unFollow)
        res.json(result)
    }
    const findFollowers = async (req, res) => {
        const followers = await dao.findFollowers(req.params.followed)
        res.json(followers)
    }
    const findFollowing = async (req, res) => {
        const followed = await dao.findFollowing(req.params.follower)
        res.json(followed)
    }
    const findIfFollowing = async (req, res) => {
        const followed = req.params.followed
        const follower = req.session['currentUser']
        let ifFollowed = false
        if (follower) {
            const result = await dao.findIfFollowing(followed, follower._id)
            if (result.length) {
                ifFollowed = true
            }
        }
        res.json(ifFollowed)
    }

    app.post('/follows', followUser)
    app.delete('/follows', unFollowUser)
    app.get('/follows/:followed/followers', findFollowers)
    app.get('/follows/:follower/following', findFollowing)
    app.get('/follows/:followed/if-following', findIfFollowing)
}

export default FollowsController