package com.belines.airlines.repository;

import java.sql.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import com.belines.airlines.models.User;

@Repository
public class UserRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<User> findAll() {
        String sql = "SELECT * FROM users";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Array sqlArray = rs.getArray("flights");
            Integer[] flightArray = (Integer[]) sqlArray.getArray();
            ArrayList<Integer> flights = new ArrayList<>(Arrays.asList(flightArray));
            return new User(
                    rs.getString("email"),
                    rs.getString("name"),
                    rs.getString("password"),
                    flights);
        });
    }

    public void save(User user) {
        String sql = "INSERT INTO users (email, name, password, flights) VALUES (?, ?, ?, ?)";

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(user.getPassword());

        jdbcTemplate.update(connection -> {
            var ps = connection.prepareStatement(sql);
            ps.setString(1, user.getEmail());
            ps.setString(2, user.getName());
            ps.setString(3, hashedPassword);
            Array flightsArray = connection.createArrayOf("INTEGER", user.getFlights().toArray());
            ps.setArray(4, flightsArray);
            return ps;
        });
    }

    public User findByEmail(String email) {
        String sql = "SELECT * FROM users WHERE email = ?";

        return jdbcTemplate.queryForObject(sql, new Object[] { email }, (rs, rowNum) -> {
            User user = new User();
            user.setEmail(rs.getString("email"));
            user.setName(rs.getString("name"));
            user.setPassword(rs.getString("password"));
            Array sqlArray = rs.getArray("flights");
            Integer[] flightArray = (Integer[]) sqlArray.getArray();
            ArrayList<Integer> flights = new ArrayList<>(Arrays.asList(flightArray));
            user.setFlights(flights);
            return user;
        });
    }

    public boolean checkLogin(String email, String password) {
        String sql = "SELECT password FROM users WHERE email = ?";
        String dbPassword = jdbcTemplate.queryForObject(sql, new Object[] { email }, String.class);
        return dbPassword != null && dbPassword.equals(password);
    }
    public boolean deleteFlightFromUser(String email, String code){
        try{
            String sqlSelect = "SELECT flights FROM users WHERE email = ?";
            Integer[] currentFLights = jdbcTemplate.queryForObject(sqlSelect, new Object[]{email}, (rs,rowNum) -> {
                Array sqlArray = rs.getArray("flights");
                if(sqlArray != null){
                    return(Integer[]) sqlArray.getArray();
                }
                else{
                    return new Integer[0];
                }
                
            });
            Integer flightCode = Integer.parseInt(code);
            List<Integer> updatedFlights = new ArrayList<>(Arrays.asList(currentFLights));
            if(updatedFlights.contains(flightCode)){
                updatedFlights.remove(flightCode);
            }
            Integer[] updatedArray = updatedFlights.toArray(new Integer[0]);
            String sqlUpdate = "UPDATE users SET flights = ? WHERE email = ?";
            jdbcTemplate.update(sqlUpdate, new Object[]{updatedArray, email});
            return true;
        }
        catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }
    public boolean addFlight(String email, String code){
        try {
            String sqlSelect = "SELECT flights FROM users WHERE email = ?";
            Integer[] currentFlights = jdbcTemplate.queryForObject(sqlSelect, new Object[]{email}, (rs, rowNum) -> {
                Array sqlArray = rs.getArray("flights");
                if (sqlArray != null) {
                    return (Integer[]) sqlArray.getArray();
                } else {
                    return new Integer[0]; 
                }

            });
    
            Integer newFlight = Integer.parseInt(code);
                List<Integer> updatedFlights = new ArrayList<>(Arrays.asList(currentFlights));
            if (!updatedFlights.contains(newFlight)) {
                updatedFlights.add(newFlight);
            }
    
            Integer[] updatedArray = updatedFlights.toArray(new Integer[0]);
    
            String sqlUpdate = "UPDATE users SET flights = ? WHERE email = ?";
            jdbcTemplate.update(sqlUpdate, new Object[]{updatedArray, email});
    
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
