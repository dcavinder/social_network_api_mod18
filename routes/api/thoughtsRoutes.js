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

router.route('/:thoughtsId/reactions').post(addReaction).deleteReaction(deleteReaction);
router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtsId').get(getSingleThought).put(updateSingleThought).delete(deleteThought);

module.exports = router;