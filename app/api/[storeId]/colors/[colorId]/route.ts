import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
    req: Request,
    { params }: { params: { colorId: string } },
) {
    try {
        if (!params.colorId) {
            return new NextResponse('color ID is required', {
                status: 400,
            });
        }
        const color = await prismadb.color.findUnique({
            where: { id: params.colorId },
        });

        return NextResponse.json(color);
    } catch (error) {
        console.log('app/api/storeid/colors/[colorId]/route, GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string; colorId: string } },
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { name, value } = body;
        if (!userId) {
            return new NextResponse('Unauthenticated', { status: 401 });
        }
        if (!name) {
            return new NextResponse('Name is required', { status: 400 });
        }
        if (!value) {
            return new NextResponse('value is required', {
                status: 400,
            });
        }

        if (!params.colorId) {
            return new NextResponse('color Id is required', {
                status: 400,
            });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: { id: params.storeId, userId },
        });

        if (!storeByUserId) {
            return new NextResponse(
                'Stop doing what you are doing, you are not authorized',
                { status: 403 },
            );
        }

        const color = await prismadb.color.update({
            where: { id: params.colorId },
            data: {
                name,
                value,
            },
        });
        return NextResponse.json(color);
    } catch (error) {
        console.log('app/api/storeId/colors/[colorId]/route, PATCH', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string; colorId: string } },
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthenticated', { status: 401 });
        }

        if (!params.colorId) {
            return new NextResponse('color ID is required', {
                status: 400,
            });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: { id: params.storeId, userId },
        });

        if (!storeByUserId) {
            return new NextResponse(
                'Stop doing what you are doing, you are not authorized',
                { status: 403 },
            );
        }
        const color = await prismadb.color.deleteMany({
            where: { id: params.colorId },
        });

        return NextResponse.json(color);
    } catch (error) {
        console.log('app/api/storeid/colors/[colorId]/route, DELETE', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
