package com.codealpha.cloudbuspass.repository;

import com.codealpha.cloudbuspass.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByUserId(Long userId);

    List<Application> findByStatus(String status);
}