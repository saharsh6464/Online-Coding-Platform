package com.saharsh.Code.editor.Platform.controller;

import com.saharsh.Code.editor.Platform.model.TestAttempt;
import com.saharsh.Code.editor.Platform.service.TestAttemptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/testattempts")
public class TestAttemptController {

    @Autowired
    private TestAttemptService testAttemptService;

    // Get all test attempts
    @GetMapping
    public ResponseEntity<List<TestAttempt>> getAllTestAttempts() {
        List<TestAttempt> testAttempts = testAttemptService.getAllTestAttempts();
        return new ResponseEntity<>(testAttempts, HttpStatus.OK);
    }

    // Get test attempt by ID
    @GetMapping("/{id}")
    public ResponseEntity<TestAttempt> getTestAttemptById(@PathVariable int id) {
        Optional<TestAttempt> testAttempt = testAttemptService.getTestAttemptById(id);
        return testAttempt.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Create a new test attempt
    @PostMapping
    public ResponseEntity<TestAttempt> createTestAttempt(@RequestBody TestAttempt testAttempt) {
        TestAttempt savedTestAttempt = testAttemptService.saveTestAttempt(testAttempt);
        return new ResponseEntity<>(savedTestAttempt, HttpStatus.CREATED);
    }

    // Update an existing test attempt
    @PutMapping("/{id}")
    public ResponseEntity<TestAttempt> updateTestAttempt(@PathVariable int id, @RequestBody TestAttempt testAttempt) {
        Optional<TestAttempt> existingTestAttempt = testAttemptService.getTestAttemptById(id);
        if (existingTestAttempt.isPresent()) {
            testAttempt.setId(id); // Ensure the ID from the path is used
            TestAttempt updatedTestAttempt = testAttemptService.saveTestAttempt(testAttempt);
            return new ResponseEntity<>(updatedTestAttempt, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a test attempt by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestAttempt(@PathVariable int id) {
        if (testAttemptService.getTestAttemptById(id).isPresent()) {
            testAttemptService.deleteTestAttempt(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}