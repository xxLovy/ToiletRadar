"use client"
import MobileSideBar from "@/components/leftsidebar/MobileSideBar";
import Sidebar from "@/components/leftsidebar/Sidebar";
import ListView from "@/components/ListView";
import MapView from "@/components/mapview/MapView";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrentLocation } from "@/redux/pin/slice";
import { fetchToiletFromUser, fetchToiletFromGoogle } from "@/redux/toilet/operations";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const pin = useAppSelector(selectCurrentLocation);

  useEffect(() => {
    dispatch(fetchToiletFromUser())
    dispatch(fetchToiletFromGoogle({ latitude: pin.latitude, longitude: pin.longitude }))
  }, [])

  return (
    <div className="fixed top-[60px] bottom-[60px] left-0 right-0 overflow-hidden">
      {/* Map Container */}

      <MapView />


      {/* Desktop Sidebar */}
      <div className="hidden md:block absolute top-4 left-4 z-10">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div className="block md:hidden absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <MobileSideBar />
      </div>

      {/* Desktop List View */}
      <div className="hidden md:block absolute top-4 right-4 z-10">
        <ListView />
      </div>

      {/* Mobile List View */}
      <div className="block md:hidden absolute bottom-4 left-0 right-0 z-10">
        <ListView />
      </div>
    </div>
  );
}
