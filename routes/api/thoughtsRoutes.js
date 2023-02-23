const router = require('express').Router();

const {
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
    getThoughts,
    getSingleThought
} = require('../../controllers/thoughtsController');

router.route('/:thoughtId/reactions').post(addReaction).deleteReaction(deleteReaction);
router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtsId').get(getSingleThought).put(updateThought).delete(deleteThought);

module.exports = router;