const { readFileSync, writeFileSync } = require("fs");
require("../schedule/schedule.json");

const controllerSchedule = {};

controllerSchedule.getSchedule = async (req, res) => {
  try {
    const scheduleData = readFileSync("schedule/schedule.json");
    const dataParse = JSON.parse(scheduleData);
    res.status(200).json({ message: "Schedule", data: dataParse });
  } catch (err) {
    res.status(200).json({ error: "Schedule doesnt found" });
  }
};

controllerSchedule.postSchedule = async (req, res) => {
  const schedule = req.body;
  try {
    const newarray = [...schedule];
    const newSort = newarray.sort((a, b) => {
      let date1 = new Date(a.time);
      let date2 = new Date(b.time);
      if (date1.getTime() < date2.getTime()) {
        return -1;
      }
    });
    const newSchedule = writeFileSync(
      "schedule/schedule.json",
      JSON.stringify(newSort)
    );
    res.status(200).json({ message: "Schedule Updated" });
  } catch (err) {
    res.status(200).json({ error: "No se ha podido guardar la agenda" });
  }
};

module.exports = controllerSchedule;
