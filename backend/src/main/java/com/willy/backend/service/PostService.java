package com.willy.backend.service;

import com.willy.backend.model.Post;
import com.willy.backend.repository.PostRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final ObjectMapper objectMapper;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
        this.objectMapper = new ObjectMapper();
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public Post createPost(Post post) {
        normalizeImageFields(post);
        return postRepository.save(post);
    }

    public Post updatePost(Long id, Post updatedPost) {
        Post post = getPostById(id);

        post.setTitle(updatedPost.getTitle());
        post.setContent(updatedPost.getContent());
        post.setCategory(updatedPost.getCategory());
        post.setImageUrl(updatedPost.getImageUrl());
        post.setImageUrls(updatedPost.getImageUrls());

        normalizeImageFields(post);

        return postRepository.save(post);
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    private void normalizeImageFields(Post post) {
        if (post.getImageUrls() != null && !post.getImageUrls().isBlank()) {
            try {
                List<String> images = objectMapper.readValue(post.getImageUrls(), new TypeReference<List<String>>() {});
                if (!images.isEmpty() && (post.getImageUrl() == null || post.getImageUrl().isBlank())) {
                    post.setImageUrl(images.get(0));
                }
            } catch (Exception ignored) {
                if ((post.getImageUrl() == null || post.getImageUrl().isBlank()) && !post.getImageUrls().isBlank()) {
                    post.setImageUrl(post.getImageUrls());
                }
            }
            return;
        }

        if (post.getImageUrl() != null && !post.getImageUrl().isBlank()) {
            try {
                post.setImageUrls(objectMapper.writeValueAsString(List.of(post.getImageUrl())));
            } catch (Exception ignored) {
                post.setImageUrls(null);
            }
        }
    }
}
