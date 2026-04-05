package com.tcs.wallet_app.entity;

import java.time.LocalDate;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.ToString;

@Data
@Entity
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Min(1)
	@NotNull(message = "Ammount cann't be null")
	private Double ammount;
	private String description;
	@Min(1)
	@Max(3)
	private int type;// 1 Income, 2 Expense, 3 Transfer

//	@JsonFormat(pattern = "yyyy-mm-dd")
//	private Date transactionDate;
	private LocalDate transactionDate;

	@JoinColumn(name = "wallet_id", nullable = false)
	@ManyToOne(fetch = FetchType.EAGER)
	@JsonBackReference
	@ToString.Exclude
	private Wallet wallet;

//	@PrePersist
//	public void setTransactionDate() {
//		this.transactionDate = new Date();
//	}
}
