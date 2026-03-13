// app/api/v1/cities/[id]/route.js
import { NextResponse } from 'next/server';
import {
  getCityById,
  updateExistingCity,
  removeCity,
} from '@/app/services/cities_service';

export async function GET(request, context) {
  const params = await context.params; // ← Must await
  const { id } = params;

  try {
    const city = await getCityById(id);
    return NextResponse.json(city);
  } catch (error) {
    console.error('GET /api/v1/cities/[id] error:', error);
    return NextResponse.json(
      { error: error.message || 'City not found' },
      { status: error.message?.includes('not found') ? 404 : 500 }
    );
  }
}

export async function PUT(request, context) {
  const params = await context.params; // ← Must await
  const { id } = params;

  try {
    const body = await request.json();
    const city = await updateExistingCity(id, body);
    return NextResponse.json(city);
  } catch (error) {
    console.error('PUT /api/v1/cities/[id] error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update city' },
      { status: 400 }
    );
  }
}

export async function DELETE(request, context) {
  const params = await context.params; // ← Must await
  const { id } = params;

  try {
    await removeCity(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('DELETE /api/v1/cities/[id] error:', error);
    return NextResponse.json(
      { error: error.message || 'City not found' },
      { status: error.message?.includes('not found') ? 404 : 500 }
    );
  }
}