const router = require('express').Router();

const {
    createProfile,
    updateProfile,
    deleteProfile,
    addFriend,
    deleteFriend,
    getProfiles,
    getSingleProfile,
    updateProfileById,
    deleteProfileById
} = require('../../controllers/profileController');

router.route('/:profileId/friends/:friendId').post(addFriend).delete(deleteFriend);
router.route('/').get(getProfiles).post(createProfile);
router.route('/:profileId').get(getSingleProfile).put(updateProfileById).delete(deleteProfileById);

module.exports = router;