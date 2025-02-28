"use client"
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { X, Navigation } from 'lucide-react';

interface ToiletCardProps {
    toilet: Toilet;
    onClose: () => void;
}

const ToiletCard: React.FC<ToiletCardProps> = ({ toilet, onClose }) => {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg transition-transform transform translate-y-full animate-slide-up z-50">
            <div className="relative p-4">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold">{toilet.name}</h2>
                    <button
                        onClick={onClose}
                        className="text-red-500 hover:bg-red-50 rounded-full p-1"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mb-6">
                    <Button className="bg-teal-500 hover:bg-teal-600 text-white" asChild>
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${toilet.location?.coordinates[1]},${toilet.location?.coordinates[0]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                        >
                            <Navigation className="w-4 h-4" />
                            Directions
                        </a>
                    </Button>
                    {toilet.isFromUser && (
                        <Button variant="outline" className="border-gray-300 gap-2" asChild>
                            <Link href={`/${toilet._id}/editToilet`} className="flex items-center">
                                Edit Info
                            </Link>
                        </Button>
                    )}
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-3 gap-8">
                    {/* Features Column */}
                    <div>
                        <h3 className="font-semibold mb-2">Features</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center justify-between">
                                <span>Women</span>
                                <span>{toilet.features?.women === 'yes' ? '✓' : toilet.features?.women === 'no' ? '✕' : '?'}</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span>Men</span>
                                <span>{toilet.features?.men === 'yes' ? '✓' : toilet.features?.men === 'no' ? '✕' : '?'}</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span>Accessible</span>
                                <span>{toilet.features?.accessible === 'yes' ? '✓' : toilet.features?.accessible === 'no' ? '✕' : '?'}</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span>Gender Neutral</span>
                                <span>{toilet.features?.genderNeutral === 'yes' ? '✓' : toilet.features?.genderNeutral === 'no' ? '✕' : '?'}</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span>Children</span>
                                <span>{toilet.features?.children === 'yes' ? '✓' : toilet.features?.children === 'no' ? '✕' : '?'}</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span>Free</span>
                                <span>{toilet.features?.free === 'yes' ? '✓' : toilet.features?.free === 'no' ? '✕' : '?'}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Notes Column */}
                    <div>
                        <h3 className="font-semibold mb-2">Notes</h3>
                        <p className="text-gray-600">{toilet.description || 'No additional notes'}</p>
                    </div>

                    {/* Opening Hours Column */}
                    <div>
                        <h3 className="font-semibold mb-2">Opening Hours</h3>
                        <ul className="space-y-2">
                            {(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const).map((day) => (
                                <li key={day} className="flex justify-between">
                                    <span className="capitalize">{day}</span>
                                    <span className="text-gray-600">
                                        {toilet.openingHours?.[day] || 'Unknown'}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-xs text-gray-500 mt-4">
                            Hours may vary with national holidays or seasonal changes. If you know these hours to be out of date, please edit this toilet.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                        <span>Is this information correct?</span>
                        <button className="px-2 py-1 bg-green-50 text-green-700 rounded">Yes</button>
                        <span>No?</span>
                        <Button variant="outline" size="sm" className="h-6 px-2" asChild>
                            <Link href={`/${toilet._id}/editToilet`}>Edit</Link>
                        </Button>
                    </div>
                    <p className="mt-1">Last verified: {new Date(toilet.lastUpdateTime).toLocaleString()}</p>
                </div>
            </div>

            <style jsx>{`
                @keyframes slide-up {
                    0% {
                        transform: translateY(100%);
                    }
                    100% {
                        transform: translateY(0);
                    }
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ToiletCard;
