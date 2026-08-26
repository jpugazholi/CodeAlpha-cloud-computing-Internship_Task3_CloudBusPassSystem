package com.codealpha.cloudbuspass.controller;

import com.codealpha.cloudbuspass.entity.BusPass;
import com.codealpha.cloudbuspass.service.BusPassService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/buspasses")
@CrossOrigin(origins = "*")
public class BusPassController {

    private final BusPassService busPassService;

    public BusPassController(BusPassService busPassService) {
        this.busPassService = busPassService;
    }

    @PostMapping
    public ResponseEntity<BusPass> createBusPass(
            @RequestBody BusPass busPass) {

        return ResponseEntity.ok(
                busPassService.createBusPass(busPass)
        );
    }

    @GetMapping
    public ResponseEntity<?> getAllBusPasses() {
        return ResponseEntity.ok(
                busPassService.getAllBusPasses()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBusPass(
            @PathVariable Long id) {

        return busPassService.getBusPassById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}