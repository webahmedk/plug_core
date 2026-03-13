import { NextResponse } from 'next/server';
import {
  createNewCustomer,
  getAllCustomers,
} from '@/app/services/customers_service';

export async function GET() {
  try {
    const customers = await getAllCustomers();
    return NextResponse.json(customers);
  } catch (error) {
    console.error('GET /api/v1/customers error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const customer = await createNewCustomer(body);
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error('POST /api/v1/customers error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}