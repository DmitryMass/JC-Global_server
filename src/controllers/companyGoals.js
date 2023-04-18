import CompanyGoals from '../models/CompanyGoals.js';

export const getCurrentCompanyGoals = async (req, res) => {
  try {
    const goals = await CompanyGoals.find({ archived: false });
    return res.status(200).send(goals);
  } catch (err) {
    return res
      .status(500)
      .send({ msg: 'Проблеми з сервером при отриманні цілей.' });
  }
};

export const createCompanyGoals = async (req, res) => {
  try {
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

    return res.status(200).send({ msg: 'Нова ціль додана.' });
  } catch (err) {
    return res
      .status(500)
      .send({ msg: `Проблеми з сервером при створенні цілей.` });
  }
};

export const deleteCompanyGoals = async (req, res) => {
  try {
    const { id } = req.params;
    const { goalid } = req.headers;

    const goals = await CompanyGoals.findById(id);
    if (!goals) return res.status(404).send({ msg: 'Цілей не знайдено.' });

    await goals.updateOne({
      goals: goals.goals.filter((g) => g.id.toString() !== goalid),
    });

    await goals.save();
    return res.status(200).send({ msg: 'Ціль видалена.' });
  } catch (err) {
    return res
      .status(500)
      .send({ msg: `Проблеми з сервером при видаленні цілі.` });
  }
};

export const editCompanyGoals = async (req, res) => {
  try {
    const { newGoal, goalId, status = false } = req.body;
    const { id } = req.params;
    const goal = await CompanyGoals.findById(id);
    if (!goal) return res.status(404).send({ msg: 'Такої цілі не знайдено.' });

    const editedGoal = goal.goals.find((i) => i.id.toString() === goalId);

    if (!editedGoal) {
      return res.status(404).send({ msg: 'Така ціль не знайдена.' });
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
      return res.status(200).send({ msg: 'Ціль оновлена.' });
    }

    editedGoal.complete = status;
    await goal.updateOne({
      goals: goal.goals.map((item) =>
        item.id.toString() !== goalId ? item : editedGoal
      ),
    });
    await goal.save();
    return res.status(200).send({ msg: 'Ціль оновлена.' });
  } catch (err) {
    return res
      .status(500)
      .send({ msg: 'Проблеми з сервером під час редагування цілей.' });
  }
};

export const archivedCompanyGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const goals = await CompanyGoals.findById(id);
    if (!goals) return res.status(404).send({ msg: 'Цілей не знайдено' });
    await goals.updateOne({
      archived: !goals.archived,
    });
    await goals.save();

    return res.status(202).send({ msg: 'Успіх!' });
  } catch (err) {
    return res
      .status(500)
      .send({ msg: 'Проблеми з сервером, не вдалося архівувати ціль.' });
  }
};
export const getArchivedGoals = async (req, res) => {
  try {
    const goals = await CompanyGoals.find({ archived: true });
    return res.status(200).send(goals);
  } catch (err) {
    return res.status(500).send({
      msg: 'Проблеми з сервером, не вдалося отримати архівні цілі.',
    });
  }
};
