package com.belines.airlines.models;

import java.sql.Date;

import lombok.Data;

@Data
public class Flight {
    private String code;
    private String from;
    private String to;
    private String  arrival_date;
    private String departure_date;
    private int price;

    public Flight(String code, String from, String to, String arrival_date, String departure_date, int price) {
        this.code = code;
        this.from = from;
        this.to = to;
        this.arrival_date = arrival_date;
        this.departure_date = departure_date;
        this.price = price;
    }
}
