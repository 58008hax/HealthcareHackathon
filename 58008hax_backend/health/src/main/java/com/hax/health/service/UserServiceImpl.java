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
	public User createNewUser(String name, String email, String password) {
		User user = new User(name, email, password.hashCode());
		if(userRepository.findByEmail(email) == null) {
			return userRepository.save(user);
		}
		return new User();
	}

	@Override
	public User correctCredentials(String email, String password) {
		User user = userRepository.findByEmail(email);
		if(user != null && !user.getName().equals("") && user.getPassword() == password.hashCode()) {
			return user;
		}
		return new User();
	}

}
