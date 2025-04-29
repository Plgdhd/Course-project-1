package com.belines.airlines.controllers;

import com.belines.airlines.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.belines.airlines.models.User;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            userService.save(user);
            return ResponseEntity.ok("Success");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        try {
            User userFromDb = userService.findByEmail(user.getEmail());
            if (userFromDb == null) {
                return ResponseEntity.badRequest().body("{\"error\":\"User not found\"}");
            }

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            boolean passwordMatches = passwordEncoder.matches(user.getPassword(), userFromDb.getPassword());

            if (passwordMatches) {
                StringBuilder json = new StringBuilder();
                json.append("{");
                json.append("\"name\":\"").append(userFromDb.getName()).append("\",");
                json.append("\"email\":\"").append(userFromDb.getEmail()).append("\",");

                json.append("\"flights\":[");
                List<Integer> flights = userFromDb.getFlights();
                for (int i = 0; i < flights.size(); i++) {
                    json.append(flights.get(i));
                    if (i < flights.size() - 1) {
                        json.append(",");
                    }
                }
                json.append("]");
                json.append("}");

                return ResponseEntity.ok()
                        .header("Content-Type", "application/json")
                        .body(json.toString());
            } else {
                return ResponseEntity.badRequest().body("{\"error\":\"Invalid credentials\"}");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\":\"Login failed: " + e.getMessage() + "\"}");
        }
    }

}
