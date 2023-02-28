const router = require('express').Router();
const profileRoutes = require('./profileRoutes');
const thoughtsRoutes = require('./thoughtsRoutes');

router.use('/profile', profileRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;