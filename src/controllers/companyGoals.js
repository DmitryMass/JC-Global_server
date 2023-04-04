import CompanyGoals from '../models/CompanyGoals.js';

export const getCurrentCompanyGoals = async (req, res) => {
  try {
    const goals = await CompanyGoals.find({ archived: false });
    if (!goals.length)
      return res.status(404).send({
        msg: 'Цели компании еще не установлены или находятся в архиве',
      });

    return res.status(200).send(goals);
  } catch (err) {
    return res
      .status(500)
      .send({ msg: 'Проблемы с сервером при получении целей компании' });
  }
};

export const createCompanyGoals = async (req, res) => {
  try {
    // Goals будет массив обьектов {goal: 'Somegoal', complete:false}
    // отпралвеный через formdData при помощи JSON.stringify([...goals])
    const { month, goals, id } = req.body;
    const currGoal = await CompanyGoals.findById(id);

    if (!currGoal) {
      const newGoal = new CompanyGoals({
        month,
        goals: JSON.parse(goals),
      });
      await newGoal.save();
      return res.status(200).send(newGoal);
    }

    await currGoal.updateOne({
      goals: [...currGoal.goals, ...JSON.parse(goals)],
    });
    await currGoal.save();

    return res.status(200).send({ msg: 'Новая цель добавлена' });
  } catch (err) {
    return res
      .status(500)
      .send({ msg: `Проблемы с сервером при создании целей компании` });
  }
};

export const deleteCompanyGoals = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentGoalId } = req.body;
    const goals = await CompanyGoals.findById(id);
    if (!goals)
      return res.status(404).send({ msg: 'Целей с текущим ID не найдено' });

    await goals.updateOne({
      goals: goals.goals.filter((g) => g.id.toString() !== currentGoalId),
    });

    await goals.save();
    return res.status(200).send({ msg: 'Цель удалена' });
  } catch (err) {
    return res
      .status(500)
      .send({ msg: `Проблемы с сервером при удалении целей компании` });
  }
};

export const editCompanyGoals = async (req, res) => {
  try {
    const { newGoal, goalId, status = false } = req.body;
    const { id } = req.params;
    const goal = await CompanyGoals.findById(id);
    if (!goal) return res.status(404).send({ msg: 'Цель компании не найдена' });

    const editedGoal = goal.goals.find((i) => i.id.toString() === goalId);

    if (!editedGoal) {
      return res.status(404).send({ msg: 'Такая цель не найдена' });
    }

    if (newGoal) {
      editedGoal.goal = newGoal;
      editedGoal.complete = status;
      await goal.updateOne({
        goals: goal.goals.map((item) =>
          item.id.toString() !== goalId ? item : editedGoal
        ),
      });
      await goal.save();
      return res.status(200).send({ msg: 'Цель обновлена' });
    }

    editedGoal.complete = status;
    await goal.updateOne({
      goals: goal.goals.map((item) =>
        item.id.toString() !== goalId ? item : editedGoal
      ),
    });
    await goal.save();
    return res.status(200).send({ msg: 'Цель обновлена' });
  } catch (err) {
    return res
      .status(500)
      .send({ msg: 'Проблемы при редактировании целей компании' });
  }
};

export const archivedCompanyGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const goals = await CompanyGoals.findById(id);
    if (!goals) return res.status(404).send({ msg: 'Целей не найдено' });
    await goals.updateOne({
      archived: !goals.archived,
    });
    await goals.save();

    return res.status(202).send({ msg: 'Успех!' });
  } catch (err) {
    return res
      .status(500)
      .send({ msg: 'Проблемы с сервером, не получилось архивировать цель' });
  }
};
export const getArchivedGoals = async (req, res) => {
  try {
    const goals = await CompanyGoals.find({ archived: true });
    if (!goals.length) return res.status(404).send({ msg: 'Целей не найдено' });

    return res.status(200).send(goals);
  } catch (err) {
    return res.status(500).send({
      msg: 'Проблемы с сервером, не получилось получить архивированые цели',
    });
  }
};
