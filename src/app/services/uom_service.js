// src/services/uom.service.js
import {
  createUom,
  findAllUoms,
  findUomById,
  findUomByCode,
  updateUom,
  deleteUom,
} from '@/app/repositories/uom_repository';

export async function createNewUom(input) {
  const { code, name, symbol, category, baseFactor, isActive } = input;

  if (!code || typeof code !== 'string' || code.trim().length < 2) {
    throw new Error('Code must be a string with at least 2 characters');
  }

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    throw new Error('Name must be a string with at least 2 characters');
  }

  // Check duplicate code
  const existing = await findUomByCode(code.trim().toUpperCase());
  if (existing) {
    throw new Error('Unit code already exists');
  }

  return createUom({
    code: code.trim().toUpperCase(),
    name: name.trim(),
    symbol: symbol ? symbol.trim() : null,
    category: category ? category.trim() : null,
    baseFactor: baseFactor ? Number(baseFactor) : null,
    isActive: isActive !== undefined ? Boolean(isActive) : true,
  });
}

export async function getAllUoms() {
  return findAllUoms();
}

export async function getUomById(id) {
  if (!id) throw new Error('ID is required');
  const uom = await findUomById(id);
  if (!uom) throw new Error('Unit of measurement not found');
  return uom;
}

export async function updateExistingUom(id, input) {
  const { code, name, symbol, category, baseFactor, isActive } = input;

  if (!code && !name && !symbol && !category && baseFactor === undefined && isActive === undefined) {
    throw new Error('At least one field must be provided for update');
  }

  await getUomById(id); // ensure exists

  const updateData = {};

  if (code) {
    const trimmedCode = code.trim().toUpperCase();
    if (trimmedCode.length < 2) {
      throw new Error('Code must be at least 2 characters');
    }
    const existing = await findUomByCode(trimmedCode);
    if (existing && existing.id !== id) {
      throw new Error('Unit code already in use');
    }
    updateData.code = trimmedCode;
  }

  if (name) updateData.name = name.trim();
  if (symbol !== undefined) updateData.symbol = symbol ? symbol.trim() : null;
  if (category !== undefined) updateData.category = category ? category.trim() : null;
  if (baseFactor !== undefined) updateData.baseFactor = baseFactor ? Number(baseFactor) : null;
  if (isActive !== undefined) updateData.isActive = Boolean(isActive);

  return updateUom(id, updateData);
}

export async function removeUom(id) {
  await getUomById(id);
  return deleteUom(id);
}