package com.hax.health.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hax.health.dao.UserRepository;
import com.hax.health.model.User;

@Service ("userService")
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public User createNewUser(String name, String email, String phoneNumber, String street, String city, String state, String password) {
		if(userRepository.findByEmail(email) == null) {
			User user = new User(name, email, phoneNumber, street, city, state, password.hashCode());
			return userRepository.save(user);
		}
		return new User();
	}

	@Override
	public User correctCredentials(String email, String password) {
		User user = userRepository.findByEmail(email);
		if(user != null && user.getName() != null && user.getPassword() == password.hashCode()) {
			return user;
		}
		return new User();
	}

}
