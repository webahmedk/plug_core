// src/repositories/cities.repository.js
import { prisma } from '@/lib/prisma';

export async function createCity(data) {
  return prisma.cities.create({ data });
}

export async function findAllCities() {
  return prisma.cities.findMany({
    orderBy: { name: 'asc' },
    include: {
      state: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
    },
  });
}

export async function findCityById(id) {
  return prisma.cities.findUnique({
    where: { id },
    include: {
      state: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
    },
  });
}

export async function updateCity(id, data) {
  return prisma.cities.update({
    where: { id },
    data,
  });
}

export async function deleteCity(id) {
  return prisma.cities.delete({
    where: { id },
  });
}

export async function findCitiesByStateId(stateId) {
  return prisma.cities.findMany({
    where: { stateId },
    orderBy: { name: 'asc' },
  });
}