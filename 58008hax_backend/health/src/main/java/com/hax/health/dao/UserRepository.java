package com.hax.health.dao;

import org.springframework.data.repository.CrudRepository;

import com.hax.health.model.User;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UserRepository extends CrudRepository<User, Long> {

	User findByEmail(String email);
	
}
