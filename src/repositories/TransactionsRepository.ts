import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const valorInicial = 0;
    const incomeBalance: number = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce(
        (counter, transaction) => counter + transaction.value,
        valorInicial,
      );

    const outcomeBalance: number = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce(
        (counter, transaction) => counter + transaction.value,
        valorInicial,
      );

    const balance: Balance = {
      income: incomeBalance,
      outcome: outcomeBalance,
      total: incomeBalance - outcomeBalance,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
