const router = require('express').Router();
const { Recipe, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads')
//     },
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
//     }
// })
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

// const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get('/', (req, res) => {
    Recipe.findAll({
            attributes: [
                'id',
                'title',
                'ingredients',
                'instructions',
                'recipe_image',
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
        .then(function(dbRecipeData) {
            res.json(dbRecipeData)
            console.log(res.json(dbRecipeData))
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Recipe.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'ingredients',
                'instructions',
                'recipe_image',
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
                res.status(404).json({ message: 'No recipes found with this id' });
                return;
            }
            res.json(dbRecipeData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// router.post('/profile', upload.single('recipe-img'), function(req, res, next) {
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//     console.log(req.file)
// })

router.post('/', withAuth, (req, res) => {
    // console.log(req.body)
    Recipe.create({
            title: req.body.title,
            instructions: req.body.instructions,
            ingredients: req.body.ingredients,
            recipe_image: req.body.recipe_image,
            user_id: req.session.user_id
        })
        .then(dbRecipeData => res.json(dbRecipeData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.put('/:id', withAuth, (req, res) => {
    Recipe.update({
            title: req.body.title,
            instructions: req.body.instructions,
            ingredients: req.body.ingredients,
            recipe_image: req.body.recipe_image,
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(dbRecipeData => {
            if (!dbRecipeData) {
                res.status(404).json({ message: 'No recipes found with this id' });
                return;
            }
            res.json(dbRecipeData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    console.log('id', req.params.id);
    Recipe.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbRecipeData => {
            if (!dbRecipeData) {
                res.status(404).json({ message: 'No recipe found with this id' });
                return;
            }
            res.json(dbRecipeData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;