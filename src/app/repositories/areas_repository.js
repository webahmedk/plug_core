// src/repositories/areas.repository.js
import { prisma } from '@/lib/prisma';

export async function createArea(data) {
  return prisma.areas.create({ data });
}

export async function findAllAreas() {
  return prisma.areas.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      pincode: true,
      city: {
        select: {
          id: true,
          name: true,
          state: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
      },
    },
  });
}

export async function findAreaById(id) {
  return prisma.areas.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      pincode: true,
      city: {
        select: {
          id: true,
          name: true,
          state: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
      },
    },
  });
}

export async function updateArea(id, data) {
  return prisma.areas.update({
    where: { id },
    data,
  });
}

export async function deleteArea(id) {
  return prisma.areas.delete({
    where: { id },
  });
}

export async function findAreasByCityId(cityId) {
  return prisma.areas.findMany({
    where: { cityId },
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      pincode: true,
      city: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}