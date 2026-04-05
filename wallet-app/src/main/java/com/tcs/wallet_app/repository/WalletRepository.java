package com.tcs.wallet_app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tcs.wallet_app.entity.User;
import com.tcs.wallet_app.entity.Wallet;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {
	List<Wallet> findAllByOrderByPriority();
	List<Wallet> findByUser(User user);
}
