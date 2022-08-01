const {DataTypes} = require('sequelize')
const db = require('../database/db')


const PostModel = {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    status: {
        type: DataTypes.STRING,
        validate:{
            isIn: [['published', 'draft']]
        },
        allowNull: true,
        defaultValue: 'draft'
    }
    
    
}

const PostOptions = {
    timestamps: true,
    createAt: true,
    updatedAt: true,
    modelName: 'Post'

}

const Post = db.define('Post', PostModel, PostOptions )
module.exports = Post