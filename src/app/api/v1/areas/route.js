// app/api/v1/areas/route.js
import { NextResponse } from 'next/server';
import {
  createNewArea,
  getAllAreas,
} from '@/app/services/areas_service';

export async function GET() {
  try {
    const areas = await getAllAreas();
    return NextResponse.json(areas);
  } catch (error) {
    console.error('GET /api/v1/areas error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch areas' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const area = await createNewArea(body);
    return NextResponse.json(area, { status: 201 });
  } catch (error) {
    console.error('POST /api/v1/areas error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create area' },
      { status: 400 }
    );
  }
}