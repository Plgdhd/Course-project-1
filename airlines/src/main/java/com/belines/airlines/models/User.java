package com.belines.airlines.models;

import java.util.ArrayList;
import lombok.Data;

@Data
public class User {
    
    public User(String email, String name, String password, ArrayList<Integer> flights){
        this.email = email;
        this.name = name;
        this.password = password;
        this.flights = flights;
    }

    public User(){}
    
    private String email;
    private String name;
    private String password; 
    private ArrayList<Integer> flights = new ArrayList<>();
}
