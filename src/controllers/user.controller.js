import { PrismaClient } from '@prisma/client';
//este controlador premite crear un CURD para la entidad User
const prisma = new PrismaClient();

const createUser = async (req, res) => {
  console.log('se accede a la ruta ');
  const { name, lastname, email, cellphone } = req.body;
  //verifica que no lleguen valores vacios
  if (Object.values(req.params).includes(''))
    return res.status(404).json({ msg: 'all files are required' });
  console.log('el email que llega: ', req.body.email);

  try {
    const verifiEmail = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (verifiEmail)
      return res
        .status(404)
        .send({ msg: 'The email provided is alredy registred' });

    const newUser = await prisma.user.create({
      data: {
        name,
        lastname,
        email,
        cellphone,
        profile: {
          create: {
            name: 'DIRECTOR',
          },
        },
        services: {
          create: {
            name: 'Landing Page',
            decription: 'For the sale of technologies products',
            price: 500,
            status: true,
          },
        },
      },
    });
    res.status(200).json({ res: 'New user created', data: newUser });
  } catch (error) {
    res.status(500).json({
      msg: 'There is a problem while we creating a new user:',
      error: error.message,
    });
  }
};

const listAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ res: 'Users registred', data: users });
  } catch (error) {
    res.status(500).json({
      msg: 'There is a problem while we found the list of users:',
      error: error.message,
    });
  }
};

const userById = async (req, res) => {
  //verifica que el id sea valido
  if (isNaN(parseInt(req.params.id)))
    return res.status(400).send({ msg: 'The id provided is wrong' });
  try {
    const userFind = await prisma.user.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    //verifica que el id pertenezca a un usuario
    if (!userFind)
      return res
        .status(404)
        .send({ msg: 'The id provided doesnt belong any user' });
    //Realiza la consulta
    const user = await prisma.user.findFirst({
      where: {
        id: +req.params.id,
      },
    });
    res.status(200).json({ res: 'Details of user', data: user });
  } catch (error) {
    res.status(500).json({
      msg: 'There is a problem while we located the user:',
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  //comprueba que el id sea correcto
  if (NaN(parseInt(req.params.id)))
    return res.status(400).send({ msg: 'The ID provider isnt valid' });

  const { name, lastname, email, cellphone } = req.body;
  try {
    //comprueba que encuentre al usuario con el id
    const userFind = await prisma.user.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    if (userFind)
      return res
        .status(500)
        .send({ msg: 'Sorry the ID doesnt belong to other user' });
    //comprueba el email
    const userFindWithEmail = await prisma.user.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    if (!userFindWithEmail)
      return res.status(200).send('The email provided belong to other user');
    //Actualizacion
    const userUpdated = await prisma.user.update({
      where: { id: +req.params.id },
      data: {
        name,
        lastname,
        email,
        cellphone,
      },
    });
    res.status(200).json({ res: 'User updated', data: userUpdated });
  } catch (error) {
    return res.status(500).json({
      msg: 'there is a problem withupdating a user',
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  //Comprueba que el id sea correcto
  if (isNaN(parseInt(req.params.id)))
    return res.status(400).send({ msg: 'The id provided is wrong' });

  try {
    //comprueba que el id este asignado a algun usuario
    const userFind = await prisma.user.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    if (!userFind)
      return res
        .status(500)
        .send({ msg: 'The ID provided doesnt belong to any user' });
    //elimina el usuario
    const user = await prisma.user.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(200).json({ res: 'User deleted', data: user });
  } catch (error) {
    res.status(500).json({
      res: 'There was a problems while we try to delete these file',
      error: error.message,
    });
  }
};
export { createUser, listAllUsers, userById, updateUser, deleteUser };
