"use client"
import React, { useEffect, useState, useMemo } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectListState, setListStateFalse } from '@/redux/listView';
import ToiletCard from './ToiletCard';
import { RootState } from '@/redux/store';
import { selectToiletFromGoogle, selectToiletFromUser } from '@/redux/toilet/slice';
import { selectCurrentLocation } from '@/redux/pin/slice';
import { calculateDistance } from '@/lib/distance';
import { IFilter, selectFilterState } from '@/redux/filter';
import { X, MapPin, Navigation } from 'lucide-react';
import { FixedSizeList as List } from 'react-window';
import { selectToilet, setSelectedToilet } from '@/redux/selectedToilet';

interface ToiletComponentProps {
    toilets: ToiletWithDistance[];
    onToiletClick: (toilet: ToiletWithDistance) => void;
    className: string;
}

interface ToiletWithDistance extends Toilet {
    distance: number;
    vicinity?: string;
}

interface ToiletItemProps {
    data: {
        items: ToiletWithDistance[];
        onToiletClick: (toilet: ToiletWithDistance) => void;
    };
    index: number;
    style: React.CSSProperties;
}

const ITEM_HEIGHT = 120; // 每个厕所项的高度

const ToiletItem: React.FC<ToiletItemProps> = ({ data, index, style }) => {
    const { items, onToiletClick } = data;
    const item = items[index];
    const selectedToilet = useAppSelector(selectToilet);
    const isSelected = selectedToilet && selectedToilet._id === item?._id;

    const formatDistance = (meters: number) => {
        if (meters >= 1000) {
            return `${(meters / 1000).toFixed(1)} km`;
        }
        return `${Math.round(meters)} m`;
    };

    if (!item) return null;

    return (
        <div
            style={style}
            className={`border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer
                ${isSelected ? 'bg-green-50 hover:bg-green-100' : ''}`}
            onClick={() => onToiletClick(item)}
        >
            <div className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <h3 className={`font-medium ${!item.isFromUser ? "text-gray-900" : "text-blue-600"}
                            ${isSelected ? 'text-green-600' : ''}`}>
                            {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Navigation className={`w-4 h-4 ${isSelected ? 'text-green-500' : ''}`} />
                        <span>{formatDistance(item.distance * 1000)}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <MapPin className={`w-4 h-4 ${isSelected ? 'text-green-500' : ''}`} />
                    <span className="line-clamp-1">{item.vicinity || item.description}</span>
                </div>
            </div>
        </div>
    );
};

export const ListView: React.FC = () => {
    const toiletsFromUser = useAppSelector(selectToiletFromUser);
    const toiletsFromGoogle = useAppSelector(selectToiletFromGoogle);
    const dispatch = useAppDispatch();
    const listState = useAppSelector(selectListState);
    const selectedToilet = useAppSelector(selectToilet);
    const mapReduxRef = useAppSelector((state: RootState) => state.map.mapRef);
    const pin = useAppSelector(selectCurrentLocation);
    const toiletFilter = useAppSelector(selectFilterState);

    // 使用useMemo缓存计算结果
    const toiletsWithDistance = useMemo(() => {
        const allToilets = toiletsFromUser.concat(toiletsFromGoogle);
        return allToilets.map((item: Toilet): ToiletWithDistance => ({
            ...item,
            distance: calculateDistance(
                pin.latitude,
                pin.longitude,
                item.location.coordinates[1],
                item.location.coordinates[0]
            )
        })).sort((a: ToiletWithDistance, b: ToiletWithDistance) => a.distance - b.distance);
    }, [toiletsFromUser, toiletsFromGoogle, pin.latitude, pin.longitude]);

    // 使用useMemo缓存过滤结果
    const filteredToilets = useMemo(() => {
        return toiletsWithDistance.filter((toilet: ToiletWithDistance) => {
            if (toilet.isFromUser && toilet.features) {
                return (
                    ((toiletFilter.women && (toilet.features.women === "yes" || toilet.features.women === "dontknow") || !toiletFilter.women)) &&
                    ((toiletFilter.men && (toilet.features.men === "yes" || toilet.features.men === "dontknow")) || !toiletFilter.men) &&
                    ((toiletFilter.accessible && (toilet.features.accessible === "yes" || toilet.features.accessible === "dontknow")) || !toiletFilter.accessible) &&
                    ((toiletFilter.children && (toilet.features.children === "yes" || toilet.features.children === "dontknow") || !toiletFilter.children)) &&
                    ((toiletFilter.free && (toilet.features.free === "yes" || toilet.features.free === "dontknow")) || !toiletFilter.free) &&
                    ((toiletFilter.genderNeutral && (toilet.features.genderNeutral === "yes" || toilet.features.genderNeutral === "dontknow") || !toiletFilter.genderNeutral))
                );
            }
            return true;
        });
    }, [toiletsWithDistance, toiletFilter]);

    // 更新列表标题显示
    const getListTitle = () => {
        if (pin.latitude === 0 && pin.longitude === 0) {
            return "Nearby Toilets";
        }
        return "Toilets Near You";
    };

    const handleClose = () => {
        dispatch(setListStateFalse());
    };

    const handleToiletClick = (toilet: ToiletWithDistance) => {
        dispatch(setSelectedToilet(toilet));

        if (mapReduxRef) {
            // 平滑移动到选中的厕所位置
            mapReduxRef.flyTo(
                [toilet.location.coordinates[1], toilet.location.coordinates[0]],
                17,
                {
                    duration: 1.5,
                    easeLinearity: 0.25
                }
            );
        }
    };

    const handleCloseToilet = () => {
        // 只清除选中的厕所，不关闭列表视图
        dispatch(setSelectedToilet(null));
    };

    if (!listState) return null;

    const itemData = {
        items: filteredToilets,
        onToiletClick: handleToiletClick,
    };

    return (
        <div>
            {/* Desktop View */}
            <div className='hidden md:block h-full'>
                <div className='relative w-[400px] bg-white rounded-xl shadow-lg overflow-hidden h-full'>
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                        <div>
                            <h2 className="font-semibold text-gray-900">{getListTitle()}</h2>
                            <p className="text-sm text-gray-500">Found {filteredToilets.length} toilets</p>
                        </div>
                        <button
                            onClick={handleClose}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                    <div className="h-[calc(100%-60px)]">
                        <List
                            height={window.innerHeight - 180}
                            itemCount={filteredToilets.length}
                            itemSize={ITEM_HEIGHT}
                            width="100%"
                            itemData={itemData}
                        >
                            {ToiletItem}
                        </List>
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className='block md:hidden'>
                <div className='bg-white rounded-t-xl shadow-lg overflow-hidden'>
                    <div className="px-4 py-3 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-900">{getListTitle()}</h2>
                        <p className="text-sm text-gray-500">Found {filteredToilets.length} toilets</p>
                    </div>
                    <div className="h-[30vh]">
                        <List
                            height={window.innerHeight * 0.3}
                            itemCount={filteredToilets.length}
                            itemSize={ITEM_HEIGHT}
                            width="100%"
                            itemData={itemData}
                        >
                            {ToiletItem}
                        </List>
                    </div>
                </div>
            </div>

            {selectedToilet && (
                <ToiletCard toilet={selectedToilet} onClose={handleCloseToilet} />
            )}
        </div>
    );
};

export default ListView;
