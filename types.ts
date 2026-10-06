type AccountType = 'SAVINGS' | 'CHECKING' | 'BUSINESS';
type TransactionType = 'DEPOSIT' | 'WITHDRAWAL';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface Account {
  readonly id: number;
  ownerName: string;
  type: AccountType;
  balance: number;
  createdAt: Date;
}

export interface Transaction {
  readonly id: number;
  accountId: number;
  type: TransactionType;
  amount: number;
  timestamp: Date;
  description?: string;
}

export type CreateAccountDTO = Omit<Account, 'id' | 'createdAt' | 'balance'>;