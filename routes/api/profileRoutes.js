const router = require('express').Router();

const {
    createProfile,
    updateOneProfile,
    deleteOneProfile,
    addFriend,
    deleteFriend,
    getProfiles,
    getOneProfile,
    updateProfileById,
    deleteProfileById
} = require('../../controllers/profileController');

router.route('/:profileId/friends/:friendId').post(addFriend).delete(deleteFriend);
router.route('/').get(getProfiles).post(createProfile);
router.route('/:profileId').get(getOneProfile).put(updateOneProfile).delete(deleteOneProfile);

module.exports = router;