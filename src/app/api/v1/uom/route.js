// app/api/v1/uom/route.js
import { NextResponse } from 'next/server';
import {
  createNewUom,
  getAllUoms,
} from '@/app/services/uom_service';

export async function GET() {
  try {
    const uoms = await getAllUoms();
    return NextResponse.json(uoms);
  } catch (error) {
    console.error('GET /api/v1/uom error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch units of measurement' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const uom = await createNewUom(body);
    return NextResponse.json(uom, { status: 201 });
  } catch (error) {
    console.error('POST /api/v1/uom error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create unit of measurement' },
      { status: 400 }
    );
  }
}