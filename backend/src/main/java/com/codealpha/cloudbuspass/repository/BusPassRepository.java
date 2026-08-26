package com.codealpha.cloudbuspass.repository;

import com.codealpha.cloudbuspass.entity.BusPass;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusPassRepository extends JpaRepository<BusPass, Long> {
}