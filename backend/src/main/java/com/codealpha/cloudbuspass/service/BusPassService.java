package com.codealpha.cloudbuspass.service;

import com.codealpha.cloudbuspass.entity.BusPass;
import com.codealpha.cloudbuspass.repository.BusPassRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BusPassService {

    private final BusPassRepository busPassRepository;

    public BusPassService(BusPassRepository busPassRepository) {
        this.busPassRepository = busPassRepository;
    }

    public BusPass createBusPass(BusPass busPass) {
        return busPassRepository.save(busPass);
    }

    public List<BusPass> getAllBusPasses() {
        return busPassRepository.findAll();
    }

    public Optional<BusPass> getBusPassById(Long id) {
        return busPassRepository.findById(id);
    }
}