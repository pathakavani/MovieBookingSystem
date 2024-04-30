package com.example.movies;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.Base64;
// import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mysql.cj.x.protobuf.MysqlxCrud.Update;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * This class represents the main application for managing movie bookings.
 * It includes functionalities for handling user information, authentication,
 * profile updates, sending confirmation emails, and retrieving movie
 * information.
 */
@Controller
@CrossOrigin("http://localhost:3000")
public class MoviesApplication {
    List<Movies> movies;
    PersonalInfo pi;
    int userID = 2;// default

    @Autowired
    private JavaMailSender emailSender;

    Connection connection;

    /**
     * Constructor for MoviesApplication class.
     * Initializes the list of movies and establishes a database connection.
     */
    public MoviesApplication() {
        movies = new ArrayList<>();
        String jdbcUrl = "jdbc:mysql://localhost:3306/movie_booking"; // jdbc:mysql://localhost:33306/Movie_Booking
        String username = "PrincessHavens";// change this
        String password = "Kiara200293326!"; // and that, pass: root123@ (for my reference - ruchitha)

        try {
            connection = DriverManager.getConnection(jdbcUrl, username, password);
            System.out.println("Database connection secured");

            // Movie
            String sql = "SELECT m.movie_id, m.title, m.category, m.release_date, m.director, " +
                    "m.duration_minutes, m.mpaa_rating, m.synopsis, m.poster_url, " +
                    "m.trailer_url, m.cast, m.reviews, m.producer, s.date, sp.time " +
                    "FROM movies m " +
                    "LEFT JOIN shows s ON m.movie_id = s.movieID " +
                    "LEFT JOIN show_period sp ON s.periodID = sp.periodID";

            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                int movieId = resultSet.getInt("movie_id");
                // Check if the movie already exists in the list
                Movies existingMovie = movies.stream()
                        .filter(movie -> movie.id == movieId)
                        .findFirst()
                        .orElse(null);
                if (existingMovie != null) {
                    // Movie already exists, add show information to the existing movie
                    String showDateTime = resultSet.getDate("date").toString() + " " +
                            resultSet.getTime("time").toString();
                    existingMovie.addShow(showDateTime);
                } else {
                    // Create new movie object and add it to the list
                    Movies movie = new Movies(
                            movieId,
                            resultSet.getString("title"),
                            resultSet.getString("category"),
                            resultSet.getDate("release_date").toString(),
                            resultSet.getString("director"),
                            resultSet.getInt("duration_minutes"),
                            resultSet.getString("mpaa_rating"),
                            resultSet.getString("synopsis"),
                            resultSet.getString("poster_url"),
                            resultSet.getString("trailer_url"),
                            resultSet.getString("cast"),
                            resultSet.getString("reviews"),
                            resultSet.getString("producer"));

                    // Check for null values before adding show date and time to the movie
                    if (resultSet.getDate("date") != null && resultSet.getTime("time") != null) {
                        String showDateTime = resultSet.getDate("date").toString() + " " +
                                resultSet.getTime("time").toString();
                        movie.addShow(showDateTime);
                    }

                    movies.add(movie);
                }
            }
            System.out.println("movies: " + movies);
            // connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    /**
     * Sends a confirmation email to the user after account creation.
     *
     * @param name             The user's name.
     * @param recipientEmail   The recipient's email address.
     * @param confirmationLink The link for activating the user's account.
     */
    public void sendConfirmationEmail(String name, String recipientEmail, String confirmationLink) {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try {
            helper.setTo(recipientEmail);
            helper.setSubject("MovieHUB Account Created");
            helper.setText("Dear " + name + ",\n\nPlease click the following link to activate your account:\n"
                    + confirmationLink);
            emailSender.send(message);
            System.out.println("Confirmation email sent successfully!");
        } catch (MessagingException e) {
            e.printStackTrace();
            System.err.println("Failed to send confirmation email: " + e.getMessage());
        }
    }

    /**
     * Sends an update confirmation email to the user after profile update.
     *
     * @param name           The user's name.
     * @param recipientEmail The recipient's email address.
     */
    public void sendUpdateConfirmationEmail(String name, String recipientEmail) {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try {
            helper.setTo(recipientEmail);
            helper.setSubject("Your Profile is updated");
            helper.setText("Dear " + name + ",\n\nYour Profile has been updated\n");
            emailSender.send(message);
            System.out.println("Update Confirmation email sent successfully!");
        } catch (MessagingException e) {
            e.printStackTrace();
            System.err.println("Failed to send update confirmation email: " + e.getMessage());
        }
    }

    /**
     * Handles the POST request to insert user information into the database.
     *
     * @param pi The PersonalInfo object containing user information.
     */
    @PostMapping("/postInfo")
    @ResponseBody
    public void postInfo(@RequestBody PersonalInfo pi) {
        System.out.println("entered");
        System.out.println(pi.firstName);

        try {
            // Inserting information with password encryption
            String passwordEncrypted = Base64.getEncoder().encodeToString(pi.password.getBytes());
            String sql = "INSERT into user (firstName, lastName, email, password, enrollforPromotions, phone, address, status, userType) VALUES (\""
                    +
                    pi.firstName + "\", \"" +
                    pi.lastName + "\", \"" +
                    pi.email + "\", \"" +
                    passwordEncrypted + "\", " +
                    pi.promotion + ", \"" +
                    pi.phoneNumber + "\", \"" +
                    pi.address + "\", 2, 2)";

            PreparedStatement statement = connection.prepareStatement(sql);
            statement.executeUpdate();
            String getID = "SELECT UserID FROM user WHERE email = \"" + pi.email + "\"";
            statement = connection.prepareStatement(getID);
            ResultSet rst = statement.executeQuery();
            while (rst.next()) {
                userID = rst.getInt("UserID");
            }
            if (pi.expirationDate != null && !pi.expirationDate.isEmpty()) {
                String paymentInfoEncrypted = Base64.getEncoder().encodeToString(pi.paymentInfo.getBytes());
                String sql2 = "INSERT into payment_card (UserID, cardType, cardNumber, expirationDate, billingAddress) VALUES ("
                        +
                        userID + ", \"" +
                        pi.cardType + "\", \"" +
                        paymentInfoEncrypted + "\", \"" +
                        pi.expirationDate + "\", \"" +
                        pi.address + "\")";
                statement = connection.prepareStatement(sql2);
                statement.executeUpdate();
            }
            sendConfirmationEmail(pi.firstName + " " + pi.lastName, pi.email,
                    "http://localhost:3000/activation?email=" + pi.email);
            System.out.println("Sent confirmation");
        } catch (SQLException e) {
            System.out.println(e);
        }
    }

    /**
     * Handles the POST request to update user information in the database.
     *
     * @param pi The PersonalInfo object containing updated user information.
     */
    @PostMapping("/updateInfo")
    @ResponseBody
    public void updateInfo(@RequestBody PersonalInfo pi) {
        System.out.println("entered updateInfo");
        System.out.println(pi.firstName);
        int rowsAffected = 0;
        try {
            // Inserting information with password encryption
            String passwordEncrypted = Base64.getEncoder().encodeToString(pi.password.getBytes());
            // Update query for the 'user' table
            String sqlUpdateUser = "UPDATE user SET";
            if (pi.firstName != null && !pi.firstName.isEmpty()) {
                sqlUpdateUser += " firstName = \"" + pi.firstName + "\",";
            }
            if (pi.lastName != null && !pi.lastName.isEmpty()) {
                sqlUpdateUser += " lastName = \"" + pi.lastName + "\",";
            }
            if (pi.email != null && !pi.email.isEmpty()) {
                sqlUpdateUser += " email = \"" + pi.email + "\",";
            }
            if (passwordEncrypted != null && !passwordEncrypted.isEmpty()) {
                System.out.println(passwordEncrypted);
                sqlUpdateUser += " password = \"" + passwordEncrypted + "\",";
            }
            sqlUpdateUser += " enrollforPromotions = " + pi.promotion + ",";

            if (pi.phoneNumber != null && !pi.phoneNumber.isEmpty()) {
                sqlUpdateUser += " phone = \"" + pi.phoneNumber + "\",";
            }
            if (pi.address != null && !pi.address.isEmpty()) {
                sqlUpdateUser += " address = \"" + pi.address + "\",";
            }
            // Remove the last comma if there are columns to update
            if (sqlUpdateUser.endsWith(",")) {
                sqlUpdateUser = sqlUpdateUser.substring(0, sqlUpdateUser.length() - 1);
            }
            // Add the condition for updating based on userID
            sqlUpdateUser += " WHERE firstName = \"" + pi.firstName + "\";";
            System.out.println(sqlUpdateUser);
            PreparedStatement statement = connection.prepareStatement(sqlUpdateUser);
            rowsAffected = statement.executeUpdate();
            String getID = "SELECT UserID FROM user WHERE firstName = \"" + pi.firstName + "\"";
            statement = connection.prepareStatement(getID);
            ResultSet rst = statement.executeQuery();
            while (rst.next()) {
                userID = rst.getInt("UserID");
            }
            if (pi.expirationDate != null && !pi.expirationDate.isEmpty()) {
                String paymentInfoEncrypted = Base64.getEncoder().encodeToString(pi.paymentInfo.getBytes());
                // Update query for the 'payment_card' table
                String sqlUpdatePaymentCard = "UPDATE payment_card SET";
                if (pi.cardType != null && !pi.cardType.isEmpty()) {
                    sqlUpdatePaymentCard += " cardType = \"" + pi.cardType + "\",";
                }
                if (paymentInfoEncrypted != null && !paymentInfoEncrypted.isEmpty()) {
                    sqlUpdatePaymentCard += " cardNumber = \"" + paymentInfoEncrypted + "\",";
                }
                if (pi.expirationDate != null && !pi.expirationDate.isEmpty()) {
                    sqlUpdatePaymentCard += " expirationDate = \"" + pi.expirationDate + "\",";
                }
                if (pi.address != null && !pi.address.isEmpty()) {
                    sqlUpdatePaymentCard += " billingAddress = \"" + pi.address + "\",";
                }
                // Remove the last comma if there are columns to update
                if (sqlUpdatePaymentCard.endsWith(",")) {
                    sqlUpdatePaymentCard = sqlUpdatePaymentCard.substring(0, sqlUpdatePaymentCard.length() - 1);
                }
                // Add the condition for updating based on userID
                sqlUpdatePaymentCard += " WHERE UserID = \"" + userID + "\";";
                statement = connection.prepareStatement(sqlUpdatePaymentCard);
                rowsAffected = statement.executeUpdate();
            }
            if (rowsAffected > 0 && pi.email != null) {
                sendUpdateConfirmationEmail(pi.firstName + " " + pi.lastName, pi.email);
                System.out.println("Sent confirmation");
            }
        } catch (SQLException e) {
            System.out.println(e);
        }
    }

    /**
     * Retrieves user information from the database based on the user's ID.
     *
     * @return User information in string format.
     */
    @GetMapping(value = "/getInfo")
    @ResponseBody
    public String getInfo() {
        String output = "";
        try {
            System.out.println("userID 11: " + userID);
            String sql = "SELECT * FROM user NATURAL JOIN payment_card WHERE UserID = " + userID;
            PreparedStatement statement = connection.prepareStatement(sql);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                System.out.println("Result");
                String decodePassword = new String(Base64.getDecoder().decode(resultSet.getString("password")));
                String decodeCardNumber = new String(Base64.getDecoder().decode(resultSet.getString("cardNumber")));
                output += resultSet.getString("firstName") + "\t" +
                        resultSet.getString("lastName") + "\t" +
                        resultSet.getString("email") + "\t" +
                        decodePassword + "\t" +
                        resultSet.getString("cardType") + "\t" +
                        decodeCardNumber + "\t" +
                        resultSet.getInt("enrollForPromotions") + "\t" +
                        resultSet.getDate("expirationDate") + "\t" +
                        resultSet.getString("billingAddress");
            }
            // return pi;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        System.out.println(output);
        return output;
    }

    /**
     * Retrieves a specific movie from the database.
     *
     * @return The Movie object representing the requested movie.
     */
    @GetMapping("/GetMovie")
    @ResponseBody
    public Movies getMovie() {
        Movies mvs;
        // String sql = "select * from movies M WHERE M.id="+id;
        try {
            String sql = "SELECT * FROM movies M WHERE M.title = \'Dune\'";

            PreparedStatement statement = connection.prepareStatement(sql);
            System.out.println("error");
            // statement.setString(1, title);
            // PreparedStatement statement = connection.prepareStatement(sql);
            ResultSet resultSet = statement.executeQuery();
            System.out.println("error2");
            mvs = new Movies(
                    resultSet.getInt("movie_id"),
                    resultSet.getString("title"),
                    resultSet.getString("category"),
                    resultSet.getDate("release_date").toString(),
                    resultSet.getString("director"),
                    resultSet.getInt("duration_minutes"),
                    resultSet.getString("mpaa_rating"),
                    resultSet.getString("synopsis"),
                    resultSet.getString("poster_url"),
                    resultSet.getString("trailer_url"),
                    resultSet.getString("cast"),
                    resultSet.getString("reviews"),
                    resultSet.getString("producer"));
            return mvs;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;

    }

    /**
     * Retrieves all movies from the database.
     *
     * @return List of Movie objects representing all movies.
     */
    @GetMapping("/movies")
    @ResponseBody
    public List<Movies> getMovies() {
        return movies;
    }

    /**
     * Endpoint to add a new movie to the database.
     * 
     * @param movieRequest JSON request containing movie information.
     * @return ResponseEntity with success or error message.
     */
    @PostMapping("/addMovie")
    public ResponseEntity<String> addMovie(@RequestBody Movies movieRequest) {
        try {
            System.out.println("addMovie");
            System.out.println("movieRequest: " + movieRequest);
            System.out.println("mpaa rating: " + movieRequest.mpaa_rating);
            System.out.println("poster url: " + movieRequest.url);
            // Prepare the SQL statement
            String sql = "INSERT INTO movies (title, category, release_date, director, duration_minutes, " +
                    "mpaa_rating, synopsis, poster_url, trailer_url, cast, reviews, producer) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(sql);

            // Set the values from the movieRequest object
            statement.setString(1, movieRequest.title);
            statement.setString(2, movieRequest.category);
            statement.setDate(3, Date.valueOf(movieRequest.release_date));
            statement.setString(4, movieRequest.director);
            statement.setInt(5, movieRequest.duration);
            statement.setString(6, movieRequest.mpaa_rating);
            statement.setString(7, movieRequest.synopsis);
            statement.setString(8, movieRequest.url);
            statement.setString(9, movieRequest.trailer);
            statement.setString(10, movieRequest.cast);
            statement.setString(11, movieRequest.reviews);
            statement.setString(12, movieRequest.producer);

            // Execute the update
            int rowsAffected = statement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Movie added successfully.");
                return ResponseEntity.ok("Movie added successfully");
            } else {
                System.out.println("Error adding movie.");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding movie.");
            }
        } catch (SQLException e) {
            System.err.println("Error adding movie: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding movie.");
        }
    }

    /**
     * Endpoint to edit specific fields of a movie in the database.
     * 
     * @param id           The ID of the movie to edit.
     * @param movieRequest JSON request containing the fields to update.
     * @return ResponseEntity with success or error message.
     */
    @PutMapping("/updateMovie/{id}")
    public ResponseEntity<String> updateMovie(@PathVariable("id") int id, @RequestBody Movies movieRequest) {
        try {
            System.out.println("updateMovie");
            // Prepare the SQL statement
            StringBuilder sqlBuilder = new StringBuilder("UPDATE movies SET ");
            List<Object> parameters = new ArrayList<>();

            // Check which fields are provided in the request and add them to the SQL query
            if (movieRequest.title != null) {
                sqlBuilder.append("title = ?, ");
                parameters.add(movieRequest.title);
            }
            if (movieRequest.category != null) {
                sqlBuilder.append("category = ?, ");
                parameters.add(movieRequest.category);
            }
            if (movieRequest.release_date != null) {
                sqlBuilder.append("release_date = ?, ");
                parameters.add(Date.valueOf(movieRequest.release_date));
            }
            if (movieRequest.director != null) {
                sqlBuilder.append("director = ?, ");
                parameters.add(movieRequest.director);
            }
            if (movieRequest.duration > 0) {
                sqlBuilder.append("duration_minutes = ?, ");
                parameters.add(movieRequest.duration);
            }
            if (movieRequest.mpaa_rating != null) {
                sqlBuilder.append("mpaa_rating = ?, ");
                parameters.add(movieRequest.mpaa_rating);
            }
            if (movieRequest.synopsis != null) {
                sqlBuilder.append("synopsis = ?, ");
                parameters.add(movieRequest.synopsis);
            }
            if (movieRequest.url != null) {
                sqlBuilder.append("poster_url = ?, ");
                parameters.add(movieRequest.url);
            }
            if (movieRequest.trailer != null) {
                sqlBuilder.append("trailer_url = ?, ");
                parameters.add(movieRequest.trailer);
            }
            if (movieRequest.cast != null) {
                sqlBuilder.append("cast = ?, ");
                parameters.add(movieRequest.cast);
            }
            if (movieRequest.reviews != null) {
                sqlBuilder.append("reviews = ?, ");
                parameters.add(movieRequest.reviews);
            }
            if (movieRequest.producer != null) {
                sqlBuilder.append("producer = ?, ");
                parameters.add(movieRequest.producer);
            }

            // Remove the last comma and space from the SQL query
            sqlBuilder.delete(sqlBuilder.length() - 2, sqlBuilder.length());

            // Add the WHERE clause for the movie ID
            sqlBuilder.append(" WHERE movie_id = ?");
            parameters.add(id);

            // Prepare and execute the SQL statement
            PreparedStatement statement = connection.prepareStatement(sqlBuilder.toString());
            for (int i = 0; i < parameters.size(); i++) {
                statement.setObject(i + 1, parameters.get(i));
            }

            // Execute the update
            int rowsAffected = statement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Movie updated successfully.");
                return ResponseEntity.ok("Movie updated successfully");
            } else {
                System.out.println("Error updating movie: Movie not found or no fields provided for update.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Error updating movie: Movie not found or no fields provided for update.");
            }
        } catch (SQLException e) {
            System.err.println("Error updating movie: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating movie.");
        }
    }

    /**
     * Handles the insertion of show information related to a movie.
     *
     * @param movieRequest The JSON request containing show-related information.
     * @param movieId      The ID of the movie.
     * @return ResponseEntity indicating success or failure of the operation.
     */
    @PostMapping("/addShow")
    public ResponseEntity<String> addShow(@RequestBody Show show, int movieId) {
        try {
            // Check for conflicts
            String checkConflictQuery = "SELECT COUNT(*) FROM shows WHERE screenID = ? AND date = ? AND periodID = ?";
            PreparedStatement checkConflictStatement = connection.prepareStatement(checkConflictQuery);
            checkConflictStatement.setInt(1, show.screenID);
            checkConflictStatement.setDate(2, show.date);
            checkConflictStatement.setInt(3, show.periodID);
            ResultSet conflictResult = checkConflictStatement.executeQuery();
            if (conflictResult.next() && conflictResult.getInt(1) > 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Show time conflicts with an existing show.");
            }

            // Insert the show information
            String insertShowQuery = "INSERT INTO shows (movieID, screenID, periodID, date) VALUES (?, ?, ?, ?)";
            PreparedStatement insertShowStatement = connection.prepareStatement(insertShowQuery);
            insertShowStatement.setInt(1, movieId);
            insertShowStatement.setInt(2, show.screenID);
            insertShowStatement.setInt(3, show.periodID);
            insertShowStatement.setDate(4, show.date);
            insertShowStatement.executeUpdate();

            System.out.println("Show added successfully.");
            return ResponseEntity.ok("Show added successfully");
        } catch (SQLException e) {
            System.err.println("Error handling show information: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error handling show information.");
        }
    }

    /**
     * Endpoint to delete a movie from the database.
     * 
     * @param id The ID of the movie to delete.
     * @return ResponseEntity with success or error message.
     */
    @DeleteMapping("/deleteMovie/{id}")
    public ResponseEntity<String> deleteMovie(@PathVariable("id") int id) {
        try {
            System.out.println("deleteMovie");
            // Prepare the SQL statement
            String sql = "DELETE FROM movies WHERE movie_id = ?";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setInt(1, id);

            // Execute the update
            int rowsAffected = statement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Movie deleted successfully.");
                return ResponseEntity.ok("Movie deleted successfully");
            } else {
                System.out.println("Error deleting movie: Movie not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error deleting movie: Movie not found.");
            }
        } catch (SQLException e) {
            System.err.println("Error deleting movie: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting movie.");
        }
    }

    /**
     * Handles the POST request for user login.
     *
     * @param email    The user's email address.
     * @param password The user's password.
     * @return ResponseEntity with login status message.
     */
    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<String> login(@RequestParam("email") String email,
            @RequestParam("password") String password) {
        try {
            System.out.println("in Login");
            byte[] decodedBytes = Base64.getDecoder().decode(password);
            String decodedpassword = new String(decodedBytes);
            PreparedStatement statement = connection.prepareStatement(
                    "SELECT * FROM user WHERE email = ?");
            statement.setString(1, email);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                int status = resultSet.getInt("status");
                int userType = resultSet.getInt("userType");
                userID = resultSet.getInt("UserID");
                System.out.println("UserID : " + userID);
                String dbPassword = resultSet.getString("password");
                byte[] dbBytes = Base64.getDecoder().decode(dbPassword);
                String dbDecodedpassword = new String(dbBytes);
                if (decodedpassword.equals(dbDecodedpassword)) {
                    switch (status) {
                        case 1:
                            // User account is active, allow login
                            if (userType == 1) {
                                // Admin
                                System.out.println("admin");
                                return ResponseEntity.ok("Login successful as admin");
                            } else if (userType == 2) {
                                // Customer
                                return ResponseEntity.ok("Login successful as customer");
                            } else {
                                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                        .body("Invalid user type");
                            }
                        case 2:
                            // User account is inactive, show activation message
                            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                    .body("Your account is inactive. Confirm the email to activate it.");
                        case 3:
                            // User account is suspended by admin
                            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                    .body("Your account has been suspended by the admin.");
                        default:
                            // Invalid status or other cases
                            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                    .body("Invalid status or other cases.");
                    }
                } else {
                    // Invalid credentials
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
                }
            } else {
                // Invalid credentials
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }

        } catch (SQLException e) {
            System.err.println("Error executing SQL query: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing login");
        } catch (Exception e) {
            System.err.println("Error during login: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing login");
        }
    }

    /**
     * Sends a password reset email to the specified email address with the reset
     * link.
     *
     * @param email     The recipient's email address.
     * @param resetLink The link for resetting the password.
     */
    private void sendPasswordResetEmail(String email, String resetLink) {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try {
            helper.setTo(email);
            helper.setSubject("Password Reset");
            helper.setText("Dear User,\n\nPlease click the following link to reset your password:\n"
                    + resetLink);
            emailSender.send(message);
            System.out.println("Password reset email sent successfully!");
        } catch (MessagingException e) {
            e.printStackTrace();
            System.err.println("Failed to send password reset email: " + e.getMessage());
        }
    }

    /**
     * Sends a password reset email to the user.
     *
     * @param email The user's email address.
     * @return ResponseEntity with password reset status message.
     */
    @PostMapping("/forgotPassword")
    @ResponseBody
    public ResponseEntity<String> forgotPassword(@RequestParam("email") String email) {
        try {
            // Generate a unique token
            String token = UUID.randomUUID().toString();
            // Construct the password reset link with the token and email as query
            // parameters
            String resetLink = "http://localhost:3000/resetPassword?token=" + token + "&email=" + email;
            sendPasswordResetEmail(email, resetLink);

            return ResponseEntity.ok("Password reset link sent to your email.");
        } catch (Exception e) {
            System.err.println("Error during forgot password: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing forgot password.");
        }
    }

    /**
     * Resets the user's password in the database.
     *
     * @param token       The reset token.
     * @param email       The user's email address.
     * @param newPassword The new password.
     * @return ResponseEntity with password reset status message.
     */
    @PostMapping("/resetPassword")
    @ResponseBody
    public ResponseEntity<String> resetPassword(@RequestParam("token") String token,
            @RequestParam("email") String email, @RequestParam("password") String newPassword) {
        // Update the password in the database
        try {
            String passwordEncrypted = Base64.getEncoder().encodeToString(newPassword.getBytes());
            String sql = "UPDATE user SET password = ? WHERE email = ?";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setString(1, passwordEncrypted);
            statement.setString(2, email);
            int rowsAffected = statement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Password updated successfully.");
                return ResponseEntity.ok("Password updated successfully");
            } else {
                System.out.println("Email not found or password already updated.");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error resetting password.");
            }
        } catch (SQLException e) {
            System.err.println("Error updating password: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error resetting password.");
        }
    }

    /**
     * Activates the user's account in the database.
     *
     * @param email The user's email address.
     * @return ResponseEntity with account activation status message.
     */
    @PostMapping("/activation")
    @ResponseBody
    public ResponseEntity<String> activation(@RequestParam("email") String email) {
        // Update the status in the database
        try {
            System.out.println("email: " + email);
            String sql = "UPDATE user SET status = ? WHERE email = ?";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setInt(1, 1);
            statement.setString(2, email);
            int rowsAffected = statement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Account Activated successfully.");
                return ResponseEntity.ok("Account Activated successfully");
            } else {
                System.out.println("Account cannot be Activated");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error activating the account.");
            }
        } catch (SQLException e) {
            System.err.println("Error updating password: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error activating the account.");
        }
    }

    /**
     * Endpoint to check for conflicts before adding or updating a show.
     * 
     * @param showRequest JSON request containing show information.
     * @return ResponseEntity with conflict status or success message.
     */
    @PostMapping("/checkShowConflict")
    public ResponseEntity<String> checkShowConflict(@RequestBody Show showRequest) {
        try {
            // Prepare the SQL statement to check for conflicts
            String checkConflictQuery = "SELECT COUNT(*) FROM shows WHERE screenID = ? AND date = ? AND periodID = ?";
            PreparedStatement checkConflictStatement = connection.prepareStatement(checkConflictQuery);
            checkConflictStatement.setInt(1, showRequest.screenID);
            checkConflictStatement.setDate(2, showRequest.date);
            checkConflictStatement.setInt(3, showRequest.periodID);
            ResultSet conflictResult = checkConflictStatement.executeQuery();
            if (conflictResult.next() && conflictResult.getInt(1) > 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Show time conflicts with an existing show.");
            } else {
                return ResponseEntity.ok("No conflict found. Show can be added or updated.");
            }
        } catch (SQLException e) {
            System.err.println("Error checking show conflict: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error checking show conflict.");
        }
    }
}