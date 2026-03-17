import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { encrypt } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const { name, phone, password } = await request.json();

    if (!name || !phone || !password) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { phone }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Este número de celular já está cadastrado' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user (Visitante)
    const newUser = await prisma.user.create({
      data: {
        name,
        phone,
        password: hashedPassword,
        role: 'VISITOR' // Default role
      }
    });

    // Auto-login after registration
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const sessionToken = await encrypt({ id: newUser.id, role: newUser.role, name: newUser.name, expires });

    const response = NextResponse.json({
      message: 'Cadastro realizado com sucesso',
      user: { id: newUser.id, name: newUser.name, role: newUser.role, phone: newUser.phone }
    }, { status: 201 });

    response.cookies.set({
      name: 'session',
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expires,
      sameSite: 'lax',
      path: '/'
    });

    return response;
  } catch (error: any) {
    console.error("Register error:", error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
