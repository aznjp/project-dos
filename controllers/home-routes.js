const router = require('express').Router()
const { Recipe, User, Comment } = require('../models');

router.get('/', (req, res) => {
    console.log('======================');
    Recipe.findAll({
            attributes: [
                'id',
                'title',
                'ingredients',
                'instructions',
                'description',
                'recipe_image',
                'cloudinary_id',
                'created_at',
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'recipe_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbRecipeData => {
            const recipes = dbRecipeData.map(recipe => recipe.get({ plain: true }));

            res.render('homepage', {
                recipes,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/recipe/:id', (req, res) => {
    Recipe.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'ingredients',
                'instructions',
                'description',
                'recipe_image',
                'cloudinary_id',
                'created_at',
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'recipe_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbRecipeData => {
            if (!dbRecipeData) {
                res.status(404).json({ message: 'No recipe found with this id' });
                return;
            }

            const recipe = dbRecipeData.get({ plain: true });

            res.render('single-recipe', {
                recipe,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// FOR FIND ALL LIMIT NUMBER OF RESPONSE TO 4 LAST POSTS
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login')
})

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

module.exports = router