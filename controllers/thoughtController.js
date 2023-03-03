const { User, Thought, Reaction } = require('../models');

module.exports = {

    // Get all thoughts
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

    // Get thoughts by ID
    getUserThoughts(req, res) {
        Thought.findOne({ _id: req.params.id })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: 'No thought found with this id' })
                    : res.json(thoughtData)
            )
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Create thoughts
    createThought(req, res) {
        Thought.create(req.body)
            .then(thoughtData => {
                User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thoughtData._id } },
                    { new: true }
                )
                    .then((UserData) =>
                        !UserData
                            ? res.status(404).json({ message: 'No user found with this id' })
                            : res.json(UserData)
                    )
                    .catch(err => res.json(err));
            })
            .catch(err => res.status(400).json(err));
    },

    // Update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            req.body,
            { new: true }
        )
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: 'No thought found with this id' })
                    : res.json(thoughtData)
            )
            .catch(err => res.status(400).json(err));
    },


    // Delete thought by id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thoughtData) => {
                !thoughtData
                    ? res.status(404).json({ message: 'No thought found with this id' })
                    : User.findOneAndUpdate(
                        { username: thoughtData.username },
                        { $pull: { thoughts: req.params.thoughtId } }
                    )
                        .then(() => {
                            res.json({ message: 'Successfully deleted the thought' });
                        })
                        .catch(err => res.status(500).json(err));
            })
            .catch(err => res.status(500).json(err));
    },

    // Add a reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        )
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: 'No thought found with this id' })
                    : res.json(thoughtData)
            )
            .catch(err => res.status(500).json(err));
    },

    // Delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },  //reactionId is undegined?
            { new: true }
        )
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: 'No thought found with this id' })
                    : res.json({ message: 'Successfully deleted the reaction' })
            )
            .catch(err => res.status(500).json(err));
    },
}