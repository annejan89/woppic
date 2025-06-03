"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    ChevronDown,
    Edit,
    Download,
    X
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Dummy data voor foto
const photoData = {
    id: 1,
    name: "IMG 12345",
    status: "normal",
    orderNumber: "342423"
};

export default function PhotoDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("upload");
    const [isRejected, setIsRejected] = useState(false);

    const handleEdit = () => {
        alert("Foto bewerken functionaliteit");
    };

    const handleDownload = () => {
        alert("Foto downloaden functionaliteit");
    };

    const handleReject = () => {
        setIsRejected(!isRejected);
        alert(isRejected ? "Foto goedgekeurd" : "Foto afgekeurd");
    };

    const tabs = [
        { id: "origineel", label: "Origineel", active: false },
        { id: "ai-edit", label: "AI Edit", active: false },
        { id: "upload", label: "Upload", active: true }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="flex items-center justify-between px-4 sm:px-8 lg:px-20 py-4 lg:py-6 bg-[#080D31]">
                <div className="flex items-center">
                    <div className="w-32 sm:w-40 lg:w-[185px] h-8 sm:h-10 lg:h-12 bg-white rounded mr-2 sm:mr-4 flex items-center justify-center">
                        <span className="text-[#080D31] font-bold text-sm sm:text-base lg:text-lg">WOPPIC</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback className="bg-gray-300 text-xs sm:text-sm">AJ</AvatarFallback>
                    </Avatar>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 p-1 sm:p-2">
                                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32 sm:w-40">
                            <DropdownMenuItem className="text-sm">Profiel</DropdownMenuItem>
                            <DropdownMenuItem className="text-sm">Uitloggen</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {/* Main Content */}
            <main className="px-4 sm:px-8 lg:px-[280px] py-6 sm:py-12 lg:py-24">
                <div className="max-w-[768px] mx-auto">

                    {/* Terug knop */}
                    <div className="flex items-center justify-start mb-4">
                        <Link href={`/bestelling/${params.id}`}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2 px-5 py-3 rounded-full border-gray-200"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Terug
                            </Button>
                        </Link>
                    </div>

                    {/* Tabs en Action Buttons */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6 mb-6">
                        {/* Tabs */}
                        <div className="relative">
                            <div className="flex justify-center items-end gap-6">
                                {/* Onderliggende lijn */}
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200"></div>

                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`relative pb-2 px-3 text-sm font-medium transition-colors ${activeTab === tab.id
                                                ? 'text-gray-900'
                                                : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        {tab.label}
                                        {activeTab === tab.id && (
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <Button
                                onClick={handleEdit}
                                variant="ghost"
                                size="sm"
                                className="text-gray-700 hover:bg-gray-50"
                            >
                                ✏️ Bewerken
                            </Button>
                            <Button
                                onClick={handleDownload}
                                variant="ghost"
                                size="sm"
                                className="text-gray-700 hover:bg-gray-50"
                            >
                                ☁️ Download
                            </Button>
                            <Button
                                onClick={handleReject}
                                variant="ghost"
                                size="sm"
                                className={`${isRejected ? 'text-green-700' : 'text-red-700'} hover:bg-gray-50`}
                            >
                                {isRejected ? '✅ Goedkeuren' : '🚫 Afkeuren'}
                            </Button>
                        </div>
                    </div>

                    {/* Foto Display */}
                    <div className="mb-8">
                        <div className="relative bg-gray-300 rounded-lg overflow-hidden w-full aspect-[4/3]">
                            {/* Placeholder voor foto - in productie zou dit een echte afbeelding zijn */}
                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
                                <div className="text-center">
                                    <span className="text-gray-600 text-lg font-medium block mb-2">
                                        {photoData.name}
                                    </span>
                                    <span className="text-gray-500 text-sm">
                                        Bestelling #{photoData.orderNumber}
                                    </span>
                                </div>
                            </div>

                            {/* Status overlay indien afgekeurd */}
                            {isRejected && (
                                <div className="absolute top-4 left-4">
                                    <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                        🚫 Afgekeurd
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info sectie (optioneel) */}
                    <div className="text-center text-gray-600">
                        <p className="text-sm">
                            Foto {params.photoId} van bestelling #{params.id}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            Tab: {tabs.find(tab => tab.id === activeTab)?.label}
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
} 