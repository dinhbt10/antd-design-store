import React, { useCallback, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

const fakeData = [
  {
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2023, 11, 1),
    end: new Date(2023, 11, 2),
    status: "bug",
    colorText: "bug",
  },
  {
    title: "Long Event",
    start: new Date(2023, 11, 7),
    end: new Date(2023, 11, 10),
    status: "subTask",
    colorText: "subTask",
  },
  {
    title: "DTS STARTS",
    start: new Date(2023, 11, 13, 0, 0, 0),
    end: new Date(2023, 11, 20, 0, 0, 0),
    status: "subTask",
    colorText: "subTask",
  },
  {
    title: "DTS ENDS",
    start: new Date(2023, 11, 6, 0, 0, 0),
    end: new Date(2023, 11, 13, 0, 0, 0),
    status: "bug",
    colorText: "bug",
  },
  {
    title: "Some Event",
    start: new Date(2023, 11, 9, 0, 0, 0),
    end: new Date(2023, 11, 9, 0, 0, 0),
    status: "subTask",
    colorText: "subTask",
  },
  {
    title: "Conference",
    start: new Date(2023, 11, 11),
    end: new Date(2023, 11, 13),
    desc: "Big conference for important people",
    status: "subTask",
    colorText: "subTask",
  },
  {
    title: "Meeting",
    start: new Date(2023, 11, 12, 10, 30, 0, 0),
    end: new Date(2023, 11, 12, 12, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting",
    status: "subTask",
    colorText: "subTask",
  },
  {
    title: "Lunch",
    start: new Date(2023, 11, 12, 12, 0, 0, 0),
    end: new Date(2023, 11, 12, 13, 0, 0, 0),
    desc: "Power lunch",
    status: "task",
    colorText: "task",
  },
  {
    title: "Meeting",
    start: new Date(2023, 11, 12, 14, 0, 0, 0),
    end: new Date(2023, 11, 12, 15, 0, 0, 0),
    status: "task",
    colorText: "task",
  },
  {
    title: "Happy Hour",
    start: new Date(2023, 11, 13, 17, 0, 0, 0),
    end: new Date(2023, 11, 15, 17, 30, 0, 0),
    desc: "Most important meal of the day",
    status: "bug",
    colorText: "bug",
  },
  {
    title: "Dinner",
    start: new Date(2023, 11, 17, 20, 0, 0, 0),
    end: new Date(2023, 11, 19, 21, 0, 0, 0),
    status: "task",
    colorText: "task",
  },
  {
    title: "Birthday Party",
    start: new Date(2023, 11, 13, 7, 0, 0),
    end: new Date(2023, 11, 13, 10, 30, 0),
    status: "task",
    colorText: "task",
  },
  {
    title: "Birthday Party 2",
    start: new Date(2023, 11, 13, 7, 0, 0),
    end: new Date(2023, 11, 13, 10, 30, 0),
    status: "bug",
    colorText: "bug",
  },
  {
    title: "Birthday Party 3",
    start: new Date(2023, 11, 13, 7, 0, 0),
    end: new Date(2023, 11, 13, 10, 30, 0),
    status: "task",
    colorText: "task",
  },
  {
    title: "Late Night Event",
    start: new Date(2023, 11, 17, 19, 30, 0),
    end: new Date(2023, 11, 18, 2, 0, 0),
    status: "task",
    colorText: "task",
  },
  {
    title: "Multi-day Event",
    start: new Date(2023, 11, 20, 19, 30, 0),
    end: new Date(2023, 11, 22, 2, 0, 0),
    status: "task",
    colorText: "task",
  },
];

const CustomToolbar = (toolbar) => {
  const [selectDate, setSelectDate] = useState();
  const goToBackOrNext = (step) => {
    if (step === "PREV") {
      toolbar.onNavigate("PREV");
    } else {
      toolbar.onNavigate("NEXT");
    }
  };

  const handleChange = (e) => {
    setSelectDate(e);
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button
          type="button"
          style={{ border: "none" }}
          onClick={() => goToBackOrNext("PREV")}
        >
          <LeftOutlined />
        </button>
        <button
          type="button"
          style={{ border: "none" }}
          onClick={() => goToBackOrNext("NEXT")}
        >
          <RightOutlined />
        </button>
      </span>
      <span className="rbc-toolbar-label">{toolbar.label}</span>
      <RangePicker onCalendarChange={handleChange} />
    </div>
  );
};

const CalendarPage = () => {
  const localizer = dayjsLocalizer(dayjs);
  const handleSelectEvent = (value) => {
    console.log(value);
  };

  const onShowMore = useCallback((events, date) => {
    console.log(events, date);
  }, []);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={fakeData}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "80vh" }}
        views={["month"]}
        components={{ toolbar: CustomToolbar }}
        onSelectEvent={handleSelectEvent}
        onShowMore={onShowMore}
        eventPropGetter={(myEventsList) => {
          const backgroundColor =
            myEventsList.status === "bug"
              ? "#F5B7B1"
              : myEventsList.status === "subTask"
              ? "#ABEBC6"
              : "#F9E79F";
          const color =
            myEventsList.colorText === "bug"
              ? "#E74C3C"
              : myEventsList.colorText === "subTask"
              ? "#28B463"
              : "#D4AC0D";
          return { style: { backgroundColor, color } };
        }}
      />
    </div>
  );
};

export default CalendarPage;
