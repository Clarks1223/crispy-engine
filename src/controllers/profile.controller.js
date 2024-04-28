import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createProfile = async (req, res) => {
  const { name } = req.body;
  const newProfile = await prisma.profile.create({
    data: { name },
  });
  res.status(200).json({ res: 'New profile created', data: newProfile });
};

const listAllProfiles = async (req, res) => {
  const profiles = await prisma.profile.findMany();
  res.status(200).json({ res: 'Profiles registred', data: profiles });
};

const profileById = async (req, res) => {
  const profile = await prisma.profile.findFirst({
    where: {
      id: +req.params.id,
    },
  });
  res.status(200).json({ res: 'Details of profile', data: profile });
};
const updateProfile = async (req, res) => {
  const name = req.params;
  const profileUpdated = await prisma.profile.update({
    where: {
      id: +req.params.id,
    },
    data: {
      name,
    },
  });
  res.status(200).json({ res: 'Profile updated', data: profileUpdated });
};
const deleteProfile = async (req, res) => {
  const profile = await prisma.profile.delete({
    where: {
      id: +req.params.id,
    },
  });
  res.status(200).json({ res: 'Profile deleted', data: profile });
};

export {
  createProfile,
  listAllProfiles,
  profileById,
  updateProfile,
  deleteProfile,
};
