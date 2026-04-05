package com.tcs.wallet_app.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tcs.wallet_app.entity.Wallet;
import com.tcs.wallet_app.repository.WalletRepository;
import com.tcs.wallet_app.service.ValidationErrorService;
import com.tcs.wallet_app.service.WalletService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/wallet")
@CrossOrigin
//@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST,
//		RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS })

public class WalletController {

	@Autowired
	private WalletRepository walletRepo;
	@Autowired
	private WalletService walletService;
	@Autowired
	private ValidationErrorService validationErrorService;

	@PostMapping("/add")
	public ResponseEntity<?> create(@Valid @RequestBody Wallet wallet, BindingResult result) {
		ResponseEntity<?> errors = validationErrorService.validate(result);
		if (errors != null)
			return errors;
		Wallet walletSaved = walletService.createOrUpdate(wallet);
		return new ResponseEntity<Wallet>(walletSaved, HttpStatus.CREATED);
	}

	@PostMapping("/addWalletUser/{user_id}")
	public ResponseEntity<?> saveWalletForUser(@Valid @PathVariable Long user_id, @RequestBody Wallet wallet,
			BindingResult result) {
		ResponseEntity<?> errors = validationErrorService.validate(result);
		if (errors != null)
			return errors;
		Wallet walletSaved = walletService.saveWalletUserDao(user_id, wallet);
		return new ResponseEntity<Wallet>(walletSaved, HttpStatus.CREATED);
	}

	@GetMapping("/getById/{id}")
	public ResponseEntity<?> getWalletById(@PathVariable Long id) {
		if (walletService.getById(id) != null) {
			return new ResponseEntity<>(walletService.getById(id), HttpStatus.OK);
		}
		return null;
	}

	@GetMapping("/getAll")
	public ResponseEntity<?> getAllWallet() {
		return new ResponseEntity<>(walletService.getAllWallet(), HttpStatus.OK);
	}

	@GetMapping("/getWalletsByUserId/{user_id}")
	public ResponseEntity<?> getWalletsByUserId(@PathVariable Long user_id) {
		System.out.println(user_id);
		return new ResponseEntity<>(walletService.getAllWalletByUserId(user_id), HttpStatus.OK);
	}

	@GetMapping("/getUserIdFromWallet/{walletId}")
	public ResponseEntity<?> getUserId(@PathVariable Long walletId) {
		return new ResponseEntity<>(walletService.getUserIdByWallet(walletId), HttpStatus.OK);
	}

	@PutMapping("/update/{id}") // id = walletId
	public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Wallet wallet, BindingResult result) {
		System.out.println("Wallet ID: " + id);

		System.out.println(wallet);
		ResponseEntity<?> errors = validationErrorService.validate(result);
		if (errors != null)
			return errors;

		// Step 1: Pehle database se purana wallet lao
		Optional<Wallet> existingWallet = walletRepo.findById(id);
		if (!existingWallet.isPresent()) {
			return new ResponseEntity<>("Wallet not found", HttpStatus.NOT_FOUND);
		}

		// Step 2: User ko preserve karo
		System.out.println("wallet before: " + wallet);
		wallet.setId(id);
		System.out.println("wallet: " + wallet);
		System.out.println("user: " + existingWallet.get().getUser());
		wallet.setUser(existingWallet.get().getUser()); // 👈 purane wallet ka user set karo
		System.out.println(wallet);
		// Step 3: Save the updated wallet
		Wallet updatedWallet = walletService.update(wallet);

		return new ResponseEntity<>(updatedWallet, HttpStatus.OK);
	}

	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		return new ResponseEntity<>(walletService.deleteById(id), HttpStatus.OK);
	}

}
