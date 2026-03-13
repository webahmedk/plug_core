// app/api/v1/states/[id]/route.js
import { NextResponse } from 'next/server';
import {
  getStateById,
  updateExistingState,
  removeState,
} from '@/app/services/states_service';

export async function GET(request, context) {
  const params = await context.params; // ← await here
  const { id } = params;

  try {
    const state = await getStateById(id);
    return NextResponse.json(state);
  } catch (error) {
    console.error('GET /api/v1/states/[id] error:', error);
    return NextResponse.json(
      { error: error.message || 'State not found' },
      { status: error.message?.includes('not found') ? 404 : 500 }
    );
  }
}

export async function PUT(request, context) {
  const params = await context.params; // ← await here
  const { id } = params;

  try {
    const body = await request.json();
    const state = await updateExistingState(id, body);
    return NextResponse.json(state);
  } catch (error) {
    console.error('PUT /api/v1/states/[id] error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update state' },
      { status: 400 }
    );
  }
}

export async function DELETE(request, context) {
  const params = await context.params; // ← await here
  const { id } = params;

  try {
    await removeState(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('DELETE /api/v1/states/[id] error:', error);
    return NextResponse.json(
      { error: error.message || 'State not found' },
      { status: error.message?.includes('not found') ? 404 : 500 }
    );
  }
}