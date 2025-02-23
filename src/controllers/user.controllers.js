const catchError = require("../utils/catchError");
const User = require("../models/User");

const getAll = catchError(async (_, res) => {
  const users = await User.findAll();
  return res.json(users);
});

const create = catchError(async (req, res) => {
  const { first_name, last_name, email, password, birthday, image_url } = req.body;
  const user = await User.create({
    first_name,
    last_name,
    email,
    password,
    birthday,
    image_url,
  });
  return res.status(201).json(user);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  return res.json(user);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, password, birthday, image_url } = req.body;

  const user = await User.update(
    {
      first_name,
      last_name,
      email,
      password,
      birthday,
      image_url,
    },
    { where: { id }, returning: true }
  );
  return res.json(user[1][0]);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id } });
  return res.sendStatus(204);
});

module.exports = {
  getAll,
  create,
  getOne,
  update,
  remove,
};
