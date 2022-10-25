const router = require('express').Router();
const thoughtsRoutes = require('./thoughtsRoutes.js');
const userRoutes = require('./userRoutes.js');

router.use('/user', userRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;