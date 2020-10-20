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
    models.User.findAll().then(
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
   
  }

  

  exports.updateUser = (req,res,next) => {
    
  }

  exports.deleteUser = (req,res,next) => {
   
  }