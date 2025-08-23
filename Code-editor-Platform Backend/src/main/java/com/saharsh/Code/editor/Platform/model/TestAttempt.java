package com.saharsh.Code.editor.Platform.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestAttempt {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "testId")
    private Test test;


    @ManyToOne
    @JoinColumn(name = "userId")
    private Users user;

    @CreationTimestamp
    private Timestamp startTime;


    private Timestamp endTime;

    private boolean status;

    private int totalScore;

}
