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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mysql.cj.x.protobuf.MysqlxCrud.Update;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Controller
@CrossOrigin("http://localhost:3000")
public class MoviesApplication {
    List<Movies> movies;
    PersonalInfo pi;
    int userID = 2;// default

    @Autowired
    private JavaMailSender emailSender;

    Connection connection;

    public MoviesApplication() {
        movies = new ArrayList<>();
        String jdbcUrl = "jdbc:mysql://localhost:33306/Movie_Booking";
        String username = "root";// change this
        String password = "bathinda"; // and that

        try {
            connection = DriverManager.getConnection(jdbcUrl, username, password);
            System.out.println("Database connection secured");
            // Movie
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
                        resultSet.getString("poster_url"));
                movies.add(movie);
            }
            // connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

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
            if (pi.promotion != 0) {
                sqlUpdateUser += " enrollforPromotions = " + pi.promotion + ",";
            }
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

    @GetMapping(value = "/getInfo")
    @ResponseBody
    public String getInfo() {
        String output = "";
        try {
            String sql = "SELECT * FROM user NATURAL JOIN payment_card WHERE UserID = " + userID;
            PreparedStatement statement = connection.prepareStatement(sql);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                String decodePassword = new String(Base64.getDecoder().decode(resultSet.getString("password")));
                String decodeCardNumber = new String(Base64.getDecoder().decode(resultSet.getString("cardNumber")));
                output += resultSet.getString("firstName") + ", " +
                        resultSet.getString("lastName") + ", " +
                        resultSet.getString("email") + ", " +
                        decodePassword + ", " +
                        resultSet.getString("cardType") + ", " +
                        decodeCardNumber + ", " +
                        resultSet.getDate("expirationDate") + ", " +
                        resultSet.getString("billingAddress");
            }
            // return pi;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return output;
    }

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
                    resultSet.getString("genre"),
                    resultSet.getDate("release_date").toString(),
                    resultSet.getString("director"),
                    resultSet.getInt("duration_minutes"),
                    resultSet.getInt("rating"),
                    resultSet.getString("synopsis"),
                    resultSet.getString("poster_url"));
            return mvs;
        } catch (Exception e) {
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

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<String> login(@RequestParam("email") String email,
            @RequestParam("password") String password) {
        try {
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
                String dbPassword = resultSet.getString("password");
                byte[] dbBytes = Base64.getDecoder().decode(dbPassword);
                String dbDecodedpassword = new String(dbBytes);
                if (decodedpassword.equals(dbDecodedpassword)) {
                    switch (status) {
                        case 1:
                            // User account is active, allow login
                            if (userType == 1) {
                                // Admin
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
}