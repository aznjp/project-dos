const router = require('express').Router()
    // const { Recipe, User, Comment } = require('../models');



// FOR FIND ALL LIMIT NUMBER OF RESPONSE TO 4 LAST POSTS
router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/signup', (req, res) => {

    res.render('signup');
});
module.exports = router