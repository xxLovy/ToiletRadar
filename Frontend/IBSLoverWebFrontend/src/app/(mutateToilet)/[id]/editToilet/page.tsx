"use client"

import WithoutLogin from '@/components/AddToiletWithoutLogin';
import EditToiletWithLogin from '@/components/EditToiletWithLogin';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React, { useEffect, useState } from 'react'
import DeleteToilet from '@/components/DeleteToilet';
import dynamic from 'next/dynamic';
import { useAppSelector } from '@/redux/hooks';
import { selectToiletFromUser } from '@/redux/toilet/slice';

// Dynamically import MapView to avoid SSR issues
const MapView = dynamic(() => import('@/components/mapview/MapView'), {
    ssr: false,
});

const Page = async ({ params }: { params: { id: string } }) => {
    const { isAuthenticated } = getKindeServerSession();
    const isLoggedIn = await isAuthenticated();
    const { id } = params;
    const userToilets = useAppSelector(selectToiletFromUser);
    const currentToilet = userToilets.find(toilet => toilet._id === id);

    return (
        <>
            {isLoggedIn ? (
                <div className="container mx-auto p-4">
                    <div className="mb-4">
                        <h1 className="text-2xl font-semibold mb-2">Edit Toilet</h1>
                        <p className="text-gray-600">Here you can edit the toilet information</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <EditToiletWithLogin toiletId={id} />
                            <DeleteToilet id={params.id} />
                        </div>
                        <div className="h-[500px]">
                            <MapView
                                initialToilets={currentToilet ? [currentToilet] : []}
                                singleToilet={currentToilet}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <WithoutLogin />
            )}
        </>
    );
};

export default Page;