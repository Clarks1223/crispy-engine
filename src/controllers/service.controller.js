import { Prisma, PrismaClient } from '@prisma/client';

const prisma = PrismaClient;

const creteService = async (req, res) => {
  const { name, description, price, status } = req.params;
  const newService = await prisma.service.create({
    data: {
      name,
      description,
      price: +price,
      status: Boolean(status),
    },
  });
  req.status(200).json({ res: 'New service created', data: newService });
};

const listAllServices = async (req, res) => {
  const allServices = await prisma.service.findMany({
    where: { status: true },
  });
  res.status(200).json({ res: 'Services registred', data: allServices });
};
const ServiceById = async (req, res) => {
  const oneService = await prisma.service.findFirst({
    where: {
      id: +req.params.id,
    },
  });
  req.status(200).json({ res: 'Details of service', data: oneService });
};
const updateService = async (req, res) => {
  const { name, description, price, status } = req.params;
  const serviceUpdated = prisma.service.findFirst({
    where: {
      id: +id.req.params.id,
    },
    data: {
      name,
      description,
      price: +price,
      status: Boolean(status),
    },
  });
  res.status(200).json({ res: 'Service updated', data: serviceUpdated });
};
const deleteService = async (req, res) => {
  const serviceDeleted = await prisma.service.delete({
    where: { id: +req.params.id },
  });
  req.status(200).json({ res: 'Service deleted', data: serviceDeleted });
};

const changeService = async (req, res) => {
  const statusUpdated = await prisma.service.delete({
    where: { id: +req.params.id },
    data: {
      status: req.bosy.status === 'true',
    },
  });
  res.status(200).json({ res: 'Service changed', data: statusUpdated });
};

export {
  creteService,
  listAllServices,
  ServiceById,
  updateService,
  deleteService,
  changeService,
};
