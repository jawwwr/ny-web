import React, { useState, useEffect } from "react";
import API from "api";
import scheduledPayout from "services";
import ReactDateTime, { DatetimepickerProps } from "react-datetime";
import moment from "moment";
import {
  writeStorage,
  useLocalStorage,
  deleteFromStorage
} from "@rehooks/local-storage";
import Admin from "pages/Admin";
import { contracts } from "constants/index";
import "./styles.scss";

const profile_id = "11319295";

const TypedReactDateTime = ReactDateTime as React.ComponentType<
  DatetimepickerProps & {
    renderInput?: (
      props: any,
      openCalendar: () => void,
      closeCalendar: () => void
    ) => void;
  }
>;

const DTPInput = (props: any, openCalendar: any, closeCalendar: any) => {
  const now = () => {
    props.onChange({ target: { value: moment().format("MM/DD/YYYY HH:mm") } });
  };
  return (
    <div className="field has-addons">
      <div className="control is-expanded">
        <input {...props} />
      </div>
      <div className="control">
        <button className="button" onClick={now}>
          Now
        </button>
      </div>
    </div>
  );
};

const Contract = ({ contract, activeContract, onClick }: any) => {
  return (
    <div className="column is-one-quarter" onClick={() => onClick(contract)}>
      <div
        className={`card ${
          activeContract && activeContract.id === contract.id ? "active" : ""
        }`}
      >
        <div className="card-content">
          <p className="title is-5">{contract.name}</p>
          <p className="subtitle is-7">Contract Name</p>
          {contract.people &&
            contract.people.map((person: any, key: any) => {
              return (
                <div key={key} className="">
                  <div className="">
                    <p className="title is-6">
                      {person.recipient.amount || "00"}:{" "}
                      {person.recipient.currency}
                    </p>
                    <p className="subtitle is-7">ID: {person.recipient.id}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const ScheduleCreate: React.FC = () => {
  const [account_balances, setAccountBalances] = useState();
  const [error, setError] = useState("");
  const [schedules]: any = useLocalStorage("schedules");
  const [rdtValue, setRdtValue] = useState();
  const [activeContract, setActiveContract] = useState();
  const [balanceSource, setBalanceSource] = useState();
  const [errors, setErrors] = useState();

  useEffect(() => {
    const getAccountBalances = async () => {
      try {
        const response = await API(
          "GET",
          `v1/borderless-accounts?profileId=${profile_id}`
        );
        setAccountBalances(response.data);
      } catch (api_error) {
        setError(api_error);
      }
    };
    getAccountBalances();
  }, []);

  const runSchedule = (schedule: any) => {
    const to_mils = moment(schedule.time, "MM/DD/YYYY HH:mm");
    const now = moment().format("MM/DD/YYYY HH:mm");
    const time = to_mils.diff(now);
    if (time >= 0) {
      setTimeout(function() {
        scheduledPayout(schedule);
      }, time);
    }
  };

  const setSchedule = () => {
    console.log(rdtValue);
    console.log(activeContract);
    console.log(balanceSource);
    if (!rdtValue || !activeContract || !balanceSource) {
      setErrors("All data are required, contract, source and date schedule");
      return;
    }

    const new_sched = {
      time: rdtValue,
      contract: activeContract,
      source: balanceSource
    } as any;
    const copy_schedule: any = schedules || [];
    copy_schedule.push(new_sched);
    writeStorage("schedules", copy_schedule);
    runSchedule(new_sched);
    setErrors("");
    setRdtValue(null);
    setActiveContract(null);
    setBalanceSource(null);
  };

  useEffect(() => {
    setErrors("");
  }, [activeContract, balanceSource]);

  useEffect(() => {
    schedules &&
      schedules.map((schedule: any, key: any) => {
        runSchedule(schedule);
      });
  }, [schedules]);

  return (
    <Admin>
      <div className="title is-4">Schedule Create</div>
      <div className="title is-5">Contracts</div>
      <div className="columns is-multiline">
        {contracts &&
          contracts.map((contract, key) => {
            return (
              <Contract
                key={key}
                contract={contract}
                activeContract={activeContract}
                onClick={setActiveContract}
              />
            );
          })}
      </div>
      <div className="title is-5">Select Source</div>
      <div className="columns source-mny">
        {account_balances &&
          account_balances[0].balances.map((balance: any, key: any) => {
            return (
              <div
                key={key}
                className={`card ${
                  balanceSource && balanceSource.id === balance.id
                    ? "active"
                    : ""
                }`}
                onClick={() => setBalanceSource(balance)}
              >
                <div className="card-content">
                  <div className="title is-5">{balance.currency}</div>
                  <div className="subtitle is-7">{balance.amount.value}</div>
                </div>
              </div>
            );
          })}
      </div>
      <br />
      <div className="columns">
        <div className="column">
          <div className="title is-5 schd">Date Schedule</div>
          <TypedReactDateTime
            className="react-datetime"
            inputProps={{ className: "input", placeholder: "MM/DD/YYYY HH:mm" }}
            renderInput={DTPInput}
            timeFormat="HH:mm"
            value={rdtValue}
            onChange={value => {
              if (moment(value) instanceof moment) {
                if (
                  moment(value).format("MM/DD/YYYY HH:mm") !== "Invalid date"
                ) {
                  setRdtValue(moment(value).format("MM/DD/YYYY HH:mm"));
                }
              } else {
                setRdtValue(rdtValue);
              }
            }}
          />
          <br />
          {errors && errors ? (
            <div className="title is-7 has-text-danger has-text-small has-text-italic">
              {errors}
            </div>
          ) : (
            ""
          )}
          <button className="button is-primary" onClick={() => setSchedule()}>
            Set Schedule
          </button>
        </div>
        <div className="column"></div>
      </div>
    </Admin>
  );
};

export default ScheduleCreate;
