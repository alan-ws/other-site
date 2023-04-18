import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
	matcher: "/((?!api|_next/static|_next/image|favicon.ico|404).*)"
}

export function middleware(request: NextRequest) {
	if (request.headers['x-vercel-protection-bypass'] === process.env.SECRET_BYPASS) {
		const response = NextResponse.next();
		response.cookies.set('x-vercel-set-bypass-cookie', true);
		return response;
	}
	return NextResponse.rewrite(request.nextUrl.href.replace('editor', '404'));
}
