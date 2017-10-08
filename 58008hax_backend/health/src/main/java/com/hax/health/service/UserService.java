package com.hax.health.service;

import com.hax.health.model.User;

public interface UserService {

	public User createNewUser(String name, String email, String password);
	public User correctCredentials(String email, String password);
	
}
