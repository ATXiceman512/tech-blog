// Requirements
const router = require('express').Router();

// Desctruring models directory files
const { Comment } = require('../../models');

// Get Request for comments
router.get('/', (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      // Comment not found
      res.status(404).json(err);
    });
});

// Post Request for comments
router.post('/', (req, res) => {
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        // Bad Request
        res.status(400).json(err);
      });
  }
});

// Delete comment by Id
router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: `Could not find a comment with this id: ${req.params.id}` });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      // Internal server error
      res.status(500).json(err);
    })
});

// Export the comments router module
module.exports = router;