const { default: axios } = require("axios");
const { readFileSync } = require("fs");
require("dotenv").config();

const controllersGPT = {};

controllersGPT.getReading = async (req, res) => {
  const { name } = req.query;

  const descriptiveText = `Puedes leerme este listado pero, primero diciendo una sola vez, 'Hola ${name}', luego decir, para el día de (leer 'time' sólo los 10 primeros caracteres) y la hora (leer los ultimos 8 caraceres de 'time'), luego dices=tienes esto agendado' y lees el texto marcado en 'text' `;

  const scheduleData = readFileSync("schedule/schedule.json");

  const scheduleParse = JSON.parse(scheduleData);

  let parseTimeToRead = [...scheduleParse];

  parseTimeToRead.forEach((element) => {
    element.time = new Date(element.time).toLocaleString();
  });
  const dataText = JSON.stringify(parseTimeToRead) + " " + descriptiveText;

  const data = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: dataText }],
  };
  console.log("Texto a leer", dataText);
  axios
    .post(process.env.URL_OPENAI, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    })
    .then((result) => {
      if (result.data) {
        // console.log("CHAT DICE", result.data);
        res.status(200).json({
          message: "Reading",
          data: result.data.choices[0].message.content,
        });
      }
    })
    .catch((err) => console.log("Error", err));
};
module.exports = controllersGPT;
