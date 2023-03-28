export const getCurrentCompanyGoals = async (req, res) => {
  try {
    const body = req.body;

    return res.status(200).send({ data: 'SomeData' });
  } catch (err) {
    return res.status(500).send({ msg: 'Server error' });
  }
};
