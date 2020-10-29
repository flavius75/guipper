const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');


exports.getAllPosts = (req, res, next) => {

  const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    
    if(userId < 0){
      res.status(400).json({error : "wrong token"})
    }

    let fields = req.query.fields;
    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset);
    let order = req.query.order;
    



    models.Post.findAll({
      order:[(order != null) ? order.split(':') : ['id', 'DESC']],
      attributes : (fields !=='*' && fields != null) ? fields.split(',') : null,
      limit : (!isNaN(limit)) ? limit : null,
      offset : (!isNaN(offset)) ? offset : null,
      include: [{
        model: models.User,
        attributes : ['firstname', 'lastname']
      }]

    }).then(
      (posts) => {
        res.status(200).json(posts);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.createPost = (req, res, next) => {

    
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    
    if(userId < 0){
      res.status(400).json({error : "wrong token"})
    }
    
    console.log(req.body.content);
    const post = models.Post.create({
      UserId:userId,
      content:req.body.content,
      likes:0
    })
      .then(() => res.status(201).json({ message: 'Post enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

  exports.updatePost = (req, res, next) => {
    
  };

  exports.deletePost = (req, res, next) => {
    
  };