// app/api/v1/uom/[id]/route.js
import { NextResponse } from 'next/server';
import {
  getUomById,
  updateExistingUom,
  removeUom,
} from '@/app/services/uom_service';

export async function GET(request, { params }) {
  try {
    const uom = await getUomById(params.id);
    return NextResponse.json(uom);
  } catch (error) {
    console.error('GET /api/v1/uom/[id] error:', error);
    return NextResponse.json(
      { error: error.message || 'Unit of measurement not found' },
      { status: error.message?.includes('not found') ? 404 : 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const uom = await updateExistingUom(params.id, body);
    return NextResponse.json(uom);
  } catch (error) {
    console.error('PUT /api/v1/uom/[id] error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update unit of measurement' },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await removeUom(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('DELETE /api/v1/uom/[id] error:', error);
    return NextResponse.json(
      { error: error.message || 'Unit of measurement not found' },
      { status: error.message?.includes('not found') ? 404 : 500 }
    );
  }
}