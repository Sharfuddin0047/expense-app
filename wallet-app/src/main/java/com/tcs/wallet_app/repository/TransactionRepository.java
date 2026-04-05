package com.tcs.wallet_app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tcs.wallet_app.entity.Transaction;
import com.tcs.wallet_app.entity.Wallet;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

	List<Transaction> findByWallet(Wallet wallet);

}
