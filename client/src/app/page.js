"use client";
import { MultiSectionDigitalClock } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import {
  useGetScheduleQuery,
  usePostScheduleMutation,
} from "./redux/reducers/goSchedule";
import Swal from "sweetalert2";
import InputSchedule from "./components/inputSchedule";
import { useGetTellMyDayQuery } from "./redux/reducers/goGPTRequest";
import Typewriter from "typewriter-effect";
import Agenda from "./components/agenda";
import ModalComp from "./utils/modal";
import agenda from "./assets/images/agenda.svg";
import Image from "next/image";
import PromptName from "./components/promptName";

export const DATA_VARIABLE = Object.freeze({
  clock: "timeClock",
  text: "textData",
});

export default function Home() {
  const initialValue = {
    time: "",
    text: "",
  };
  const [inputData, setInputData] = useState(initialValue);
  const [time, setTime] = useState(dayjs());
  const [schedules, setSchedules] = useState();
  const [readingSchedule, setReadingSchedule] = useState();
  const [name, setName] = useState("");
  const [error, setError] = useState({});

  //MODAL STATES
  const [showAgenda, setShowAgenda] = useState(false);
  const [show, setShow] = useState(false);

  //QUERIES
  const [skip, setSkip] = useState(true);
  const { data, refetch } = useGetScheduleQuery();
  const { data: scheduleReading, isFetching } = useGetTellMyDayQuery(name, {
    skip: skip,
  });
  //MUTATIONS
  const [postSchedule] = usePostScheduleMutation();

  //USEEFFECT
  useEffect(() => {
    checkUser();
  }, [name]);

  useEffect(() => {
    if (data) {
      setSchedules(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (scheduleReading) {
      setReadingSchedule(scheduleReading.data);
      setSkip(true);
      refetch();
    }
  }, [scheduleReading]);

  const checkUser = () => {
    const user = localStorage.getItem("user");
    if (user) setName(user);
    else setShow(true);
  };

  const handleChange = (e) => {
    if (e?.target?.name === DATA_VARIABLE.text) {
      setInputData({ ...inputData, text: e.target.value });
    } else {
      setTime(e);
      setInputData({ ...inputData, time: e.$d });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputData.time || !inputData.text) {
      validateInputs();
      Swal.fire({
        title: "Oops!",
        text: "Please, fullfill the input and the date before submit something",
      });
    } else {
      const newDataSchedule = schedules.length
        ? [...schedules, inputData]
        : [inputData];
      postSchedule(newDataSchedule)
        .then((result) => {
          if (result.data.message) {
            Swal.fire({
              title: "Schedule",
              icon: "success",
              text: "Schedule was successfull updated",
              confirmButtonText: "ok",
            });
            setInputData(initialValue);
            refetch();
          } else {
            Swal.fire({
              title: "Schedule",
              icon: "error",
              text: "Cannot add the new Schedule",
              confirmButtonText: "ok",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleReading = (e) => {
    e.preventDefault();
    if (name && schedules.length) setSkip(false);
    if (!schedules.length) {
      Swal.fire({
        title: "Oops!",
        text: "Add something to your agenda",
      });
    }
    if (!name) setShow(true);
  };

  const handleClose = () => {
    setShowAgenda(false);
    setShow(false);
  };

  const validateInputs = async () => {
    const errorcheck = { ...error };
    if (!inputData.time) {
      console.log("Entre time");
      errorcheck.time = true;
    } else {
      errorcheck.time = false;
    }
    if (!inputData.text) {
      console.log("Entre text");
      errorcheck.text = true;
    } else {
      errorcheck.text = false;
    }
    console.log(errorcheck);
    setError(errorcheck);
  };

  return (
    <main className={styles.main}>
      <header>
        <h3>Schedule Me</h3>
      </header>
      <section>
        <MultiSectionDigitalClock
          value={time}
          className={`${styles.multiClock} ${error?.time && styles.errorBlur}`}
          name={DATA_VARIABLE.time}
          onChange={handleChange}
          onBlur={validateInputs}
        />
      </section>
      <section className="containerDescribeText"></section>
      <InputSchedule
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleReading={handleReading}
        schedules={schedules}
        data={inputData}
        validateInputs={validateInputs}
        error={error}
      />
      <section className={styles.containerReading}>
        {isFetching ? (
          <span>Loading Reading...</span>
        ) : (
          readingSchedule && (
            <Typewriter
              options={{
                autoStart: true,
                delay: 50,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(readingSchedule.replace(/\./g, "<br>"))
                  .callFunction(() => {
                    setShowAgenda(true);
                  })
                  .start();
              }}
            />
          )
        )}
      </section>
      {readingSchedule && (
        <button
          className={styles.showAgendaButton}
          onClick={(e) => {
            e.preventDefault();
            setShowAgenda(true);
          }}>
          <Image src={agenda} width={32} alt="Follow us on Twitter" />
        </button>
      )}
      <ModalComp
        size={"md"}
        show={showAgenda}
        title={"Agenda"}
        handleClose={handleClose}
        component={<Agenda data={schedules} />}
      />
      <ModalComp
        size={"md"}
        show={show}
        title={"Hello!"}
        component={
          <PromptName setShow={setShow} name={name} setName={setName} />
        }
        handleClose={handleClose}
      />
    </main>
  );
}
