const router = require('express').Router();
const apiRoutes = require('./api');

// This allows the routes to go through or if sent wrong we send the error of 'wrong route'
router.use('/api', apiRoutes);
router.use(( req, res ) => {
    return res.send('Wrong route!');
});

module.exports = router;