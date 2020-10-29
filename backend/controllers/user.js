const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');

const models = require('../models');

exports.register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = models.User.create({
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          sex: req.body.sex,
          birthday: req.body.birthday,
          idRole:3,
          password: hash
        })
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.login = (req, res, next) => {
    models.User.findOne({ where: {email: req.body.email} })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user.id,
              token: jwtUtils.generateTokenForUser(user)
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.getAllUsers = (req,res,next) => {
    models.User.findAll({
      attributes:['id', 'firstname', 'lastname', 'idRole']
    }).then(
      (users) => {
        res.status(200).json(users);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  }


  
  exports.getOneUser = (req,res,next) => {
   models.User.findOne({
      attributes:['id', 'firstname', 'lastname', 'sex', 'birthday', 'bio', 'idRole'],
      where:{id:req.params.id}
   })
    .then(
      (user) => {
        if(user){
          res.status(200).json(user);
        }else{
          res.status(404).json({error: 'Utilisateur non trouvé'});
        }
      }
    ).catch(
      (error) => {
        res.status(500).json({
            error:error
        });
      }
    )
    
  }

  

  exports.updateUser = (req,res,next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    
    if(userId < 0){
      res.status(400).json({error : "wrong token"})
    }
    let email=req.body.email;
    let firstname=req.body.firstname;
    let lastname=req.body.lastname;
    let sex=req.body.sex;
    let birthday=req.body.birthday;
    let bio=req.body.bio;
    let phone=req.body.phone;

    
    models.User.findOne({
      attributes:['id', 'firstname', 'lastname', 'sex', 'birthday', 'bio', 'idRole'],
      where:{id:userId}
     })
    .then(
      (user) => {
        models.User.update({ 
            email: (email ? email : user.email),
            firstname: (firstname ? firstname : user.firstname),
            lastname: (lastname ? lastname : user.lastname),
            sex: (sex ? sex : user.sex),
            birthday: (birthday ? birthday : user.birthday),
            bio: (bio ? bio : user.bio),
            phone: (phone ? phone : user.phone),
            }, {
            where: {
              id: user.id
            }
          
          }).then(() => {res.status(200).json({message : "Profil mis à jour"})})
            .catch(error => res.status(400).json({ error }));        
       
      })
      .catch((error) => {res.status(400).json({ error })});

  }

  exports.deleteUser = (req,res,next) => {
   
  }