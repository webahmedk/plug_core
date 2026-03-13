// app/api/v1/areas/[id]/route.js
import { NextResponse } from 'next/server';
import {
  getAreaById,
  updateExistingArea,
  removeArea,
} from '@/app/services/areas_service';

export async function GET(request, context) {
  const params = await context.params;          // ← required await
  const { id } = params;

  try {
    const area = await getAreaById(id);
    return NextResponse.json(area);
  } catch (error) {
    console.error('GET /api/v1/areas/[id] error:', error);
    return NextResponse.json(
      { error: error.message || 'Area not found' },
      { status: error.message?.includes('not found') ? 404 : 500 }
    );
  }
}

export async function PUT(request, context) {
  const params = await context.params;          // ← required await
  const { id } = params;

  try {
    const body = await request.json();
    const area = await updateExistingArea(id, body);
    return NextResponse.json(area);
  } catch (error) {
    console.error('PUT /api/v1/areas/[id] error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update area' },
      { status: 400 }
    );
  }
}

export async function DELETE(request, context) {
  const params = await context.params;          // ← required await
  const { id } = params;

  try {
    await removeArea(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('DELETE /api/v1/areas/[id] error:', error);
    return NextResponse.json(
      { error: error.message || 'Area not found' },
      { status: error.message?.includes('not found') ? 404 : 500 }
    );
  }
}