const models = require('../models');


exports.getAllPosts = (req, res, next) => {
    models.Post.findAll().then(
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
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    const post = new Post({
      ...postObject,
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Post enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

  exports.updatePost = (req, res, next) => {
    
  };

  exports.deletePost = (req, res, next) => {
    
  };