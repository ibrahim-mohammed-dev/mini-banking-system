import {
  Account,
  Transaction,
  ApiResponse,
  CreateAccountDTO,
} from './types';

export class BankingService {
  private accounts: Account[] = [];
  private transactions: Transaction[] = [];
  private nextAccountId: number = 1;
  private nextTransactionId: number = 1;

  createAccount(dto: CreateAccountDTO): ApiResponse<Account> {
    const newAccount: Account = {
      id: this.nextAccountId++,
      ownerName: dto.ownerName,
      type: dto.type,
      balance: 0,
      createdAt: new Date(),
    };

    this.accounts.push(newAccount);

    return {
      success: true,
      message: 'Account created successfully',
      data: newAccount,
    };
  }

  @LogExecutionTime()
  deposit(accountId: number, amount: number): ApiResponse<Transaction> {
    if (amount <= 0) {
      return {
        success: false,
        message: 'Deposit amount must be greater than zero',
      };
    }

    const account = this.accounts.find((a) => a.id === accountId);
    if (!account) {
      return {
        success: false,
        message: `Account with ID ${accountId} not found`,
      };
    }

    account.balance += amount;

    const transaction: Transaction = {
      id: this.nextTransactionId++,
      accountId,
      type: 'DEPOSIT',
      amount,
      timestamp: new Date(),
    };

    this.transactions.push(transaction);

    return {
      success: true,
      message: 'Deposit completed successfully',
      data: transaction,
    };
  }

  @LogExecutionTime()
  withdraw(accountId: number, amount: number): ApiResponse<Transaction> {
    if (amount <= 0) {
      return {
        success: false,
        message: 'Withdrawal amount must be greater than zero',
      };
    }

    const account = this.accounts.find((a) => a.id === accountId);
    if (!account) {
      return {
        success: false,
        message: `Account with ID ${accountId} not found`,
      };
    }

    if (account.balance < amount) {
      return {
        success: false,
        message: `Insufficient funds. Current balance is ${account.balance}`,
      };
    }

    account.balance -= amount;

    const transaction: Transaction = {
      id: this.nextTransactionId++,
      accountId,
      type: 'WITHDRAWAL',
      amount,
      timestamp: new Date(),
    };

    this.transactions.push(transaction);

    return {
      success: true,
      message: 'Withdrawal completed successfully',
      data: transaction,
    };
  }

  getTransactionHistory(accountId: number): ApiResponse<Transaction[]> {
    const accountExists = this.accounts.some((a) => a.id === accountId);
    if (!accountExists) {
      return {
        success: false,
        message: `Account with ID ${accountId} not found`,
      };
    }

    const history = this.transactions.filter((t) => t.accountId === accountId);

    return {
      success: true,
      message: 'Transaction history retrieved successfully',
      data: history,
    };
  }
}

 function LogExecutionTime() {
  return function (
    originalMethod: Function,
    context: ClassMethodDecoratorContext
  ) {
    const methodName = String(context.name);

    return function (this: any, ...args: any[]) {
      const start = performance.now();
      const result = originalMethod.apply(this, args);
      const end = performance.now();

      console.log(`⏱️ [LOG] Execution time for ${methodName}: ${(end - start).toFixed(3)} ms`);

      return result;
    };
  };
}