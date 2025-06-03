"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { ArrowLeft, ChevronDown } from "lucide-react";

// Dummy data voor bestellingen
const orders = [
    {
        id: "342423",
        address: "Koornbeursweg 75E, Heerenveen",
        photos: 25,
        status: "nieuw",
        category: "Nieuw",
        date: "2024-01-15",
        customerName: "Jan de Vries"
    },
    {
        id: "342424",
        address: "Hoofdstraat 123, Amsterdam",
        photos: 18,
        status: "in_progress",
        category: "In behandeling",
        date: "2024-01-14",
        customerName: "Maria Janssen"
    },
    {
        id: "342425",
        address: "Marktplein 45, Utrecht",
        photos: 32,
        status: "completed",
        category: "Voltooid / Gearchiveerd",
        date: "2024-01-13",
        customerName: "Piet van der Berg"
    },
    {
        id: "342426",
        address: "Kerkstraat 67, Rotterdam",
        photos: 12,
        status: "nieuw",
        category: "Nieuw",
        date: "2024-01-12",
        customerName: "Lisa Bakker"
    },
    {
        id: "342427",
        address: "Stationsweg 89, Den Haag",
        photos: 28,
        status: "completed",
        category: "Voltooid / Gearchiveerd",
        date: "2024-01-11",
        customerName: "Tom Smits"
    },
    {
        id: "342428",
        address: "Dorpsstraat 156, Eindhoven",
        photos: 15,
        status: "in_progress",
        category: "In behandeling",
        date: "2024-01-10",
        customerName: "Anna van Dijk"
    },
    {
        id: "342429",
        address: "Nieuwstraat 234, Groningen",
        photos: 41,
        status: "nieuw",
        category: "Nieuw",
        date: "2024-01-09",
        customerName: "Mark Hendriks"
    },
    {
        id: "342430",
        address: "Oudegracht 78, Utrecht",
        photos: 22,
        status: "completed",
        category: "Voltooid / Gearchiveerd",
        date: "2024-01-08",
        customerName: "Sandra Jansen"
    },
    {
        id: "342431",
        address: "Lange Voorhout 91, Den Haag",
        photos: 36,
        status: "in_progress",
        category: "In behandeling",
        date: "2024-01-07",
        customerName: "Robert Visser"
    },
    {
        id: "342432",
        address: "Kalverstraat 123, Amsterdam",
        photos: 19,
        status: "nieuw",
        category: "Nieuw",
        date: "2024-01-06",
        customerName: "Eva de Jong"
    }
];

// Generate dummy photos for each order
const generatePhotos = (orderId: string, count: number) => {
    const photos = [];
    for (let i = 1; i <= count; i++) {
        const statuses = ['normaal', 'bewerkt', 'afgekeurd'];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        photos.push({
            id: `${orderId}-foto-${i}`,
            url: `https://images.unsplash.com/photo-${1500000000000 + i}?w=400&h=300&fit=crop&auto=format`,
            status: status,
            name: `Foto ${i}.jpg`
        });
    }
    return photos;
};

export default function OrderDetail() {
    const router = useRouter();
    const params = useParams();
    const orderId = params.id as string;

    const order = orders.find(o => o.id === orderId);
    const [isCompleting, setIsCompleting] = useState(false);

    if (!order) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-medium text-gray-900 mb-4">Bestelling niet gevonden</h1>
                    <Button onClick={() => router.push('/')} variant="outline">
                        Terug naar overzicht
                    </Button>
                </div>
            </div>
        );
    }

    const photos = generatePhotos(orderId, order.photos);

    const handleBack = () => {
        router.push('/');
    };

    const handlePhotoClick = (photoId: string) => {
        router.push(`/bestelling/${orderId}/foto/${photoId}`);
    };

    const handleMarkCompleted = async () => {
        setIsCompleting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsCompleting(false);
        alert('Bestelling gemarkeerd als voltooid!');
    };

    const getPhotoStatusColor = (status: string) => {
        switch (status) {
            case 'normaal':
                return 'bg-green-500';
            case 'bewerkt':
                return 'bg-blue-500';
            case 'afgekeurd':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

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
            <main className="px-4 sm:px-8 lg:px-[168px] py-6 sm:py-12 lg:py-24">
                <div className="max-w-[1104px] mx-auto">
                    {/* Back Button and Title */}
                    <div className="flex items-center gap-4 mb-6 sm:mb-8">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleBack}
                            className="text-gray-600 hover:text-gray-900 p-1 sm:p-2"
                        >
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                            <span className="text-sm sm:text-base">Terug</span>
                        </Button>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-medium text-black">
                            Bestelling #{order.id}
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Left Column - Info Table */}
                        <div className="lg:col-span-1">
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <h2 className="font-medium text-gray-900">Bestelling Details</h2>
                                </div>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium text-gray-600 py-3 px-4">ID</TableCell>
                                            <TableCell className="py-3 px-4 font-mono">{order.id}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium text-gray-600 py-3 px-4">Klant</TableCell>
                                            <TableCell className="py-3 px-4">{order.customerName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium text-gray-600 py-3 px-4">Adres</TableCell>
                                            <TableCell className="py-3 px-4">{order.address}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium text-gray-600 py-3 px-4">Foto&apos;s</TableCell>
                                            <TableCell className="py-3 px-4">{order.photos}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium text-gray-600 py-3 px-4">Status</TableCell>
                                            <TableCell className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === "nieuw" ? "bg-blue-100 text-blue-800" :
                                                    order.status === "in_progress" ? "bg-orange-100 text-orange-800" :
                                                        "bg-green-100 text-green-800"
                                                    }`}>
                                                    {order.status === "nieuw" ? "Nieuw" :
                                                        order.status === "in_progress" ? "In behandeling" : "Voltooid"}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium text-gray-600 py-3 px-4">Datum</TableCell>
                                            <TableCell className="py-3 px-4">{order.date}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>

                                {/* Action Button */}
                                {order.status !== "completed" && (
                                    <div className="p-4 border-t border-gray-200">
                                        <Button
                                            onClick={handleMarkCompleted}
                                            disabled={isCompleting}
                                            className="w-full bg-[#080D31] hover:bg-[#080D31]/90"
                                        >
                                            {isCompleting ? "Markeren..." : "Markeer als voltooid"}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Photo Grid */}
                        <div className="lg:col-span-2">
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <h2 className="font-medium text-gray-900">Foto&apos;s ({photos.length})</h2>
                                </div>

                                <div className="p-4 sm:p-6">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                                        {photos.map((photo) => (
                                            <div
                                                key={photo.id}
                                                className="relative group cursor-pointer"
                                                onClick={() => handlePhotoClick(photo.id)}
                                            >
                                                <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                                    <img
                                                        src={photo.url}
                                                        alt={photo.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                    />

                                                    {/* Status Badge */}
                                                    <div className="absolute top-2 right-2">
                                                        <div className={`w-3 h-3 rounded-full ${getPhotoStatusColor(photo.status)} border-2 border-white shadow-sm`} />
                                                    </div>
                                                </div>

                                                {/* Photo Name */}
                                                <p className="text-xs text-gray-600 mt-1 truncate text-center">
                                                    {photo.name}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
} 