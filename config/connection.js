const { connect, connection } = require('mongoose');

connect('mongodb://localhost/27017/social_media_api.social_mediia_api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;