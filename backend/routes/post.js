const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const postCtrl = require('../controllers/post');

router.get('/', postCtrl.getAllPosts);
// router.post('/', postCtrl.createThing);
// router.get('/:id', postCtrl.getOneThing);
// router.put('/:id', postCtrl.modifyThing);
// router.delete('/:id', postCtrl.deleteThing);

   module.exports=router;