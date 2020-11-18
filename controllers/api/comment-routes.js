const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, (req, res) => {
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            recipe_id: req.body.recipe_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.put('/:id', withAuth, (req, res) => {
    Comment.update({
            comment_text: req.body.comment_text,
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(dbRecipeData => {
            if (!dbRecipeData) {
                res.status(404).json({ message: 'No Comments found with this id' });
                return;
            }
            // else if (!req.session.user_id) {
            //     res.status(404).json({ message: 'This is not your comment!' });
            //     return;
            // }
            res.json(dbRecipeData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id!' });
                return;
            }
            // else if (!req.session.user_id) {
            //     res.status(404).json({ message: 'This is not your comment!' });
            //     return;
            // }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;