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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tcs.wallet_app.entity.Transaction;
import com.tcs.wallet_app.service.TransactionService;
import com.tcs.wallet_app.service.ValidationErrorService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/transaction")
@CrossOrigin
//@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST,
//		RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS })
public class TransactionController {

	@Autowired
	private TransactionService transactionService;
	@Autowired
	private ValidationErrorService validationErrorService;

	@PostMapping("/addTransaction/{walletId}")
	public ResponseEntity<?> create(@Valid @PathVariable Long walletId, @RequestBody Transaction transaction,
			BindingResult result) {
		ResponseEntity<?> errors = validationErrorService.validate(result);
		if (errors != null)
			return errors;
		Transaction transactionSaved = transactionService.createOrUpdate(walletId, transaction);
		return new ResponseEntity<Transaction>(transactionSaved, HttpStatus.CREATED);
	}

	@GetMapping("/getTransactionById/{wallet_id}/{id}")
	public ResponseEntity<?> getTransactionById(@PathVariable Long wallet_id, @PathVariable Long id) {
		if (transactionService.getTransactionById(wallet_id, id) != null) {
			return new ResponseEntity<>(transactionService.getTransactionById(wallet_id, id), HttpStatus.OK);
		}
		return null;
	}

	@GetMapping("/getAllTransaction/{walletId}")
	public ResponseEntity<?> getAllTransaction(@PathVariable Long walletId) {
		return new ResponseEntity<>(transactionService.getAllTransaction(walletId), HttpStatus.OK);
	}

	@PutMapping("/updateTransaction/{wallet_id}/{id}")
	public ResponseEntity<?> update(@PathVariable Long wallet_id, @PathVariable Long id,
			@Valid @RequestBody Transaction transaction, BindingResult result) {
		ResponseEntity<?> errors = validationErrorService.validate(result);
		if (errors != null)
			return errors;
		transaction.setId(id);
		Transaction transactionSaved = transactionService.createOrUpdate(wallet_id, transaction);
		return new ResponseEntity<Transaction>(transactionSaved, HttpStatus.OK);
	}

	@DeleteMapping("/deleteTransactionById/{walletId}/{id}")
	public ResponseEntity<?> delete(@PathVariable Long walletId, @PathVariable Long id) {
		return new ResponseEntity<>(transactionService.deleteTransactionById(walletId, id), HttpStatus.OK);
	}

}
