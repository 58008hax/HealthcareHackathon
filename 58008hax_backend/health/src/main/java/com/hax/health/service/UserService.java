package com.hax.health.service;

import com.hax.health.model.User;

public interface UserService {

	public User createNewUser(String name, String email, String phoneNumber, String street, String city, String state, String password);
	public User correctCredentials(String email, String password);
	
}
