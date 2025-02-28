"use client"
import React, { useState } from 'react';
import { sidebarItems, checkboxItems } from '../../../constants';
import { fetchCurrentLocation } from '@/redux/pin/operations';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectListState, setListStateReverse } from '@/redux/listView';
import { setAccessible, setChildren, setFree, setGenderNeutral, setMen, setWomen } from '@/redux/filter';
import { useRouter } from 'next/navigation';
import { selectError, selectSuccess } from '@/redux/pin/slice';
import { useToast } from '../ui/use-toast';
import { Check, RotateCcw, ChevronDown } from 'lucide-react';

const SidebarItems = () => {
    const dispatch = useAppDispatch();
    const [filterState, setFilterState] = useState(false);
    const [selectedFeatures, setSelectedFeatures] = useState<{ [key: string]: boolean }>({
        women: false,
        men: false,
        accessible: false,
        children: false,
        free: true,
        genderNeutral: false,
    });
    const showListView = useAppSelector(selectListState)
    const router = useRouter();
    const success = useAppSelector(selectSuccess)
    const { toast } = useToast();

    const handleFilter = () => {
        setFilterState(!filterState);
    };

    const resetFilters = () => {
        const defaultState = {
            women: false,
            men: false,
            accessible: false,
            children: false,
            free: true,
            genderNeutral: false,
        };
        setSelectedFeatures(defaultState);
        // Reset Redux state
        dispatch(setWomen(false));
        dispatch(setMen(false));
        dispatch(setAccessible(false));
        dispatch(setChildren(false));
        dispatch(setFree(true));
        dispatch(setGenderNeutral(false));
    };

    const handleAdd = () => {
        if (!success) {
            toast({
                variant: "destructive",
                title: "Cannot get your current location",
                description: "Please click PANIC! and give IBSLover the permission before adding a toilet.",
            })
        } else {
            router.push("/addToilet")
        }
    };

    const handleFind = () => {
        dispatch(fetchCurrentLocation());
    };

    const handleList = () => {
        dispatch(setListStateReverse());
    };

    const handleClick = (clickType: "Filter" | "Add" | "Find" | "List") => {
        switch (clickType) {
            case "Filter":
                return handleFilter();
            case "Add":
                return handleAdd();
            case "Find":
                return handleFind();
            case "List":
                return handleList();
        }
    };

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

    return (
        <div className='flex pb-5'>
            <ul className='flex flex-col w-full space-y-1'>
                {sidebarItems.map((item, index) => (
                    <li key={index * 10} className='relative'>
                        <button
                            onClick={() => handleClick(item.click as "Filter" | "Add" | "Find" | "List")}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none
                                ${item.click === "Filter" && filterState ? 'bg-white text-gray-900' : 'hover:bg-gray-100'}
                                ${showListView && item.click === "List" ? 'text-red-600' : 'text-gray-700'}
                                font-medium text-sm flex items-center justify-between`}
                        >
                            <span>{(showListView && item.lable2) ? item.lable2 : item.lable}</span>
                            {item.click === "Filter" && (
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${filterState ? 'rotate-180' : ''}`} />
                            )}
                        </button>
                        {item.click === "Filter" && filterState && (
                            <div className="mt-1 bg-white rounded-lg">
                                <div className="p-4 space-y-3">
                                    {checkboxItems.map((checkbox, idx) => (
                                        <label key={idx * 100} className="flex items-center space-x-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="w-5 h-5 border-2 border-gray-300 rounded appearance-none cursor-pointer checked:bg-red-500 checked:border-red-500"
                                                    checked={selectedFeatures[checkbox.key]}
                                                    onChange={() => handleCheckboxChange(checkbox.key)}
                                                />
                                                <Check className={`w-4 h-4 text-white absolute left-0.5 top-0.5 pointer-events-none ${selectedFeatures[checkbox.key] ? 'opacity-100' : 'opacity-0'}`} />
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <img src="/placeholder-icon.png" alt="" className="w-5 h-5" />
                                                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                                    {checkbox.label}
                                                </span>
                                            </div>
                                        </label>
                                    ))}
                                    <button
                                        onClick={resetFilters}
                                        className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                        <span>Reset Filters</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SidebarItems;