const router = require('express').Router();
const { Recipe, User, Comment } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/edit/:id', (req, res) => {
    Recipe.findByPk(req.params.id, {
            attributes: [
                'id',
                'title',
                'ingredients',
                'instructions',
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
            if (dbRecipeData) {
                const recipe = dbRecipeData.get({ plain: true });

                res.render('edit-recipe', {
                    recipe,
                    loggedIn: true
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/new-recipe', (req, res) => {
    Recipe.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'ingredients',
                'instructions',
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
            res.render('new-recipe', { recipes, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;