import CompanyGoals from '../models/CompanyGoals.js';

export const getCurrentCompanyGoals = async (req, res) => {
  try {
    const goals = await CompanyGoals.find();
    if (!goals)
      return res.status(404).send({ msg: 'Цели компании еще не установлены' });

    const nonArchivedGoals = goals.find((goal) => goal.archived === false);
    if (!nonArchivedGoals)
      return res.status(404).send({ msg: 'Все цели находятся в Архиве.' });

    return res.status(200).send(nonArchivedGoals);
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
      goals: goals.goals.filter((g) => g.id !== currentGoalId),
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
    const { newGoal, goalId } = req.body;
    const { id } = req.params;
    const goal = await CompanyGoals.findById(id);
    if (!goal) return res.status(404).send({ msg: 'Цель компании не найдена' });

    const editedGoal = goal.goals.find((i) => i.id === goalId);
    if (!editedGoal)
      return res.status(404).send({ msg: 'Такая цель не найдена' });
    editedGoal.goal = newGoal;

    await goal.updateOne({
      goals: goal.goals.map((item) => (item.id !== goalId ? item : editedGoal)),
    });
    await goal.save();

    return res.status(200).send({ msg: 'Цель обновлена' });
  } catch (err) {
    return res
      .status(500)
      .send({ msg: 'Проблемы при редактировании целей компании' });
  }
};

// export const archivedCompanyGoal = async(req,res) => {
//   try{

//   }
// }

export const isCompleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentGoalId } = req.body;

    const goal = await CompanyGoals.findById(id);
    if (!goal) return res.status(404).send({ msg: 'Цель компании не найдена' });
    const editedGoal = goal.goals.find((gl) => gl.id === currentGoalId);
    if (!editedGoal) return res.status(404).send({ msg: 'Цель не найдена' });
    editedGoal.complete = !editedGoal.complete;

    await goal.updateOne({
      goals: goal.goals.map((item) =>
        item.id !== currentGoalId ? item : editedGoal
      ),
    });
    await goal.save();

    return res.status(200).send({ msg: 'Выполнение цели обновлено' });
  } catch (err) {
    return res
      .status(500)
      .send({ msg: 'Проблемы при обновлении статуса цели' });
  }
};

export const getArchivedGoals = async (req, res) => {
  try {
    const goals = await CompanyGoals.find();
    if (!goals) return res.status(404).send({ msg: 'Целей не найдено' });

    const archivedGoals = goals.filter((g) => g.archived === true);
    if (!archivedGoals)
      return res.status(204).send({ msg: 'Архивированых целей пока нет.' });
    return res.status(200).send(archivedGoals);
  } catch (err) {
    return res.status(500).send({
      msg: 'Проблемы с сервером, не получилось получить архивированые цели',
    });
  }
};
