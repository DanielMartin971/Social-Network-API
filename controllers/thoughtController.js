const { User, Thought, Reaction } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find({})
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })

    },

    getUserThoughts(req, res) {
        Thought.findOne({ _id: req.params.id })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then((thoughtData) => 
                !thoughtData
                    ? res.status(404).json({ message: 'No thought found with this ID'})
                    : res.json(thoughtData)
            )
            .catch(err => {
                console.log(err);
                res.status.json(err);
            })
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then(thoughtData => {
                User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thoughtData._id } },
                    { new: true }
                )
                    .then((UserData) => {
                        !UserData
                            ? res.status(404).json({ message: 'No user found with this id' })
                            : res.json(UserData)
                    })
                    .catch(err => res.json(err));
            }) 
            .catch(err => res.status(400).json(err));
    },
    updateThought(req, res) {
        
    },
    deleteThought(req, res) {

    },
    addReaction(req, res) {

    },
    deleteReaction(req, res) {

    }
}