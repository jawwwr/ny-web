import React, { useState, useEffect } from 'react'
import { startCase, toLower } from 'lodash'
import { Link } from "react-router-dom";
import API from 'api'
import { AccountBalanceInterface, BalanceInterface } from './types'

const profile_id = '11319295'

const Users : React.FC = (props) => {
  const [account_balances, setAccountBalances] = useState<AccountBalanceInterface[]>();
  const [error, setError] = useState('');

  useEffect(() => {
    const getAccountBalances = async () => {
        try {
          const response = await API('GET', `v1/borderless-accounts?profileId=${profile_id}`)
          setAccountBalances(response.data)
        } catch (api_error) {
          setError(api_error)
        }
    }
    getAccountBalances()
  }, [])

  if(!account_balances || account_balances.length === 0)  {
    return(
      <>
      {
        <div className="column">
          <div className="columns is-multiline">
          <div className="column is-one-quarter">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">
                  {
                    !account_balances ? 'Loading ...' : 'Not available'
                  }
                </p>
              </header>
              <div className="card-content">
                <div className="content">
                  {
                    !account_balances ? 'Loading ...' : 'Please add money'
                  }
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      }
      </>
    )
  }

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
                        <div className="is-6 has-text-weight-light">Balance type:</div>
                        <div className="is-6 has-text-weight-medium">{startCase(toLower(balance.balanceType))}</div>
                      </div>
                    </div>
                    <footer className="card-footer">
                      <Link to="" className="card-footer-item">Send</Link>
                      <Link to={`/admin/balances/auto-payout?currency=${balance.currency}&contract=${Math.floor(Math.random() * 5)}`} className="card-footer-item">Payout</Link>
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

export default Users