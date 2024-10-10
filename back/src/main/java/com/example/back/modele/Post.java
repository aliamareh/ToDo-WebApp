package com.example.back.modele;


import com.example.back.utils.Couleur;
import jakarta.persistence.*;

import java.util.Random;

@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", length = 800)
    private String description;

    private String auteur;

    private String couleur;
    public Post() {
    }

    public Post(String description, String auteur) {
        this.description = description;
        this.auteur = auteur;
        this.couleur = Couleur.randomColor();
    }

    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAuteur() {
        return auteur;
    }

    public void setAuteur(String auteur) {
        this.auteur = auteur;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCouleur() {
        return couleur;
    }

    public void setCouleur(String couleur) {
        this.couleur = couleur;
    }

    public String randomizeCouleur(){
        return new String[]{"#feff9c","Bleu"}[new Random().nextInt()];
    }
}
