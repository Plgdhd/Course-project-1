package com.belines.airlines.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.metrics.jfr.FlightRecorderApplicationStartup;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import com.belines.airlines.models.Flight;
import java.util.List;
import com.belines.airlines.repository.FlightRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin(origins = "*")
public class FlightsController {
    
    @Autowired
    private FlightRepository flightRepository;

    @GetMapping("/flights")
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }
    
    @GetMapping("/flights/getFlight")
    public Flight getFlightById(@RequestParam String code){
        return flightRepository.findByCode(code);
    }
    
    
}
