package com.codealpha.cloudbuspass.controller;

import com.codealpha.cloudbuspass.entity.Application;
import com.codealpha.cloudbuspass.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    public ResponseEntity<?> apply(
            @RequestBody Application application) {

        try {
            return ResponseEntity.ok(
                    applicationService.apply(application)
            );
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllApplications() {
        return ResponseEntity.ok(
                applicationService.getAllApplications()
        );
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserApplications(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                applicationService.getApplicationsByUser(userId)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getApplication(
            @PathVariable Long id) {

        return applicationService.getApplicationById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        try {
            return ResponseEntity.ok(
                    applicationService.updateStatus(id, status)
            );
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}