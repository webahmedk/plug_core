// src/repositories/states.repository.js
import { prisma } from "@/lib/prisma";

export async function createState(data) {
  return prisma.states.create({ data });
}

export async function findAllStates() {
  return prisma.states.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function findStateById(id) {
  return prisma.states.findUnique({
    where: { id },
  });
}

export async function updateState(id, data) {
  return prisma.states.update({
    where: { id },
    data,
  });
}

export async function deleteState(id) {
  return prisma.states.delete({
    where: { id },
  });
}

export async function findStateByCode(code) {
  return prisma.states.findUnique({
    where: { code },
  });
}