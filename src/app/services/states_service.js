// src/services/states.service.js
import {
  createState,
  findAllStates,
  findStateById,
  updateState,
  deleteState,
  findStateByCode,
} from '@/app/repositories/states_repository';   // adjust path if needed

export async function createNewState(input) {
  const { name, code } = input;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    throw new Error('Name must be a string with at least 2 characters');
  }

  if (!code || typeof code !== 'string' || code.length !== 2 || !/^[A-Z]{2}$/.test(code)) {
    throw new Error('Code must be exactly 2 uppercase letters (e.g. TS, AP, KA)');
  }

  const existing = await findStateByCode(code);
  if (existing) {
    throw new Error('State code already exists');
  }

  return createState({ name: name.trim(), code });
}

export async function getAllStates() {
  return findAllStates();
}

export async function getStateById(id) {
  if (!id) throw new Error('ID is required');
  const state = await findStateById(id);
  if (!state) throw new Error('State not found');
  return state;
}

export async function updateExistingState(id, input) {
  const { name, code } = input;

  if (!name && !code) {
    throw new Error('At least one field (name or code) must be provided');
  }

  await getStateById(id); // ensure exists

  const updateData = {};
  if (name) updateData.name = name.trim();
  if (code) {
    if (code.length !== 2 || !/^[A-Z]{2}$/.test(code)) {
      throw new Error('Code must be exactly 2 uppercase letters');
    }
    const existing = await findStateByCode(code);
    if (existing && existing.id !== id) {
      throw new Error('State code already in use');
    }
    updateData.code = code;
  }

  return updateState(id, updateData);
}

export async function removeState(id) {
  await getStateById(id);
  return deleteState(id);
}