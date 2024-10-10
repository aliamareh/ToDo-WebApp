package com.example.back.controller;

import com.example.back.exception.ChampNullException;
import com.example.back.exception.ChampVideException;
import com.example.back.exception.PostNonExistantException;
import com.example.back.modele.Post;
import com.example.back.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Collection;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api/v1", headers = "X-API-Version=1")
public class PostController {

    PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/posts")
    public ResponseEntity<Collection<Post>> getPosts()
    {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<Post> getPost(@PathVariable Long id)
    {
        Post post;
        try {
            post = postService.getPost(id);
        } catch (PostNonExistantException e) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(post);
    }


    public record PostDTO(String description, String auteur){}

    @PostMapping("/posts")
    public ResponseEntity<Post> addPost(@RequestBody PostDTO postDTO, UriComponentsBuilder base)
    {
        Post post;

        try {
            post = postService.addPost(postDTO.description, postDTO.auteur);
        } catch (ChampNullException | ChampVideException e) {
            return ResponseEntity.badRequest().build();
        }

        URI location = base.path("/api/posts/{id}")
                .buildAndExpand(post.getId())
                .toUri();
        return ResponseEntity.created(location).body(post);
    }

    @PutMapping("/posts/{id}")
    public ResponseEntity<Post> updatePost(@RequestBody PostDTO oldPost, @PathVariable Long id)
    {

        Post updatedPost = null;
        try {
            updatedPost = this.postService.updatePost(oldPost, id);
        } catch (PostNonExistantException e) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/posts/{id}")
    public ResponseEntity<Object> deletePost(@PathVariable Long id)
    {
        try {
            postService.deletePost(id);
        } catch (PostNonExistantException e) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }
}
