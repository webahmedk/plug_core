// src/services/customers.service.js
import {
  createCustomer,
  findAllCustomers,
  findCustomerById,
  updateCustomer,
  deleteCustomer,
  findCustomerByMobile,
  createCustomerAddress,
  updateCustomerAddress,
  deleteCustomerAddress,
} from '@/app/repositories/customers_repository';

export async function createNewCustomer(input) {
  const { name, mobile, email } = input;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    throw new Error('Name must be at least 2 characters');
  }

  if (!mobile || typeof mobile !== 'string' || mobile.trim().length < 10) {
    throw new Error('Valid mobile number is required');
  }

  const existing = await findCustomerByMobile(mobile.trim());
  if (existing) {
    throw new Error('Mobile number already registered');
  }

  return createCustomer({
    name: name.trim(),
    mobile: mobile.trim(),
    email: email ? email.trim() : null,
  });
}

export async function getAllCustomers() {
  return findAllCustomers();
}

export async function getCustomerById(id) {
  if (!id) throw new Error('ID is required');
  const customer = await findCustomerById(id);
  if (!customer) throw new Error('Customer not found');
  return customer;
}

export async function updateExistingCustomer(id, input) {
  const { name, mobile, email } = input;

  if (!name && !mobile && !email) {
    throw new Error('At least one field must be provided');
  }

  await getCustomerById(id);

  const updateData = {};
  if (name) updateData.name = name.trim();
  if (mobile) {
    const trimmedMobile = mobile.trim();
    const existing = await findCustomerByMobile(trimmedMobile);
    if (existing && existing.id !== id) {
      throw new Error('Mobile number already in use');
    }
    updateData.mobile = trimmedMobile;
  }
  if (email !== undefined) updateData.email = email ? email.trim() : null;

  return updateCustomer(id, updateData);
}

export async function removeCustomer(id) {
  await getCustomerById(id);
  return deleteCustomer(id);
}
export async function addCustomerAddress(customerId, input) {
  const { addressLine, landmark, pincode, areaId, isDefault } = input;

  if (!addressLine || typeof addressLine !== 'string' || addressLine.trim().length < 5) {
    throw new Error('Address line must be at least 5 characters');
  }

  if (!areaId || typeof areaId !== 'string') {
    throw new Error('Valid areaId is required');
  }

  // If setting as default, unset others first
  if (isDefault) {
    await prisma.customer_address.updateMany({
      where: { customerId, isDefault: true },
      data: { isDefault: false },
    });
  }

  return createCustomerAddress(customerId, {
    addressLine: addressLine.trim(),
    landmark: landmark ? landmark.trim() : null,
    pincode: pincode ? pincode.trim() : null,
    areaId,
    isDefault: !!isDefault,
  });
}

export async function editCustomerAddress(addressId, input) {
  // Optional extra validation or business rules here
  return updateCustomerAddress(addressId, input);
}

export async function removeCustomerAddress(addressId) {
  return deleteCustomerAddress(addressId);
}