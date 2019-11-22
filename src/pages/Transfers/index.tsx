import React, { useEffect, useState } from "react";
import API from "api";
import status_translate from 'utils/translations'
import Admin from "pages/Admin";

const Transfers: React.FC = () => {
  const [transfers, setTransfers] = useState();
  const [error, setError] = useState("");
  console.log(error)
  useEffect(() => {
    const getTransfers = async () => {
      try {
        const response = await API("GET", "v1/transfers?offset=0&limit=100");
        setTransfers(response.data.reverse());
      } catch (api_error) {
        setError(api_error);
      }
    };

    getTransfers();
  }, []);

  return (
    <Admin>
      <div id="Transfers">
        <div className="title is-4">Transfers</div>
        {
          !transfers || transfers.length === 0 ?
            <div className="columns">
                <div className="column">
                  <div className="card">
                    <header className="card-header">
                      <p className="card-header-title">
                        {
                          !transfers ?
                          'Loading ...' : 'No transfer available'
                        }
                      </p>
                    </header>
                  </div>
                </div>
              </div>
          : ''
        }
        {transfers &&
          transfers.map((transfer : any, key : any) => {
            return (
              <div key={key} className="columns">
                <div className="column">
                  <div className="card">
                    <header className="card-header">
                      <p className="card-header-title">{transfer.reference}</p>
                    </header>
                    <div className="card-content">
                      <div className="content">
                        <div className="title is-6 has-text-weight-light">Target Amount:</div>
                        <div className="subtitle is-3 has-text-weight-medium">{transfer.targetValue}</div>
                        <div className="is-6 has-text-weight-light">Source Currency: <span className="has-text-weight-medium">{transfer.sourceCurrency} </span></div>
                        <div className="is-6 has-text-weight-light">Source Value : <span className="has-text-weight-medium">{transfer.sourceValue} </span></div>
                        <div className="is-6 has-text-weight-light">Target Currency: <span className="has-text-weight-medium">{transfer.targetCurrency} </span></div>
                        <div className="is-6 has-text-weight-light">Target Value: <span className="has-text-weight-medium">{transfer.targetValue} </span></div>
                        <div className="is-6 has-text-weight-light">Fee: <span className="has-text-weight-medium">{transfer.rate} </span></div>
                        <div className="is-6 has-text-weight-light">Status: <span className="has-text-weight-medium">{status_translate[transfer.status]} </span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </Admin>
  );
};

export default Transfers;
