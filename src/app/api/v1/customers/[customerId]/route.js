import { NextResponse } from 'next/server';
import {
  getCustomerById,
  updateExistingCustomer,
  removeCustomer,
} from '@/app/services/customers_service';

export async function GET(request, context) {
  const params = await context.params;
  const { id } = params;

  try {
    const customer = await getCustomerById(id);
    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Customer not found' },
      { status: error.message?.includes('not found') ? 404 : 500 }
    );
  }
}

export async function PUT(request, context) {
  const params = await context.params;
  const { id } = params;

  try {
    const body = await request.json();
    const customer = await updateExistingCustomer(id, body);
    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, context) {
  const params = await context.params;
  const { id } = params;

  try {
    await removeCustomer(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Customer not found' },
      { status: error.message?.includes('not found') ? 404 : 500 }
    );
  }
}