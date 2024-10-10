package com.example.back.utils;

import java.util.Random;

public class Couleur {
    public static final String[] COULEURS = {"#feff9c","#ffc0cb","#cdfc93","#ffc14a"};
    public static String randomColor(){
        return COULEURS[new Random().nextInt(COULEURS.length)];
    }
}
