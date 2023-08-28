import style from "./agenda.module.css";

const Agenda = ({ data }) => {
  return (
    <div className={style.containerAgenda}>
      <ul>
        {data &&
          data.map((item, index) => {
            return (
              <>
                <li key={index}>
                  {new Date(item.time).toLocaleString()}: {item.text}
                </li>
              </>
            );
          })}
      </ul>
    </div>
  );
};

export default Agenda;
