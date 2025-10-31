import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/dbConnect';
import Brand from '../../models/Brand';
import { verifyToken } from '../../lib/auth';


export async function GET() {
await dbConnect();
const brands = await Brand.find({}).lean();
return NextResponse.json(brands);
}


export async function POST(req: Request) {
const token = req.headers.get('authorization')?.replace('Bearer ', '');
if (!token || !verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
const body = await req.json();
await dbConnect();
const b = await Brand.create(body);
return NextResponse.json(b, { status: 201 });
}


export async function PUT(req: Request) {
const token = req.headers.get('authorization')?.replace('Bearer ', '');
if (!token || !verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
const body = await req.json();
const { _id, ...rest } = body;
await dbConnect();
const updated = await Brand.findByIdAndUpdate(_id, rest, { new: true });
return NextResponse.json(updated);
}


export async function DELETE(req: Request) {
const token = req.headers.get('authorization')?.replace('Bearer ', '');
if (!token || !verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
const body = await req.json();
await dbConnect();
await Brand.findByIdAndDelete(body._id);
return NextResponse.json({ ok: true });
}