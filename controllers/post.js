const Post = require('../models/Post')

exports.createPost = async (req, res, next) => {
    const post = await Post
        .create({
            ...req.body
        })
        .catch(err => {throw new Error(err)})

    return res.status(201).json(post)
}

exports.readAllPost = async (req, res, next) => {
    const posts = await Post.findAll()
    return res.status(200).json(posts)
}

exports.readOnePost = async (req, res, next) => {
    const post = await Post.findOne({
        where:{
            id: req.params.id
        }
    })
    if( !post ) {
      return  res.status(404).send(` This user does not exist in our database `)
    } 
    return res.status(200).json(post)
}

exports.updatePost = async (req, res, next) => {
    let post

    // 1. Verifier si la dateofbirth n'a été mis à jour 
    // 2. Update l'utilisateur dans la base de donnée avec le nouveau body 
    // 3. Envoyer la reponse 

    await Post 
        .update(req.body, {
            where: { id: req.params.id }
        })
        .catch(err => {throw new Error(err)})

    return res.status(200).json({
        success:true
    })
}

exports.deletePost = async (req, res, next) => {
    // 1. Identification de l'element a supprimer 
    // 2. supression
    // 3. envoie de la reponse 
    const post = await Post.findByPk(req.params.id)
    if(!post) {
       return res.status(404).send(` This user does not exist in our database `)
    }
    await post.destroy()
    return res.status(200).json({
        success: true
    })
}