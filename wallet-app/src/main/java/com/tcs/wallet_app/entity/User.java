package com.tcs.wallet_app.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.ToString;

@Data
@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull(message = "Username is required")
	@Size(min = 3, max = 20)
	private String username;
	@NotNull(message = "Email is required")
	@Size(min = 10, max = 30)
	@Column(unique = true)
	private String email;
	@NotNull(message = "Password is required")
	@Size(min = 5, max = 20)
	private String password;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonManagedReference
	@ToString.Exclude
	@JsonIgnore
	private List<Wallet> wallets;

}
