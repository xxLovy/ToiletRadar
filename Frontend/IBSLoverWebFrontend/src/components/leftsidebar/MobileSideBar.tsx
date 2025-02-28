"use client";
import React, { useState } from 'react'
import SearchBox from './SearchBox'
import { Button } from '../ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { checkboxItems } from '../../../constants'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setWomen, setMen, setAccessible, setChildren, setFree, setGenderNeutral } from '@/redux/filter'
import { selectListState, setListStateReverse } from '@/redux/listView';
import { Filter, List } from 'lucide-react';

const MobileSideBar = () => {
    const dispatch = useAppDispatch();
    const showListView = useAppSelector(selectListState)

    const [selectedFeatures, setSelectedFeatures] = useState<{ [key: string]: boolean }>({
        women: false,
        men: false,
        accessible: false,
        children: false,
        free: true,
        genderNeutral: false,
    });

    const handleCheckboxChange = (key: string) => {
        const newValue = !selectedFeatures[key];
        setSelectedFeatures({
            ...selectedFeatures,
            [key]: newValue
        });
        switch (key) {
            case 'women':
                dispatch(setWomen(newValue));
                break;
            case 'men':
                dispatch(setMen(newValue));
                break;
            case 'accessible':
                dispatch(setAccessible(newValue));
                break;
            case 'children':
                dispatch(setChildren(newValue));
                break;
            case 'free':
                dispatch(setFree(newValue));
                break;
            case 'genderNeutral':
                dispatch(setGenderNeutral(newValue));
                break;
        }
    };

    const handleList = () => {
        dispatch(setListStateReverse());
    };

    const handleResetFilters = () => {
        const resetState = {
            women: false,
            men: false,
            accessible: false,
            children: false,
            free: false,
            genderNeutral: false,
        };
        setSelectedFeatures(resetState);
        Object.keys(resetState).forEach(key => {
            handleCheckboxChange(key);
        });
    };

    return (
        <div className="p-4 space-y-3">
            <SearchBox />
            <div className="flex gap-2">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="flex-1 gap-2">
                            <Filter className="w-4 h-4" />
                            Filter
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[280px]">
                        <SheetHeader>
                            <SheetTitle className="text-lg font-semibold">Filters</SheetTitle>
                        </SheetHeader>
                        <div className="py-6">
                            <div className="space-y-4">
                                {checkboxItems.map((checkbox, idx) => (
                                    <label key={idx} className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                            checked={selectedFeatures[checkbox.key]}
                                            onChange={() => handleCheckboxChange(checkbox.key)}
                                        />
                                        <span className="text-sm font-medium">{checkbox.label}</span>
                                    </label>
                                ))}
                            </div>
                            <Button
                                variant="ghost"
                                className="w-full mt-6 text-sm text-gray-600"
                                onClick={handleResetFilters}
                            >
                                Reset Filters
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>

                <Button
                    variant="outline"
                    onClick={handleList}
                    className="flex-1 gap-2"
                >
                    <List className="w-4 h-4" />
                    {showListView ? "Hide List" : "Show List"}
                </Button>
            </div>
        </div>
    )
}

export default MobileSideBar