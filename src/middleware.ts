import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt, updateSession } from '@/lib/session';

const protectedRoutes = ['/admin', '/dashboard'];
const publicRoutes = ['/login', '/register', '/'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  
  const cookie = request.cookies.get('session')?.value;
  const session = cookie ? await decrypt(cookie) : null;

  // Se acessar rota protegida sem sessao, envia pro login
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Permissao Admin apenas nas rotas do /admin
  if (path.startsWith('/admin') && session?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  // Renova cookie sutilmente
  if (session) {
    return await updateSession(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
