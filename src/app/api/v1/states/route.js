const { NextResponse } = require('next/server');
const {
  createNewState,
  getAllStates,
} = require('@/app/services/states_service');
 // adjust path if needed

export async function GET() {
  try {
    const states = await getAllStates();
    return NextResponse.json(states);
  } catch (error) {
    console.error('GET /api/v1/states error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch states' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const state = await createNewState(body);
    return NextResponse.json(state, { status: 201 });
  } catch (error) {
    console.error('POST /api/v1/states error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create state' },
      { status: 400 }
    );
  }
}