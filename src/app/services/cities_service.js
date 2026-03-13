// src/services/cities.service.js
import {
  createCity,
  findAllCities,
  findCityById,
  updateCity,
  deleteCity,
  findCitiesByStateId,
} from '@/app/repositories/cities_repository';

export async function createNewCity(input) {
  const { name, stateId } = input;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    throw new Error('City name must be a string with at least 2 characters');
  }

  if (!stateId || typeof stateId !== 'string') {
    throw new Error('stateId is required and must be a valid string');
  }

  // Optional: check if state exists (you can add states repo import if needed)
  // For now we let Prisma throw foreign key error if stateId invalid

  return createCity({
    name: name.trim(),
    stateId,
  });
}

export async function getAllCities() {
  return findAllCities();
}

export async function getCityById(id) {
  if (!id) throw new Error('ID is required');
  const city = await findCityById(id);
  if (!city) throw new Error('City not found');
  return city;
}

export async function updateExistingCity(id, input) {
  const { name, stateId } = input;

  if (!name && !stateId) {
    throw new Error('At least one field (name or stateId) must be provided');
  }

  await getCityById(id); // ensure exists

  const updateData = {};
  if (name) updateData.name = name.trim();
  if (stateId) updateData.stateId = stateId;

  return updateCity(id, updateData);
}

export async function removeCity(id) {
  await getCityById(id);
  return deleteCity(id);
}

export async function getCitiesByState(stateId) {
  if (!stateId) throw new Error('stateId is required');
  return findCitiesByStateId(stateId);
}