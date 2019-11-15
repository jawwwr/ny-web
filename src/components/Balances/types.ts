

export interface AmountInterface {
  currency: string,
  value: number
}
export interface BalanceInterface {
  id: number,
  balanceType: string,
  bankDetails: string | null,
  currency: string,
  amount: AmountInterface
}

export interface AccountBalanceInterface {
  active: boolean
  balances: BalanceInterface[]
  creationTime: string,
  eligible: boolean,
  id: number,
  modificationTime: string,
  profileId: number,
  recipientId: number,
}

