const router = require('express').Router();
const { Recipe, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const path = require('path')
const cloudinary = require("../../utils/cloudinary")
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get('/', (req, res) => {
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


router.post('/', upload.single('recipe-img'), withAuth, async(req, res) => {

    req.body.ingredients.replace(/(\r\n|\n|\r)/gm, "<br />");
    req.body.instructions.replace(/(\r\n|\n|\r)/gm, "<br />");
    req.body.description.replace(/(\r\n|\n|\r)/gm, "<br />");

    const result = await cloudinary.uploader.upload(req.file.path);

    console.log(result)

    Recipe.create({
            title: req.body.title,
            instructions: req.body.instructions,
            ingredients: req.body.ingredients,
            description: req.body.description,
            recipe_image: result.secure_url,
            cloudinary_id: result.public_id,
            user_id: req.session.user_id
        })
        .then(dbRecipeData => res.json(dbRecipeData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.put('/:id', upload.single('recipe-img'), withAuth, async(req, res) => {
    let recipe = await Recipe.findByPk(req.params.id);
    await cloudinary.uploader.destroy(recipe.cloudinary_id);

    req.body.ingredients.replace(/(\r\n|\n|\r)/gm, "<br />");
    req.body.instructions.replace(/(\r\n|\n|\r)/gm, "<br />");
    req.body.description.replace(/(\r\n|\n|\r)/gm, "<br />");

    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result)
    Recipe.update({
            title: req.body.title,
            instructions: req.body.instructions,
            ingredients: req.body.ingredients,
            description: req.body.description,
            recipe_image: result.secure_url,
            cloudinary_id: result.public_id,
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

router.delete('/:id', withAuth, async(req, res) => {
    let recipe = await Recipe.findByPk(req.params.id);
    await cloudinary.uploader.destroy(recipe.cloudinary_id);

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