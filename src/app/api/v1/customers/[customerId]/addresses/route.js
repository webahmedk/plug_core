import { NextResponse } from 'next/server';
import { addCustomerAddress } from '@/app/services/customers_service';

export async function POST(request, context) {
  const params = await context.params;
  const { customerId } = params;

  try {
    const body = await request.json();
    const address = await addCustomerAddress(customerId, body);
    return NextResponse.json(address, { status: 201 });
  } catch (error) {
    console.error('POST address error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create address' },
      { status: 400 }
    );
  }
}