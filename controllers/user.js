const User = require('../models/User')

const dayjs = require('dayjs')

exports.createUser = async (req, res, next) => {
    const { dateOfBirth } = req.body
    const user = await User
        .create({
            ...req.body,
            dateOfBirth: new Date(dayjs(dateOfBirth, 'DD-MM-YYYY'))
        })
        .catch(err => {throw new Error(err)})

    return res.status(201).json(user)
}

exports.readAllUser = async (req, res, next) => {
    const users = await User
        .scope('withoutPassword')
        .findAll()
    return res.status(200).json(users)
}

exports.readOneUser = async (req, res, next) => {
    const user = await User.findOne({
        where:{
            id: req.params.id
        }
    })
    if( !user ) {
      return  res.status(404).send(` This user does not exist in our database `)
    } 
    return res.status(200).json(user)
}

exports.updateUser = async (req, res, next) => {
    let user 

    let { dateOfBirth } = req.body
    if ( dateOfBirth) {
         // 1. Verifier si la dateofbirth a été mis à jour 
    // 2. Mettre la date de naissance au format date (js)
    // 3. ecraser l'ancienne valeur avec la nouvelle valeur de la dateofbirth dans le body 
    // 4. Update l'utilisateur dans la base de donnée avec le nouveau body 
    // 5. Envoyer la reponse 

      const dateOfBirthUpdated = new Date(dayjs(dateOfBirth, 'DD-MM-YYYY'))
       user = {...req.body, dateOfBirth : dateOfBirthUpdated}
        await User
            .update(user, {
                where: { id:req.params.id }
            })
            .catch(err => {throw new Error(err)})

        return res.status(200).json({
            success:true
        })
    }

    // 1. Verifier si la dateofbirth n'a été mis à jour 
    // 2. Update l'utilisateur dans la base de donnée avec le nouveau body 
    // 3. Envoyer la reponse 

    if( !dateOfBirth ) {
       await User 
        .update(req.body, {
            where: { id: req.params.id }
        })
        .catch(err => {throw new Error(err)})

        return res.status(200).json({
            success:true
        })
    } 

    

   

   
}

exports.deleteUser = async (req, res, next) => {
    // 1. Identification de l'element a supprimer 
    // 2. supression
    // 3. envoie de la reponse 
    const user = await User.findByPk( req.params.id)
    if(!user) {
       return res.status(404).send(` This user does not exist in our database `)
    }
    await user.destroy()
    return res.status(200).json({
        success: true
    })
}