package com.example.movies;

import java.util.Date;

public class Movies {

    public int id;
    public String title;
    public String category;
    public String release_date;
    public String director;
    public int duration;
    public String mpaa_rating;
    public String synopsis;
    public String url;
    public String trailer;
    public String cast;
    public String reviews;
    public String producer;

    Movies(int id, String title, String category, String release_date, String director, int duration,
            String mpaa_rating, String synopsis, String url, String trailer, String cast, String reviews,
            String producer) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.release_date = release_date;
        this.director = director;
        this.duration = duration;
        this.mpaa_rating = mpaa_rating;
        this.synopsis = synopsis;
        this.url = url;
        this.trailer = trailer;
        this.cast = cast;
        this.reviews = reviews;
        this.producer = producer;
    }
}