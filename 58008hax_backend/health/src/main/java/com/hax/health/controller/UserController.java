package com.hax.health.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

//import com.hax.health.dao.UserRepository;
import com.hax.health.model.User;
import com.hax.health.service.UserService;


@Controller 
@RequestMapping(path="/user")
public class UserController {
	@Autowired
	private UserService userService;
	
	/*@Autowired
	private UserRepository userRep;*/

	@GetMapping(path="/add")
	public @ResponseBody User addNewUser (@RequestParam String name
			, @RequestParam String email, @RequestParam String phoneNumber, @RequestParam String street, @RequestParam String city, @RequestParam String state, @RequestParam String password) {
		
		return userService.createNewUser(name, email, phoneNumber, street, city, state, password);
	}
	
	/*@GetMapping(path="/find")
	public @ResponseBody User findUser (@RequestParam String email) {
		User user = userRep.findByEmail(email);
		System.out.println(user);
		return user;
	}*/
	
	@GetMapping(path="/check")
	public @ResponseBody User getUserWith(@RequestParam String email, @RequestParam String password) {
		return userService.correctCredentials(email, password);
	}
}