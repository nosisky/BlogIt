import Comment from '../models/Comment';

const CommentControlller = {
  /**
   * @description Adds a new comment
   *
   * @param {Object} req - request
   *
   * @param {Object} res - response
   *
   * @return {Object} - returns newly add comment
   */
  addComment(req, res) {
    const newComment = new Comment(req.body);
    newComment.username = req.decoded.currentUser.username;

    newComment.save().then((comment) => {
      res.status(201).send({
        comment,
        message: 'Comment added successfully'
      });
    });
  },

  /**
   * @description - Edits a comment
   *
   * @param {Object} req - request
   *
   * @param {Object} res - response
	 *
	 * @returns {Object}  - API response
   */
  editComment(req, res) {
    Comment.findOneAndUpdate({ _id: req.body.commentData.commentId }, 
      { $set: req.body.commentData })
      .then(updatedComment => res.status(200).send({
        updatedComment,
        message: 'Comment updated successfully'
      }))
      .catch(() => res.status(500).send({
        message: 'error occured, comment ID is invalid'
      }));
  },

  /**
   * @description - Deletes a comment
   *
   * @param {Object} req - request
   *
   * @param {Object} res - response
	 * 
	 * @returns {Object} - API response
   */
  deleteComment(req, res) {
    Comment.findOneAndRemove({ _id: req.body.commentId })
      .then(deletedComment => res.status(200).send({
        slug: deletedComment.slug,
        message: 'Comment successfully deleted'
      }))
      .catch(() => res.status(500).send({
        message: 'Error occured, comment ID is invalid'
      }));
  }
};

export default CommentControlller;
