const {DataTypes} = require('sequelize')
const db = require('../database/db')
const Post = require('./Post')


const userModel = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: true,
        primaryKey: true
    },
    lastName: {
        type: DataTypes.STRING,

    },
    firstName: {
        type: DataTypes.STRING
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.firstName} ${this.lastName}` 
        }
    },
    dateOfBirth: {
        type: DataTypes.DATE
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
        },
        unique: true
    },
    status: {
        type: DataTypes.STRING,
        validate:{
            isIn: [['active', 'inactive']]
        },
        defaultValue: 'active',
        allowNull: true
    }
}

const userOptions = {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    modelName: 'User'
}
const User = db.define('User', userModel, userOptions)

Post.author = Post.belongsTo(User)
User.posts = User.hasMany(Post, {
    as: 'posts',
    onDelete: 'CASCADE',
    onUpdate: ''
})

module.exports = User