// src/services/areas.service.js
import {
  createArea,
  findAllAreas,
  findAreaById,
  updateArea,
  deleteArea,
  findAreasByCityId,
} from '@/app/repositories/areas_repository';

export async function createNewArea(input) {
  const { name, pincode, cityId } = input;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    throw new Error('Area name must be a string with at least 2 characters');
  }

  if (!cityId || typeof cityId !== 'string') {
    throw new Error('cityId is required and must be a valid string');
  }

  // pincode is optional but should be string if provided
  if (pincode && typeof pincode !== 'string') {
    throw new Error('Pincode must be a string if provided');
  }

  return createArea({
    name: name.trim(),
    pincode: pincode ? pincode.trim() : null,
    cityId,
  });
}

export async function getAllAreas() {
  return findAllAreas();
}

export async function getAreaById(id) {
  if (!id) throw new Error('ID is required');
  const area = await findAreaById(id);
  if (!area) throw new Error('Area not found');
  return area;
}

export async function updateExistingArea(id, input) {
  const { name, pincode, cityId } = input;

  if (!name && !pincode && !cityId) {
    throw new Error('At least one field (name, pincode or cityId) must be provided');
  }

  await getAreaById(id); // ensure exists

  const updateData = {};
  if (name) updateData.name = name.trim();
  if (pincode !== undefined) updateData.pincode = pincode ? pincode.trim() : null;
  if (cityId) updateData.cityId = cityId;

  return updateArea(id, updateData);
}

export async function removeArea(id) {
  await getAreaById(id);
  return deleteArea(id);
}

export async function getAreasByCity(cityId) {
  if (!cityId) throw new Error('cityId is required');
  return findAreasByCityId(cityId);
}