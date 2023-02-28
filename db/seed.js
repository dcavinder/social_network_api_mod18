const connection = require('../config/connection');
const { Profile, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await Profile.deleteMany({});
    await Thought.deleteMany({});

    const profileSet = [
        {
            username: 'JimmyK',
            email: 'jimmy@email.com',
        },
        {
            username: 'SusanG',
            email: 'susan@email.com',
        },
        {
            username: 'CoolHat24',
            email: 'coolhat@email.com',
        }
    ]

    const thoughtsSet = [
        {
            thoughtText: 'testing, testing 1,2,3...!',
            username: 'susanG'
        },
        {
            thoughtText: 'Happy Wednesday!',
            username: 'CoolHat24',
        },
        {
            thoughtText: 'Please let me pass this assignment',
            username: 'SusanG',
        },
        {
            thoughtText: 'Let me see if this works',
            username: 'JimmyK'
        },
    ]
    
    await Profile.collection.insertMany(profileSet)
    await Thought.collection.insertMany(thoughtsSet)

  console.info('Seed completed');
  process.exit(0);
});