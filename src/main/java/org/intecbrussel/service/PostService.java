package org.intecbrussel.service;

import org.intecbrussel.model.Comment;
import org.intecbrussel.model.Post;

import java.util.List;
import java.util.Set;

public interface PostService {
    List<Post> getAllPosts();
    Post getPostById(Long id);
    Post savePost(Post post);
    Post updatePost(Long id, Post post);
    void deletePost(Long id);
    Set<Comment> getCommentsByPostId(Long postId);
}
