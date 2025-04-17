package com.belines.airlines.repository;

import java.sql.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.belines.airlines.models.User;

@Repository
public class UserRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserRepository(JdbcTemplate jdbcTemplate){
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
    
        jdbcTemplate.update(connection -> {
            var ps = connection.prepareStatement(sql);
            ps.setString(1, user.getEmail());
            ps.setString(2, user.getName());
            ps.setString(3, user.getPassword());
                Array flightsArray = connection.createArrayOf("INTEGER", user.getFlights().toArray());
            ps.setArray(4, flightsArray);
            return ps;
        });
    }

    public boolean checkLogin(String email, String password) {
        String sql = "SELECT password FROM users WHERE email = ?";
        String dbPassword = jdbcTemplate.queryForObject(sql, new Object[]{email}, String.class);
        return dbPassword != null && dbPassword.equals(password);
    }

}
