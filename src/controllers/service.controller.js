import { PrismaClient } from '@prisma/client';

const prisma = PrismaClient;

const creteService = async (req, res) => {
  const { name, description, price, status } = req.params;
  //verifica que los datos esten completos para generar el perfil
  if (Object.values(req.params).includes(''))
    return res.status(500).json({ msg: 'You must complete all the fields' });
  try {
    //ingresa el nuevo usuario
    const newService = await prisma.service.create({
      data: {
        name,
        description,
        price: +price,
        status: Boolean(status),
      },
    });
    req.status(200).json({ res: 'New service created', data: newService });
  } catch (error) {
    res.status(500).send({
      msg: 'Something goes wrong, we coulnd create a profile',
      error: error.message,
    });
  }
};

const listAllServices = async (req, res) => {
  try {
    const allServices = await prisma.service.findMany({
      where: { status: true },
    });
    res.status(200).json({ res: 'Services registred', data: allServices });
  } catch (error) {
    res.status(500).send({
      msg: 'Something goes wrong. We couldnt find the list of services',
      error: error.message,
    });
  }
};
const ServiceById = async (req, res) => {
  //Comprueba que el id de los servicios sean correctos
  if (isNaN(parseInt(req.params.id)))
    return res.status(500).send({ msg: 'The ID provided is wrong' });
  try {
    //comprueba que el id tenga un servicio asignado
    const serviceFind = await prisma.service.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    if (!serviceFind)
      return res.status(500).send({ msg: 'We couldnt find the service' });
    //realiza la consulta
    const oneService = await prisma.service.findFirst({
      where: {
        id: +req.params.id,
      },
    });
    req.status(200).json({ res: 'Details of service', data: oneService });
  } catch (error) {
    res.status(500).send({ msg: 'Something goes wrong', error: error.message });
  }
};
const updateService = async (req, res) => {
  //verifica que el ID sea correcto
  if (isNaN(parseInt(req.params.id)))
    return res.status(500).send({ msg: 'The ID provided is wrong' });
  const { name, description, price, status } = req.body;
  try {
    //verifica que exista un usuario con ese ID
    const serviceFound = await prisma.service.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    if (!serviceFound)
      return res
        .status(404)
        .send({ msg: 'We couldnt find the service with that ID' });
    //Actualizacion del servicio
    const serviceUpdated = await prisma.service.update({
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
  } catch (error) {
    res.status(500).send({ msg: 'Something goes wrong', error: error.message });
  }
};
const deleteService = async (req, res) => {
  //verifico que el id sea correcto
  if (isNaN(parseInt(req.params.id)))
    return res.status(400).send({ msg: 'The ID provided is wrong' });
  try {
    //verificar si el id pertenece a un servicio
    const serviceIdentified = await prisma.service.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    if (!serviceIdentified)
      return res
        .status(404)
        .send({ msg: 'We couldnt find the service with that ID' });
    //elimino el servicio
    const serviceDeleted = await prisma.service.delete({
      where: { id: +req.params.id },
    });
    req.status(200).json({ res: 'Service deleted', data: serviceDeleted });
  } catch (error) {
    res.status(500).send({ msg: 'Something goes wrong', error: error.message });
  }
};

const changeService = async (req, res) => {
  //verifica que el id sea correcto
  if (isNaN(parseInt(req.params.id)))
    return res.status(400).send({ msg: 'The ID provider is not correct' });
  try {
    //verifica que el id pertenezca a un serivicio
    const serviceFind = await prisma.service.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    if (!serviceFind)
      return res
        .status(404)
        .send({ msg: 'We couldnt find a service with that ID' });
    if (req.params.status != 'true' || req.params.status != 'false')
      return res
        .status(404)
        .send({ msg: 'The status provided doesnt belong to true or false' });
    //realiza la consulta
    const statusUpdated = await prisma.service.delete({
      where: { id: +req.params.id },
      data: {
        status: req.bosy.status === 'true',
      },
    });
    res.status(200).json({ res: 'Service changed', data: statusUpdated });
  } catch (error) {}
};

export {
  creteService,
  listAllServices,
  ServiceById,
  updateService,
  deleteService,
  changeService,
};
