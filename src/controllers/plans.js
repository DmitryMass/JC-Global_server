import { Employee } from '../models/Employee.js';

export const createOrUpdateEmployeePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { frontPlan = '0', backPlan = '0', month } = req.body;

    const employee = await Employee.findById(id);
    if (!employee)
      return res.status(404).send({ msg: 'Співробітника не знайдено' });

    console.log(employee);
    const plan = await employee.plans.find((item) => item.month === month);

    if (!plan) {
      await employee.updateOne({
        plans: [
          ...employee.plans,
          {
            month,
            front: { plan: frontPlan, active: '0' },
            back: { plan: backPlan, active: '0' },
          },
        ],
      });
      return res.status(200).send({ msg: `Новий план на ${month} створено.` });
    }

    if (frontPlan !== '0' && backPlan !== '0') {
      plan.front.plan = frontPlan;
      plan.back.plan = backPlan;
      await employee.updateOne({
        plans: employee.plans.map((item) =>
          item.month === month ? plan : item
        ),
      });
      return res
        .status(200)
        .send({ msg: `Оновлено план по бекенду и фронтенду на ${month}` });
    }

    if (frontPlan !== '0' && backPlan === '0') {
      plan.front.plan = frontPlan;
      await employee.updateOne({
        plans: employee.plans.map((item) =>
          item.month === month ? plan : item
        ),
      });
      return res
        .status(200)
        .send({ msg: `Оновлено план по фронтенду на ${month}` });
    }

    if (backPlan !== '0' && frontPlan === '0') {
      plan.back.plan = backPlan;
      await employee.updateOne({
        plans: employee.plans.map((item) =>
          item.month === month ? plan : item
        ),
      });
      return res
        .status(200)
        .send({ msg: `Оновлено план по бекенду на ${month}` });
    }

    if (frontPlan === '0' && backPlan === '0') {
      plan.front.plan = frontPlan;
      plan.back.plan = backPlan;
      await employee.updateOne({
        plans: employee.plans.map((item) =>
          item.month === month ? plan : item
        ),
      });
      return res
        .status(200)
        .send({ msg: `Оновлено план по бекенду и фронтенду на ${month}` });
    }
  } catch (err) {
    return res.status(500).send({
      msg: 'Проблеми з сервером. Не вдалося оновити або створити план.',
    });
  }
};
