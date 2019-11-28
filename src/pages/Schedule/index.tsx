import React from "react";
import moment from "moment";
import { deleteFromStorage, useLocalStorage } from "@rehooks/local-storage";
import Admin from "pages/Admin";
import "./styles.scss";

const Schedule: React.FC = () => {
  const [schedules]: any = useLocalStorage("schedules");

  console.log(schedules);
  return (
    <Admin>
      <div className="title is-4">Schedules</div>
      {schedules &&
        schedules.map((schedule: any, key: any) => {
          return (
            <div key={key}>
              <div className="card">
                <div className="card-content">
                  <div className="columns">
                    <div className="column">
                      <div className="title is-6">{schedule.contract.name}</div>
                      <div className="subtitle is-7">Contract</div>
                    </div>
                    <div className="column">
                      <div className="title is-6">
                        {schedule.contract.people[0].recipient.amount}{" "}
                        {schedule.contract.people[0].recipient.currency}
                      </div>
                      <div className="subtitle is-7">Amount</div>
                    </div>
                    <div className="column">
                      <div className="title is-6">
                        {schedule.source.amount.value}{" "}
                        {schedule.source.amount.currency}
                      </div>
                      <div className="subtitle is-7">Source</div>
                    </div>
                    <div className="column">
                      <div className="title is-6">{schedule.time}</div>
                      <div className="subtitle is-7">Date</div>
                    </div>
                    <div className="column">
                      <div className="title is-6">
                        {moment(schedule.time, "MM/DD/YYYY HH:mm").diff(
                          moment().format("MM/DD/YYYY HH:mm")
                        ) <= 0 ? (
                          <span className="has-text-success">Done</span>
                        ) : (
                          <span className="has-text-danger">Pending</span>
                        )}
                      </div>
                      <div className="subtitle is-7">Status</div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
            </div>
          );
        })}
    </Admin>
  );
};

export default Schedule;
