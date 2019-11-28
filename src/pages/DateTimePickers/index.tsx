import React, { useState } from "react";
import ReactDateTime, { DatetimepickerProps } from "react-datetime";
import moment from "moment";
import Admin from "pages/Admin";

import "react-datetime/css/react-datetime.css";
import "./styles.scss";

const TypedReactDateTime = ReactDateTime as React.ComponentType<
  DatetimepickerProps & {
    renderInput?: (
      props: any,
      openCalendar: () => void,
      closeCalendar: () => void
    ) => void;
  }
>;

const renderDay = () => {
  return <></>;
};

const DTPInput = (props: any, openCalendar: any, closeCalendar: any) => {
  return (
    <div className="field has-addons">
      <div className="control is-expanded">
        <input {...props} />
      </div>
      <div className="control">
        <button className="button" onClick={() => {}}>
          Today
        </button>
      </div>
      <div className="control">
        <button className="button" onClick={() => {}}>
          Clear
        </button>
      </div>
    </div>
  );
};

const DTPDatePicker = (props: any, openCalendar: any, closeCalendar: any) => {
  return (
    <div className="field has-addons">
      <div className="control">
        <input {...props} />
      </div>
      <div className="control">
        <button className="button" onClick={() => {}}>
          Clear
        </button>
      </div>
    </div>
  );
};

const DateTimePickers: React.FC = () => {
  const [rdtValue, setRdtValue] = useState();
  return (
    <Admin page="date-time-picker">
      <div className="title is-4">Date Time Picker</div>
      <div className="columns">
        <div className="column">
          <div className="title is-6">YouCanBookMe/react-datetime</div>
          <div className="subtitle is-7">
            <a
              href="https://github.com/YouCanBookMe/react-datetime"
              target="_a"
            >
              Repository
            </a>
          </div>
          <TypedReactDateTime
            className="react-datetime"
            inputProps={{ className: "input", placeholder: "MM/DD/YYYY HH:mm" }}
            renderInput={DTPInput}
            timeFormat="HH:mm"
            value={rdtValue}
            onChange={value => {
              if (moment(value) instanceof moment) {
                setRdtValue(moment(value).format("MM/DD/YYYY HH:mm"));
              } else {
                setRdtValue("");
              }
            }}
          />
        </div>
        <div className="column"></div>
        <div className="column"></div>
        <div className="column"></div>
      </div>
    </Admin>
  );
};

export default DateTimePickers;
