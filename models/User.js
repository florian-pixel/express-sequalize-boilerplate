const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
  password: {
    type: DataTypes.STRING,
    validate: {
      isAlphanumeric: true
    }
  },
  status: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['active', 'inactive']]
    },
    defaultValue: 'active',
    allowNull: true
  },
  role: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['administrator', 'manager', 'user']]
    },
    defaultValue: 'user',
    allowNull: true
  }
}

const userOptions = {
  timestamps: true,
  createdAt: true,
  updatedAt: true,
  scopes: {
    withoutPassword: {
      attributes: [
        "id",
        "lastName",
        "firstName",
        "fullName",
        "dateOfBirth",
        "email",
        "status",
      ],
    },
  },
  hooks: {
    beforeCreate: async function (user, options) {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
  modelName: "User",
};

const User = db.define('User', userModel, userOptions)

/* **  Sign a Web Token  ** */
User.getSignedJwtToken = (id) => jwt.sign(
  { id },
  process.env.SECRET,
  { expiresIn: '1d' }
)

/* **  Compare password  ** */
User.prototype.matchPassword = async function (password) {
  return bcrypt.compareSync(password, this.dataValues.password)
}

Post.author = Post.belongsTo(User)
User.posts = User.hasMany(Post, {
  as: 'posts',
  onDelete: 'CASCADE',
  onUpdate: ''
})

module.exports = User