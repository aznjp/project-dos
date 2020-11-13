// import all models
const Recipe = require('./Recipe');
const User = require('./User');
const Vote = require('./Vote');
const Comment = require('./Comment');

// create associations
User.hasMany(Recipe, {
    foreignKey: 'user_id'
});

Recipe.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

User.belongsToMany(Recipe, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Recipe.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'recipe_id',
    onDelete: 'SET NULL'
});



// ============ Votes ==============

Vote.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Vote.belongsTo(Recipe, {
    foreignKey: 'recipe_id',
    onDelete: 'SET NULL'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Recipe.hasMany(Vote, {
    foreignKey: 'recipe_id'
});


// =========== Comments ============ 
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(Recipe, {
    foreignKey: 'recipe_id',
    onDelete: 'SET NULL'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Recipe.hasMany(Comment, {
    foreignKey: 'recipe_id'
});

module.exports = { User, Recipe, Vote, Comment };