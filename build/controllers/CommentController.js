'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _Comment = require('../models/Comment');

var _Comment2 = _interopRequireDefault(_Comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommentControlller = {
	/**
   * @description Adds a new comment
   * 
   * @param {Object} req - request
   * 
   * @param {Object} res - response
   * 
   * @return {Object} - returns newly add comment
   */
	addComment: function addComment(req, res) {
		var newComment = new _Comment2.default(req.body);
		newComment.userId = req.decoded.currentUser._id;

		newComment.save().then(function (comment) {
			res.status(201).send({
				comment: comment,
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
   */
	editComment: function editComment(req, res) {
		_Comment2.default.findOneAndUpdate({ _id: req.body.commentId }, { $set: req.body }).then(function (updatedComment) {
			return res.status(200).send({
				updatedComment: updatedComment,
				message: 'Comment updated successfully'
			});
		}).catch(function () {
			return res.status(500).send({
				message: 'error occured, comment ID is invalid'
			});
		});
	},


	/**
   * @description - Deletes a comment
   * 
   * @param {Object} req - request
   * 
   * @param {Object} res - response
   */
	deleteComment: function deleteComment(req, res) {
		_Comment2.default.findOneAndRemove({ _id: req.body.commentId }).then(function (deletedComment) {
			return res.status(200).send({
				_id: deletedComment._id,
				message: 'Comment successfully deleted'
			});
		}).catch(function (error) {
			return res.status(500).send({
				message: 'Error occured, comment ID is invalid'
			});
		});
	}
};

exports.default = CommentControlller;
//# sourceMappingURL=CommentController.js.map