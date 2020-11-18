const { Comment } = require('../models');

const commentdata = [{
        comment_text: 'What a great recipe!',
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: 'I cant believe how much hard work you put into this',
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: 'Will this work or not?',
        user_id: 3,
        post_id: 3
    },
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;