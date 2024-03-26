package com.example.movies;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
// import org.json.JSONObject;
import org.springframework.http.MediaType;

import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.annotation.JsonCreator.Mode;
import com.fasterxml.jackson.databind.util.JSONPObject;

import java.sql.Array;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;



@Controller
@CrossOrigin("http://localhost:3000")
public class MoviesApplication {
    List <Movies> movies;
    PersonalInfo pi;
    int userID = 2;
    Connection connection;
    public MoviesApplication() {
        movies = new ArrayList<>();
        String jdbcUrl = "jdbc:mysql://localhost:33306/Movie_Booking";
        String username = "root";//change this
        String password = "inava123"; // and that
        
        try {
            connection = DriverManager.getConnection(jdbcUrl, username, password);
            System.out.println("Connection secured");
            //Movie
            String sql = "SELECT * FROM movies"; 
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Movies movie = new Movies(
					
				resultSet.getInt("movie_id"),
                resultSet.getString("title"),
                resultSet.getString("genre"), 
                resultSet.getDate("release_date").toString(),
                resultSet.getString("director"),
				resultSet.getInt("duration_minutes"),
				resultSet.getInt("rating"),
				resultSet.getString("synopsis"),
				resultSet.getString("poster_url")
				);
                movies.add(movie);
            }
            // connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

  
    @PostMapping("/postInfo")
    @ResponseBody
    public void postInfo(@RequestBody PersonalInfo pi) {
        System.out.println("entered");
        System.out.println(pi.firstName);

        try {
            String sql = "INSERT into user (firstName, lastName, email, password, enrollforPromotions) VALUES (\""+
            pi.firstName + "\", \""+ 
            pi.lastName + "\", \"" + 
            pi.email +"\", \"" +
            pi.password + "\", " +
            pi.promotion+")";

            
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.executeUpdate();
            String getID = "SELECT UserID FROM user WHERE firstName = \""+pi.firstName + "\"";
            statement = connection.prepareStatement(getID);
            ResultSet rst = statement.executeQuery();
            while (rst.next()) {
                userID = rst.getInt("UserID");
            }
            String sql2 = "INSERT into payment_card (UserID, cardType, cardNumber, expirationDate, billingAddress) VALUES ("+
            userID + ", \""+ 
            pi.cardType + "\", \"" + 
            pi.paymentInfo +"\", \"" +
            pi.expirationDate+ "\", " +
            pi.address+")";
            statement = connection.prepareStatement(sql2);
            statement.executeUpdate();

        }
        catch(SQLException e) {
            System.out.println(e);
        }
    }


    @GetMapping(value = "/getInfo")
    @ResponseBody
    public String getInfo() {
        String output = "";
        try {
            String sql = "SELECT * FROM user NATURAL JOIN payment_card WHERE UserID = " + userID;
            PreparedStatement statement = connection.prepareStatement(sql);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()){
                output += resultSet.getString("firstName") +", " +
                    resultSet.getString("lastName") +", " +
                    resultSet.getString("email") +", " +
                    resultSet.getString("password")  +", " +
                    resultSet.getString("cardType") +", " +
                    resultSet.getString("cardNumber") +", "+
                    resultSet.getDate("expirationDate") + ", " +
                    resultSet.getString("billingAddress")
                    ;
            }
            //return pi;
        } catch (Exception e) 
        {
            System.out.println(e.getMessage());
        }
        return output;
    }

	@GetMapping("/GetMovie")
    @ResponseBody
    public Movies getMovie() {
        Movies mvs;
        //String sql = "select * from movies M WHERE M.id="+id;
        try {
            String sql = "SELECT * FROM movies M WHERE M.title = \'Dune\'";

            PreparedStatement statement = connection.prepareStatement(sql);
            System.out.println("error");
            //statement.setString(1, title);
            // PreparedStatement statement = connection.prepareStatement(sql);
            ResultSet resultSet = statement.executeQuery();
            System.out.println("error2");
                mvs = new Movies(
					
				resultSet.getInt("movie_id"),
                resultSet.getString("title"),
                resultSet.getString("genre"), 
                resultSet.getDate("release_date").toString(),
                resultSet.getString("director"),
				resultSet.getInt("duration_minutes"),
				resultSet.getInt("rating"),
				resultSet.getString("synopsis"),
				resultSet.getString("poster_url")
				);
                return mvs;
        } catch (Exception e) 
        {
            System.out.println(e.getMessage());
        }
        return null;
        
    }

    @GetMapping("/movies")
    @ResponseBody
    public List<Movies> getMovies() {
        System.out.println("movies");
        return movies;
    }

}