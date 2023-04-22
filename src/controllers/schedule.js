import { Employee } from '../models/Employee.js';

export const createSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { month, date, custom, schedule } = req.body;

    const employee = await Employee.findById(id);
    if (!employee)
      return res.status(404).send({ msg: 'Співробітника не знайдено' });

    const isSchedule = employee.schedule.find((m) => m.hasOwnProperty(month));

    if (!isSchedule) {
      const newMonthData = {
        [month]: [
          {
            date,
            schedule: schedule !== 'custom' ? schedule : custom,
            dayWorked: false,
            dayWorkedCount: 0,
          },
        ],
      };

      await employee.updateOne({
        schedule: [...employee.schedule, newMonthData],
      });
      return res.status(200).send({ msg: 'Графік створено.' });
    }

    const monthDataIndex = employee.schedule.findIndex((m) =>
      m.hasOwnProperty(month)
    );
    const updatedData = JSON.parse(
      JSON.stringify(employee.schedule[monthDataIndex])
    );
    const isDay = updatedData[month].find((day) => day.date === date);
    if (isDay)
      return res
        .status(401)
        .send({ msg: 'Така дата вже встановлена. Можно тільки редагувати.' });

    updatedData[month].push({
      date,
      schedule: schedule !== 'custom' ? schedule : custom,
      dayWorked: false,
      dayWorkedCount: 0,
    });

    await employee.updateOne({
      $set: { [`schedule.${monthDataIndex}`]: updatedData },
    });

    return res.status(200).send({ msg: 'Графік створено.' });
  } catch (err) {
    return res
      .status(500)
      .send({ msg: 'Помилка серверу при створенні графіку.' });
  }
};

export const editEmployeeScheduleDay = async (req, res) => {
  try {
  } catch (err) {
    return res
      .status(500)
      .send({ msg: 'Помилка серверу при редагуванні графіку' });
  }
};
