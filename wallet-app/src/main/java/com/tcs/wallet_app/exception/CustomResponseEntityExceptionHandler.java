package com.tcs.wallet_app.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import io.swagger.v3.oas.annotations.Hidden;

@RestController
@Hidden
@RestControllerAdvice
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
	@ExceptionHandler
	public final ResponseEntity<?> handleWalletException(WalletException exception, WebRequest request) {
		WalletExceptionResponse response = new WalletExceptionResponse(exception.getMessage());
		return new ResponseEntity<WalletExceptionResponse>(response, HttpStatus.BAD_REQUEST);
	}
}
