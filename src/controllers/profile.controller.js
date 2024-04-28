import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createProfile = async (req, res) => {
  const { name } = req.body;
  //comprueba que todos se ingresen
  if (Object.values(req.params).includes(''))
    return res.status(404).res({ msg: 'All data are required' });
  try {
    const newProfile = await prisma.profile.create({
      data: { name },
    });
    res.status(200).json({ res: 'New profile created', data: newProfile });
  } catch (error) {
    res.status(500).json({
      msg: 'There is one problem with creating a profile',
      error: error.message,
    });
  }
};

const listAllProfiles = async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany();
    res.status(200).json({ res: 'Profiles registred', data: profiles });
  } catch (error) {
    res.status(500).json({
      msg: 'There is a problem with the list of profiles',
      error: error.message,
    });
  }
};

const profileById = async (req, res) => {
  //Comprueba que el id sea correcto
  if (isNaN(parseInt(req.params.id)))
    return res.status(500).send({ msg: 'The ID provided is wrong' });
  try {
    //comprueba que exista un perfil con ese ID
    const profileFind = await prisma.profile.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    if (!profileFind)
      return res
        .status(500)
        .send({ msg: 'The ID provided doesnt belong to any user' });
    //carga el perfil del usuario
    const profile = await prisma.profile.findFirst({
      where: {
        id: +req.params.id,
      },
    });
    res.status(200).json({ res: 'Details of profile', data: profile });
  } catch (error) {
    res.status(500).send({
      msg: 'There was a problem finding that user',
      error: error.message,
    });
  }
};
const updateProfile = async (req, res) => {
  // comprueba que el valor del id sea correcto
  if (isNaN(parseInt(req.params.id)))
    return res.status(500).send({ msg: 'The ID provided is wrong' });
  const name = req.params;
  try {
    //comprueba que el id pertenezca a un perfil
    const profileFind = await prisma.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    if (!profileFind)
      return res
        .status(500)
        .send({ msg: 'The id provided doesnt belong to any user' });
    //actualiza el perfil
    const profileUpdated = await prisma.profile.update({
      where: {
        id: +req.params.id,
      },
      data: {
        name,
      },
    });
    res.status(200).json({ res: 'Profile updated', data: profileUpdated });
  } catch (error) {
    res.status(500).send({
      msg: 'There was a problem while we find the profile',
      error: error.message,
    });
  }
};
const deleteProfile = async (req, res) => {
  //verifica que el id sea correcto
  if (isNaN(parseInt(req.params.id)))
    return res.status(500).send({ msg: 'The ID provided is wrong' });
  try {
    //verifica que el id pertenezca a un perfil
    const profileExist = await prisma.profile.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    if (!profileExist)
      return res
        .status(500)
        .send({ msg: 'We coulnt find a profile with the id provided' });
    //elimina el perfil
    const profile = await prisma.profile.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.status(200).json({ res: 'Profile deleted', data: profile });
  } catch (error) {
    res.status(500).send({ msg: 'Something goes wrong', error: error.message });
  }
};

export {
  createProfile,
  listAllProfiles,
  profileById,
  updateProfile,
  deleteProfile,
};
