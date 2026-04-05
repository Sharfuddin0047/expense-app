package com.tcs.wallet_app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcs.wallet_app.entity.User;
import com.tcs.wallet_app.entity.Wallet;
import com.tcs.wallet_app.exception.WalletException;
import com.tcs.wallet_app.repository.UserRepository;
import com.tcs.wallet_app.repository.WalletRepository;

@Service
public class WalletService {

	@Autowired
	private WalletRepository walletRepository;
	@Autowired
	private UserRepository userRepo;

	public Wallet createOrUpdate(Wallet wallet) {

		if (wallet.getId() == null) {
			walletRepository.save(wallet);
		} else {
			walletRepository.save(wallet);
		}
		return wallet;
	}
	public Wallet update(Wallet wallet) {
		System.out.println("service:"+wallet);
		if (wallet.getId() != null) {
			walletRepository.save(wallet);
		} else {
			walletRepository.save(wallet);
		}
		return wallet;
	}

	public Wallet saveWalletUserDao(Long userId, Wallet wallet) {
		Optional<User> user = userRepo.findById(userId);
		if (user.isPresent()) {
			wallet.setUser(user.get());
			walletRepository.save(wallet);
			return wallet;
		}
		return null;
	}

	public Wallet getById(Long id) {
		Optional<Wallet> optional = walletRepository.findById(id);
		if (optional.isPresent()) {
			return optional.get();
		} else {
			throw new WalletException("Wallet with " + id + " doesn't exits");
		}
	}

	public List<Wallet> getAllWallet() {
		return walletRepository.findAllByOrderByPriority();
	}

	public List<Wallet> getAllWalletByUserId(Long id) {
		Optional<User> user = userRepo.findById(id);
		if (user.isPresent()) {
			return walletRepository.findByUser(user.get());
		}
		throw new WalletException("User with " + id + " doesn't exits");
	}

	public Long getUserIdByWallet(Long walletId) {
		Optional<Wallet> wallet = walletRepository.findById(walletId);
		if (wallet.isPresent()) {
			Wallet wal = wallet.get();
			return wal.getUser().getId();
		}
		return null;
	}

	public boolean deleteById(Long id) {
		Optional<Wallet> optional = walletRepository.findById(id);
		if (optional.isPresent()) {
			Wallet wallet = optional.get();
			walletRepository.delete(wallet);
			return true;
		}
		throw new WalletException("Wallet with " + id + " doesn't exits");

	}
}
