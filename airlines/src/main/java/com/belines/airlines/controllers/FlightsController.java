package com.belines.airlines.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.metrics.jfr.FlightRecorderApplicationStartup;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import com.belines.airlines.models.Flight;
import com.belines.airlines.models.User;

import java.util.List;
import java.util.Map;
import java.util.logging.FileHandler;

import com.belines.airlines.repository.FlightRepository;
import com.belines.airlines.repository.UserRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@CrossOrigin(origins = "*")
public class FlightsController {
    
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FlightRepository flightRepository;

    @GetMapping("/flights")
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }
    
    @PostMapping("/flights/addUserFlight")
    public ResponseEntity<String> postMethodName(@RequestBody Map<String, Object> json) {
        String email = (String) json.get("email");
        String code = (String) json.get("flightCode");

        String fixedCode = code.replace("BE-", "");
        if(userRepository.addFlight(email, fixedCode)) return ResponseEntity.ok().body("added successfully");
        return ResponseEntity.badRequest().body("failed to add flights");
    }
    
    @GetMapping("/flights/getUserFlights")
    public ResponseEntity<?> getUserFlights(@RequestParam(required = false) String email){
        if(email == null){
            String responseError = "Email doesn`t exists in request";
            return ResponseEntity.badRequest().body(responseError);
        }
        User user = userRepository.findByEmail(email);
        return ResponseEntity.ok(flightRepository.getUserFlights(user));
    }
    @GetMapping("/flights/getFlight")
    public Flight getFlightById(@RequestParam String code){
        return flightRepository.findByCode(code);
    }
    
    
}
