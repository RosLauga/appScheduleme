import { DATA_VARIABLE } from "../page";
import style from "./inputSchedule.module.css";

const InputSchedule = ({
  handleChange,
  handleSubmit,
  data,
  handleReading,
  validateInputs,
  error,
}) => {
  return (
    <form className={style.formSubmit}>
      <input
        className={`${style.inputDescribeText} ${
          error.text && style.errorBlur
        }`}
        type="text"
        name={DATA_VARIABLE.text}
        onChange={handleChange}
        onBlur={validateInputs}
        placeholder="Write something..."
        value={data.text}
      />
      <div className={style.containerButtons}>
        <button
          onClick={handleSubmit}
          className={`${style.buttonSubmit}`}
          type="submit">
          ADD
        </button>
        <button className={style.buttonReadingSchedule} onClick={handleReading}>
          Read About my Day
        </button>
      </div>
    </form>
  );
};

export default InputSchedule;
