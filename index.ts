import { BankingService } from './banking.service';

const bankingService = new BankingService();
console.log('Starting Banking Service Demo\n');

//إنشاء حساب جديد
const account1 = bankingService.createAccount({
  ownerName: 'Hema',
  type: 'SAVINGS',
});
console.log('Account Created:', account1);

//إيداع مبلغ
const depositResult = bankingService.deposit(1, 1000);
console.log('Deposit Result:', depositResult);

//سحب مبلغ
const withdrawResult = bankingService.withdraw(1, 300);
console.log('Withdraw Result:', withdrawResult);

//عرض سجل المعاملات
const history = bankingService.getTransactionHistory(1);
console.log('Transaction History:', JSON.stringify(history, null, 2));