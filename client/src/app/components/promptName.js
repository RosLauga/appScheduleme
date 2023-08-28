import { useState } from "react";
import style from "./promptName.module.css";

const PromptName = ({ setShow, setName }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", input);
    setName(input);
    setShow(false);
  };

  return (
    <>
      <form className={style.containerForm} onSubmit={handleSubmit}>
        <input
          type="text"
          className={style.inputNameText}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Let us now your name..."
        />
        <button className={style.buttonSubmit} type="submit">
          SAVE
        </button>
      </form>
    </>
  );
};

export default PromptName;
