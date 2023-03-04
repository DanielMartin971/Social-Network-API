const router = require('express').Router();

// This allows the api routes connection to the controller and setting all the functions to constants here for easy usage
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// When routed correctly we can either get a user or create one with this route
router
    .route('/')
    .get(getUsers)
    .post(createUser);

// This will allow us to use a single userID; find them, update them or delete them
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

// This will also use a userID to find friends or a ID of a friend in their friend's list
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;
