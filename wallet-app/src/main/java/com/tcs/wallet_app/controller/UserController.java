package com.tcs.wallet_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcs.wallet_app.entity.User;
import com.tcs.wallet_app.repository.UserRepository;
import com.tcs.wallet_app.service.UserService;
import com.tcs.wallet_app.service.ValidationErrorService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
@CrossOrigin
//@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST,
//		RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS })

public class UserController {

	@Autowired
	private UserService userService;
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private ValidationErrorService validationErrorService;



	@PostMapping("/add")
	public ResponseEntity<?> saveUser(@Valid @RequestBody User user, BindingResult result) {
//	public String save() {
		System.out.println(user);
		ResponseEntity<?> errors = validationErrorService.validate(result);
		if (errors != null)
			return errors;
		User userSaved = userService.saveUserDao(user);
		return new ResponseEntity<User>(userSaved, HttpStatus.CREATED);

	}

	@GetMapping("/{email}")
	public ResponseEntity<?> getByEmail(@PathVariable String email) {
		if (email != null) {
			return new ResponseEntity<User>(userRepo.findByEmail(email), HttpStatus.OK);
		}
		return null;
	}

	@GetMapping("/id/{id}")
	public User getById(@PathVariable Long id) {
		if (id != null) {
//			return new ResponseEntity<User>(userRepo.findById(id), HttpStatus.OK);
			return userService.findUserById(id);
		}
		return null;
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<?> getAllUser(){
		return new ResponseEntity<>(userRepo.findAll(), HttpStatus.OK);
	}

	@DeleteMapping("/{user_id}")
	public ResponseEntity<?> delete(@PathVariable Long user_id) {
		return new ResponseEntity<>(userService.deleteUser(user_id), HttpStatus.OK);
	}

}
