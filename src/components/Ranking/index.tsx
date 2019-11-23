import React from 'react'
import { Link } from "react-router-dom";

const RankingCard = (props :any) => {
  const { ranking } = props
  return(
        <div className="card large round">
          <div className="card-content">
            <div className="content">
              <div className="subtitle is-4">
                Ranking
              </div>
              <table>
                <thead>
                  <th>Ranked</th>
                  <th>Name</th>
                  <th>Points</th>
                </thead>
                <tbody>

                {
                  !ranking ? ranking.map((rank:any, key:any) => {
                    return(
                      <tr>
                      <td>{key+1}</td>
                      <td>{rank.user.name}</td>
                      <td>{rank.points}</td>
                    </tr>
                    )
                  }) : 'No Ranking Yet'
                }
                </tbody>

              </table>
            </div>
          </div>
        </div>
  )
}

export default RankingCard