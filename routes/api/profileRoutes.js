const router = require('express').Router();

const {
    createProfile,
    updateProfile,
    deleteProfile,
    addFriend,
    deleteFriend,
    getProfiles,
    getSingleProfile
} = require('../../controllers/profileController');

router.route('/:profileId/friends/:friendId').post(addFriend).delete(deleteFriend);
router.route('/').get(getProfiles).post(createProfile);
router.route('/:profileId').get(getSingleProfile).put(updateProfile).delete(deleteProfile);

module.exports = router;