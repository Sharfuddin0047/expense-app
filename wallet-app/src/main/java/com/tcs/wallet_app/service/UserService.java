package com.tcs.wallet_app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcs.wallet_app.entity.User;
import com.tcs.wallet_app.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepo;

	public User saveUserDao(User user) {
		User isUserExist = userRepo.findByEmail(user.getEmail());
		System.out.println(user);
		if (isUserExist != null) {
			throw new IllegalArgumentException("Email already exists");
		}
		if (user.getId() == null) {
			userRepo.save(user);
		} else {
			userRepo.save(user);
		}
		return user;
	}

	public User findUserById(Long id) {
		Optional<User> userExists = userRepo.findById(id);
		if (userExists.isPresent()) {
			return userExists.get();
		}
		return null;
	}

	public boolean deleteUser(Long id) {
		Optional<User> user = userRepo.findById(id);
		if (user.isPresent()) {
			User existingUser = user.get();
			userRepo.delete(existingUser);
			return true;
		}
		return false;
	}
}
