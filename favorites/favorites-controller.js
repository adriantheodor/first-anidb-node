import * as dao from './favorites-dao.js'

export const FavoritesController = (app) => {

    const addToFavorites = async (req, res) => {
        const favorite = req.body
        const currentUser = req.session['currentUser']
        favorite.user = currentUser._id
        const storedFavorite = await dao.addToFavorites(favorite)
        res.json(storedFavorite)
    }

    const removeFromFavorites = async (req, res) => {
        const result = await dao.removeFromFavorties(req.params.animeId, req.session['currentUser']._id)
        // console.log(result)
        res.send(result)
    }

    const isFavorite = async (req, res) => {
        const fav = await dao.isFav(req.params.animeId, req.session['currentUser']._id)
        // console.log(fav)
        res.json(fav)
    }

    const findFavoritesByUser = async (req, res) => {
        const result = await dao.findFavoritesByUser(req.params.userId)
        // console.log(result)
        res.json(result)
    }

    app.post('/api/favorites', addToFavorites)
    app.delete('/api/favorites/:animeId', removeFromFavorites)
    app.get('/api/anime/:animeId/isfavorite', isFavorite)
    app.get('/api/users/:userId/favorites', findFavoritesByUser)
}
