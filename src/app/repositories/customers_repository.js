// src/repositories/customers.repository.js
import { prisma } from '@/lib/prisma';

export async function createCustomer(data) {
  return prisma.customers.create({ data });
}

export async function findAllCustomers() {
  return prisma.customers.findMany({
    orderBy: { name: 'asc' },
    include: {
      addresses: true,
    },
  });
}

export async function findCustomerById(id) {
  return prisma.customers.findUnique({
    where: { id },
    include: {
      addresses: true,
    },
  });
}

export async function updateCustomer(id, data) {
  return prisma.customers.update({
    where: { id },
    data,
  });
}

export async function deleteCustomer(id) {
  return prisma.customers.delete({
    where: { id },
  });
}

export async function findCustomerByMobile(mobile) {
  return prisma.customers.findUnique({
    where: { mobile },
  });
}

export async function createCustomerAddress(customerId, data) {
  return prisma.customer_address.create({
    data: {
      customer: {
        connect: { id: customerId },
      },
      area: {
        connect: { id: data.areaId },
      },
      addressLine: data.addressLine.trim(),
      landmark: data.landmark ? data.landmark.trim() : null,
      pincode: data.pincode ? data.pincode.trim() : null,
      isDefault: data.isDefault === true,
    },
  });
}

export async function updateCustomerAddress(addressId, data) {
  return prisma.customer_address.update({
    where: { id: addressId },
    data: {
      addressLine: data.addressLine ? data.addressLine.trim() : undefined,
      landmark: data.landmark !== undefined ? (data.landmark ? data.landmark.trim() : null) : undefined,
      pincode: data.pincode !== undefined ? (data.pincode ? data.pincode.trim() : null) : undefined,
      areaId: data.areaId || undefined,
      isDefault: data.isDefault !== undefined ? data.isDefault : undefined,
    },
  });
}

export async function deleteCustomerAddress(addressId) {
  return prisma.customer_address.delete({
    where: { id: addressId },
  });
}