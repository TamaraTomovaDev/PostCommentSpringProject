package org.intecbrussel.service;

import org.intecbrussel.model.Comment;

public interface CommentService {
    Comment addCommentToPost(Long postId, Comment comment);
    Comment updateComment(Long id, Comment comment);
    void deleteComment(Long id);
}
