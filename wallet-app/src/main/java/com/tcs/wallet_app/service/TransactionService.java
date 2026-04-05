package com.tcs.wallet_app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcs.wallet_app.entity.Transaction;
import com.tcs.wallet_app.entity.Wallet;
import com.tcs.wallet_app.exception.WalletException;
import com.tcs.wallet_app.repository.TransactionRepository;
import com.tcs.wallet_app.repository.WalletRepository;

@Service
public class TransactionService {

	@Autowired
	private TransactionRepository transactionRepo;
	@Autowired
	private WalletRepository walletRepo;

	public List<Transaction> getAllTransaction(Long walletId) {
		Optional<Wallet> wallet = walletRepo.findById(walletId);
		if (wallet.isPresent()) {
			return transactionRepo.findByWallet(wallet.get());
		}
		throw new WalletException("Wallet with " + walletId + " doesn't exits");
	}

	public Transaction createOrUpdate(Long walletId, Transaction transaction) {
		Optional<Wallet> wallet = walletRepo.findById(walletId);
		if (wallet.isPresent()) {
			transaction.setWallet(wallet.get());
			transactionRepo.save(transaction);
			return transaction;
		} else {
			return null;
		}
	}

	public Transaction getTransactionById(Long wallet_id, Long id) {
		Optional<Wallet> wallet = walletRepo.findById(wallet_id);
		if (wallet.isPresent()) {
			Optional<Transaction> transaction = transactionRepo.findById(id);
			if (transaction.isPresent()) {
				return transaction.get();
			}
		}
		throw new WalletException("Transaction with " + id + " doesn't exits");

	}

	public boolean deleteTransactionById(Long walletId, Long id) {
		Optional<Wallet> wallet = walletRepo.findById(walletId);
		if (wallet.isPresent()) {
//			System.out.println(wallet);
			Wallet w = wallet.get();
			Optional<Transaction> trans = transactionRepo.findById(id);
			if (trans.isPresent()) {
				Transaction transaction = trans.get();
				if (!transaction.getWallet().getId().equals(walletId)) {
					throw new WalletException("Transaction does not belong to this wallet");
				}
				w.getTransactions().remove(transaction);
				transaction.setWallet(null);
				transactionRepo.delete(transaction);
				return true;
			}
		}
		throw new WalletException("Transaction with " + id + " doesn't exits");
	}

}
