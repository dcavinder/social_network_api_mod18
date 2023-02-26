const router = require('express').Router();

const {
    createThought,
    updateOneThought,
    deleteOneThought,
    addReaction,
    deleteOneReaction,
    getThoughts,
    getOneThought
} = require('../../controllers/thoughtsController');

router
    .route('/:thoughtId')
    .put(updateOneThought)
    .get(getOneThought)
    .delete(deleteOneThought);

router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtsId').get(getOneThought).put(updateOneThought).delete(deleteOneThought);
router.route("/:thoughtsId/reactions").post(addReaction);
router.route("/:thoughtsId/reactions/:reactionsId").delete(deleteOneReaction);

module.exports = router;