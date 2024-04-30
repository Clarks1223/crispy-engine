import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const createProfileForUser = async (req, res) => {
  const userId = +req.params.userId;
  const { name } = req.body;
  try {
    //verifica que el usuario exista
    const existingProfile = await prisma.profile.findFirst({
      where: {
        userId: userId,
      },
    });
    if (existingProfile) {
      return res
        .status(400)
        .json({ msg: 'Profile already exist for this user' });
    }
    //crea el perfil
    const newProfile = await prisma.profile.create({
      data: {
        name: name,
      },
    });
    res.status(201).json(newProfile);
  } catch (error) {
    return res.status(500).json({
      msg: 'Sorry, there is one problem with creating a profile for user',
      error: error.message,
    });
  }
};
const getUserProfile = async (req, res) => {
  const userId = +req.params.userId;
  try {
    //encuentra el ID
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    //encontrar el usuario
    const userProfile = await prisma.profile.findFirst({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    });
    if (!userProfile) {
      return res.status(404).json({ msg: 'Profile not found for this user' });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    return res.status(500).json({
      msg: 'Sorry, there is one problem with show a profile for user',
      error: error.message,
    });
  }
};
const deleteProfileForUser = async (req, res) => {
  const userId = +req.params.userId;
  try {
    //comprobar que el id exista
    const userProfile = await prisma.profile.findFirst({
      where: { userId: userId },
    });
    if (!userProfile)
      return res
        .status(400)
        .json({ message: 'Profile not found for this user' });
    //elimina
    await prisma.profile.delete({
      where: {
        id: userProfile.id,
      },
    });
    res.status(200).json({ msg: 'Profile delete for the user' });
  } catch (error) {
    return res.status(500).json({
      msg: 'Sorry, there is one problem with delete a profile for user',
      error: error.message,
    });
  }
};
export { createProfileForUser, getUserProfile, deleteProfileForUser };
