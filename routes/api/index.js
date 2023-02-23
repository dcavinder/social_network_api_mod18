const router = require('express').Router();
const profileRoutes = require('./profileRoutes');
const thoughtsRoutes = require('./thoughtsRoutes');

router.use('/profiles', profileRoutes);
router.use('/thoughts', thoughtsRoutes);
