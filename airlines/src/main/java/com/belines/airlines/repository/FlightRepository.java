package com.belines.airlines.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchProperties.Jdbc;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.belines.airlines.models.Flight;
import java.util.List;
@Repository
public class FlightRepository {
    private final JdbcTemplate jdbcTemplate;
    
    @Autowired
    public FlightRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Flight> findAll(){
        String sql = "SELECT * FROM flights";

        return jdbcTemplate.query(sql, (rs,rowNum) -> new Flight(
            rs.getString("code"),
            rs.getString("from_city"),
            rs.getString("to_city"),
            rs.getString("arrival_date"),
            rs.getString("departure_date"),
            rs.getInt("price")
        ));
    }

    
    public Flight findByCode(String code){
        String sql = "SELECT * FROM flights WHERE code = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{code}, 
        (rs, rowNum) -> new Flight(
            rs.getString("code"),
            rs.getString("from_city"),
            rs.getString("to_city"),
            rs.getString("arrival_date"),
            rs.getString("departure_date"),  
            rs.getInt("price")
        ));
    }
}
