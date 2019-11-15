import React, { useState, useEffect } from 'react';
import { startCase, toLower } from 'lodash'
import { AccountBalanceInterface, BalanceInterface } from './types'

const AutoPayout : React.FC = (props) => {
  const [api_response] = useState({ok: false, statusText: ''})
  const [account_balances, setAccountBalances] = useState<AccountBalanceInterface[]>([]);
  const [error, setError] = useState('');
  

  useEffect(() => {
    if(api_response.ok) {
      const { response } = api_response as any
      setAccountBalances(response)
    } else {
      setError(api_response.statusText)
    }
  }, [api_response])

  return(
    <>
    <div className="columns">

    {
      !error && account_balances && account_balances.map((account_balance:AccountBalanceInterface, key: any) => {
        return (
          <div key={key} className="column">
            <div className="title is-5">Recipient ID: {account_balance.recipientId}</div>
            <div className="columns is-multiline">
            {
              account_balance.balances && account_balance.balances.map((balance: BalanceInterface, key: any) => {
                return(
                  <div key={key} className="column is-one-quarter">
                    <div className="card">
                    <header className="card-header">
                      <p className="card-header-title">
                        {balance.currency}
                      </p>
                    </header>
                    <div className="card-content">
                      <div className="content">
                        <div className="title is-3">{balance.amount.value}</div>
                        <div className="is-7">Balance type:</div>
                        <div className="is-6">{startCase(toLower(balance.balanceType))}</div>
                      </div>
                    </div>
                    <footer className="card-footer">
                      <a href="" className="card-footer-item">Send</a>
                      <a href="" className="card-footer-item">Payout</a>
                    </footer>
                  </div>
                </div>
                )
              })
            }
            </div>
          </div>
        ) 
      })
    }
    </div>
      {
        error && <p style={{padding: 10, paddingTop: 0}}>{error}</p>
      }
    </>
  )
}

export default AutoPayout