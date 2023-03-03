const User = require('../models/user');

module.exports = {
    getUsers(req, res) {
        User.find({})
        .select('-__v')
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate([
                { path: 'thoughts', select: '-__v' },
                { path: 'friends', select: '-__v' },
            ])
            .select('-__v')
            .then((user) => 
                !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {

    },
    updateUser(req, res) {

    },
    deleteUser(req, res) {

    },
    addFriend(req, res) {

    },
    deleteFriend(req, res) {
        
    }
}