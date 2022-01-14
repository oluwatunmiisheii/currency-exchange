import { useState, useEffect } from "react";
import { Currencies } from "../enums/Currencies.enum"

interface IUserAccount {
  currency: string;
  balance?: number;
}

interface IUserBalance extends IUserAccount {
  amount: number | string;
  scope: string;
  cb: (amount: string | number, balance: number, scope: string) => void;
}

export const initialUserAccounts: IUserAccount[]  = [
  {
    currency: Currencies.USD,
    balance: 100,
  },
  {
    currency: Currencies.GBP,
    balance: 0.13,
  },
  {
    currency: Currencies.EUR,
    balance: 200,
  }
]

export default function useUserBalance(args: IUserBalance) {
  const [userAccounts, setUserAccounts] = useState<IUserAccount[]>(initialUserAccounts);
  const [userBalance, setUserBalance] = useState<number>(0);

  const getUserBalance = ()  => {
    let balance;
    balance = userAccounts.find(b => b.currency === args.currency)?.balance ?? 0;
    setUserBalance(balance);
    args.cb(args.amount, balance, args.scope);
  }

  useEffect (() => {
    getUserBalance();
  }, [args.currency])

  return { setUserAccounts, userBalance  };
}