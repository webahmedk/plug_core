// src/repositories/uom.repository.js
import { prisma } from '@/lib/prisma';

export async function createUom(data) {
  return prisma.uom.create({ data });
}

export async function findAllUoms() {
  return prisma.uom.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function findUomById(id) {
  return prisma.uom.findUnique({
    where: { id },
  });
}

export async function findUomByCode(code) {
  return prisma.uom.findUnique({
    where: { code },
  });
}

export async function updateUom(id, data) {
  return prisma.uom.update({
    where: { id },
    data,
  });
}

export async function deleteUom(id) {
  return prisma.uom.delete({
    where: { id },
  });
}