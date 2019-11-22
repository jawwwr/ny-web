import React, { useEffect, useState} from 'react'
import uuid from 'uuid/v1';
import queryString from 'query-string'
import { toNumber } from 'lodash'
import API from 'api'
import status_translate from 'utils/translations'
import Admin from 'pages/Admin';
import './styles.scss'

const contracts = [
  {
    id: 0,
    name: 'Keme Keme',
    people: [
      {
        recipient: {
          id: 74565782,
          currency: "USD",
        }
      },
    ]
  },
  {
    id: 1,
    name: 'Lorem',
    people: [
      {
        recipient: {
          id: 74565782,
          currency: "USD",
        }
      },
    ]
  },
  {
    id: 2,
    name: 'Thunder',
    people: [
      {
        recipient: {
          id: 74565782,
          currency: "USD",
        }
      },
    ]
  },
  {
    id: 3,
    name: 'Wrangler',
    people: [
      {
        recipient: {
          id: 74565782,
          currency: "USD",
        }
      },
    ]
  },
  {
    id: 4,
    name: 'Chipipay',
    people: [
      {
        recipient: {
          id: 74565782,
          currency: "USD",
        }
      },
    ]
  },
  {
    id: 5,
    name: 'Makyonget',
    people: [
      {
        recipient: {
          id: 74565782,
          currency: "USD",
        }
      },
    ]
  }
]

const profile_id = '11319295'

const QuoteContent = ({quote}:any) => {
  if(!quote) {
    return(
      <>
        <div className="is-7">Creating...</div>
      </>
    )
  }
  return(
    <>
      <div className="title is-6 has-text-weight-light">Target Amount:</div>
      <div className="subtitle is-3 has-text-weight-medium">{quote.targetAmount}</div>
      <div className="is-6 has-text-weight-light">Source Amount: <span className="has-text-weight-medium">{quote.sourceAmount} </span></div>
      <div className="is-6 has-text-weight-light">Source: <span className="has-text-weight-medium">{quote.source} </span></div>
      <div className="is-6 has-text-weight-light">Target: <span className="has-text-weight-medium">{quote.target} </span></div>
      <div className="is-6 has-text-weight-light">Rate type: <span className="has-text-weight-medium">{quote.rateType} </span></div>
      <div className="is-6 has-text-weight-light">Rate: <span className="has-text-weight-medium">{quote.rate} </span></div>
      <div className="is-6 has-text-weight-light">Fee: <span className="has-text-weight-medium">{quote.fee} </span></div>
    </>
  )
}

const TransferContent = ({transfer, quote}:any) => {
  if(!transfer || !quote) {
    return(
      <>
        <div className="is-7">
          {
            !quote ? 'Waiting...' : 'Transferring...'
          }
        </div>
      </>
    )
  }
  return(
    <>
      <div className="title is-6 has-text-weight-light">Target Amount:</div>
      <div className="subtitle is-3 has-text-weight-medium">{transfer.targetValue}</div>
      <div className="is-6 has-text-weight-light">Reference / Contract: <span className="has-text-weight-medium">{transfer.reference} </span></div>
      <div className="is-6 has-text-weight-light">Source Currency: <span className="has-text-weight-medium">{transfer.sourceCurrency} </span></div>
      <div className="is-6 has-text-weight-light">Source Value : <span className="has-text-weight-medium">{transfer.sourceValue} </span></div>
      <div className="is-6 has-text-weight-light">Target Currency: <span className="has-text-weight-medium">{transfer.targetCurrency} </span></div>
      <div className="is-6 has-text-weight-light">Target Value: <span className="has-text-weight-medium">{transfer.targetValue} </span></div>
      <div className="is-6 has-text-weight-light">Fee: <span className="has-text-weight-medium">{transfer.rate} </span></div>
      <div className="is-6 has-text-weight-light">Status: <span className="has-text-weight-medium">{status_translate[transfer.status]} </span></div>
    </>
  )
}

const FundContent = ({fund, transfer}:any) => {
  if(!fund || !transfer) {
    return(
      <>
        <div className="is-7">
          {
            !transfer ? 'Waiting...' : 'Funding...'
          }
        </div>
      </>
    )
  }
  return(
    <>
      <div className="title is-6 has-text-weight-light">Target Amount:</div>
      <div className="subtitle is-3 has-text-weight-medium">{transfer.targetValue}</div>
      <div className="is-6 has-text-weight-light">Reference / Contract: <span className="has-text-weight-medium">{transfer.reference} </span></div>
      <div className="is-6 has-text-weight-light">Type: <span className="has-text-weight-medium">{fund.type} </span></div>
      <div className="is-6 has-text-weight-light">Status: <span className="has-text-weight-medium">{fund.status} </span></div>
    </>
  )
}


const AutoPayout: React.FC = ({ location }: any) => {
  const [target_account, setTargetAccount] = useState();
  const [quote, setQuote] = useState();
  const [transfer, setTransfer] = useState();
  const [fund, setFund] = useState();
  const [contract_name, setContractName] = useState();
  const [error, setError] = useState('');
  console.log(error)

  // Auto payout: 
  // Steap 1: create quote
  //  quote data are from a dummy contract (contracts[])
  useEffect( () => {
    const params = queryString.parse(location.search)
    const contract = contracts.find(contract => contract.id === toNumber(params.contract));
    setContractName(contract!.name)
    setTargetAccount(contract!.people[0].recipient.id)

    const createQuote = async (body:any) => {
      try {
        const response = await API('POST', "v1/quotes", body)
        setQuote(response.data)
      } catch (api_error) {
        setError(api_error)
      }
  }

    if(params.currency) {
      const body = {
        profile: profile_id,
        source: params.currency,
        target: contract!.people[0].recipient.currency,
        rateType: "FIXED",
        targetAmount: `0.0${Math.floor(Math.random() * 10)}`,
        type: "BALANCE_PAYOUT"
      }
      createQuote(body)
    }
  }, [])

  // Steap 2: create transfer
  //  transfer will be created once quote was successfully create, and get its id
  useEffect( () => {
    const createTransfer = async (body:any) => {
      try {
        const response = await API('POST', "v1/transfers", body)
        setTransfer(response.data)
      } catch (api_error) {
        setError(api_error)
      }
  }

    if(quote) {
      const body = {
        targetAccount: target_account,
        quote: quote.id,
        customerTransactionId: uuid(),
        details: {
          reference: contract_name,
        }
      }
    createTransfer(body)
    }
  }, [quote])

  // Steap 3: fund a transfer

  useEffect( () => {
    const fundTransfer = async (body:any) => {
      try {
        const response = await API('POST', `v3/profiles/${profile_id}/transfers/${transfer.id}/payments`, body)
        setFund(response.data)
      } catch (api_error) {
        setError(api_error)
      }
  }

    if(transfer) {
      const body = {
        type: "BALANCE"
      }

      fundTransfer(body)
    }
  }, [transfer])
  
  return(
    <Admin>
      <div id="AutoPayout">
        <div className="title is-4" >Auto Payout Process</div>
            <div className="columns is-multiline">
              <div className="column is-one-third">
                <div className="card">
                <header className="card-header">
                  <p className="card-header-title">
                    Quote
                  </p>
                </header>
                <div className="card-content">
                  <div className="content">
                    <QuoteContent quote={quote}/>
                  </div>
                </div>
              </div>
              </div>
              <div className="column is-one-third">
                <div className="card">
                <header className="card-header">
                  <p className="card-header-title">
                    Transfer
                  </p>
                </header>
                <div className="card-content">
                  <TransferContent transfer={transfer} quote={quote}/>
                </div>
              </div>
              </div>
              <div className="column is-one-third">
                <div className="card">
                <header className="card-header">
                  <p className="card-header-title">
                    Fund
                  </p>
                </header>
                <div className="card-content">
                  <FundContent fund={fund} transfer={transfer}/>
                </div>
              </div>
              </div>
          </div>
      </div>
    </Admin>
  )
}

export default AutoPayout