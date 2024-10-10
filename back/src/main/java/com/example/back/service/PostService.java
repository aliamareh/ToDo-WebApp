package com.example.back.service;


import com.example.back.controller.PostController;
import com.example.back.dao.PostRepository;
import com.example.back.exception.ChampNullException;
import com.example.back.exception.ChampVideException;
import com.example.back.exception.PostNonExistantException;
import com.example.back.modele.Post;
import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Objects;
import java.util.Optional;

@Service
public class PostService {
    
    PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Collection<Post> getAllPosts()
    {
        return postRepository.findAll();
    }

    public Post getPost(Long id) throws PostNonExistantException {
        Optional<Post> post = postRepository.findById(id);
        if (post.isEmpty())
            throw new PostNonExistantException();
        return post.get();
    }

    public Post addPost(String description, String autheur) throws ChampNullException, ChampVideException {
        if (Objects.isNull(description) || Objects.isNull(autheur) )
            throw new ChampNullException();
        if (Strings.isEmpty(description) || Strings.isEmpty(autheur) )
            throw new ChampVideException();

        return postRepository.save(new Post(description, autheur));
    }

    public void deletePost(Long id) throws PostNonExistantException {
        Post post = this.getPost(id);
        postRepository.delete(post);
    }

    public Post updatePost(PostController.PostDTO newPost, Long id) throws PostNonExistantException {
        Post postToUpdate = this.getPost(id);
        postToUpdate.setAuteur(newPost.auteur());
        postToUpdate.setDescription(newPost.description());

        Post updatedPost = postRepository.save(postToUpdate);
        return updatedPost;
    }
}
