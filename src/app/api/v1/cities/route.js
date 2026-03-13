// app/api/v1/cities/route.js
import { NextResponse } from 'next/server';
import {
  createNewCity,
  getAllCities,
} from '@/app/services/cities_service';

export async function GET() {
  try {
    const cities = await getAllCities();
    return NextResponse.json(cities);
  } catch (error) {
    console.error('GET /api/v1/cities error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch cities' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const city = await createNewCity(body);
    return NextResponse.json(city, { status: 201 });
  } catch (error) {
    console.error('POST /api/v1/cities error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create city' },
      { status: 400 }
    );
  }
}