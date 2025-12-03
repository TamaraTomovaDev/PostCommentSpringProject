package org.intecbrussel.controller;

import org.intecbrussel.model.Comment;
import org.intecbrussel.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // Comment toevoegen aan een Post
    @PostMapping("/posts/{postId}/comments")
    public ResponseEntity<Comment> addCommentToPost(@PathVariable Long postId, @RequestBody Comment comment) {
        return ResponseEntity.status(201).body(commentService.addCommentToPost(postId, comment));
    }

    // Comment updaten
    @PutMapping("/comments/{commentId}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long commentId, @RequestBody Comment comment) {
        return ResponseEntity.ok(commentService.updateComment(commentId, comment));
    }

    // Comment verwijderen
    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}
