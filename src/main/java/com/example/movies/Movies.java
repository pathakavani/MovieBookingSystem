package com.example.movies;

import java.util.Date;

public class Movies {
    
    public int id;
    public String title;
    public String genre;
    public String release_date;
    public String director;
    public int duration;
    public int rating;
    public String synopsis;
    public String url;
    public String trailer;

    Movies(int id, String title, String genre, String release_date, String director, int duration, int rating, String synopsis, String url, String trailer) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.release_date = release_date;
        this.director = director;
        this.duration = duration;
        this.rating = rating;
        this.synopsis = synopsis;
        this.url = url;
        this.trailer = trailer;
    }
}