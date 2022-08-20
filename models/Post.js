const { DataTypes } = require('sequelize')
const db = require('../database/db')


const postModel = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type:DataTypes.STRING,
        validate: {
            isIn:[['active', 'inactive']]
        },
        defaultValue: 'inactive',
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}

const postOptions = {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    modelName: 'Post'
}

const Post = db.define('Post', postModel, postOptions)



module.exports = Post