"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ArrowLeft,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Check
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Dummy data voor foto's met verschillende statussen
const photos = [
    { id: 1, name: "IMG 12345", status: "normal" },
    { id: 2, name: "IMG 12346", status: "rejected" },
    { id: 3, name: "IMG 12347", status: "edited" },
    { id: 4, name: "IMG 12348", status: "normal" },
    { id: 5, name: "IMG 12349", status: "normal" },
    { id: 6, name: "IMG 12350", status: "edited" },
    { id: 7, name: "IMG 12351", status: "normal" },
    { id: 8, name: "IMG 12352", status: "normal" },
    { id: 9, name: "IMG 12353", status: "normal" },
    { id: 10, name: "IMG 12354", status: "normal" },
];

// Dummy data voor bestelling details
const orderInfo = {
    id: "342423",
    status: "Nieuw",
    address: "Koornbeursweg 75E, Heerenveen",
    photoCount: 25,
    customerName: "Jan de Vries"
};

export default function OrderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(2);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isCompleted, setIsCompleted] = useState(false);

    const totalPages = Math.ceil(photos.length / itemsPerPage);

    const handleMarkAsCompleted = () => {
        setIsCompleted(!isCompleted);
        alert(isCompleted ? "Bestelling gemarkeerd als niet voltooid" : "Bestelling gemarkeerd als voltooid!");
    };

    const handlePhotoClick = (photoId: number) => {
        router.push(`/bestelling/${params.id}/foto/${photoId}`);
    };

    const getPhotoStatusBadge = (status: string) => {
        switch (status) {
            case "rejected":
                return (
                    <div className="absolute bottom-2 left-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        🚫 Afgekeurd
                    </div>
                );
            case "edited":
                return (
                    <div className="absolute bottom-2 left-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        ✏️ Bewerkt
                    </div>
                );
            default:
                return null;
        }
    };

    const PhotoCard = ({ photo }: { photo: typeof photos[0] }) => (
        <div className="flex flex-col gap-2">
            <div
                className="relative bg-gray-300 rounded-lg overflow-hidden aspect-square group cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                onClick={() => handlePhotoClick(photo.id)}
            >
                {/* Placeholder voor foto - in productie zou dit een echte afbeelding zijn */}
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
                    <span className="text-gray-600 text-sm">Foto {photo.id}</span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                    <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Klik om te bekijken
                    </span>
                </div>

                {/* Status badge */}
                {getPhotoStatusBadge(photo.status)}
            </div>

            {/* Foto info */}
            <div className="flex flex-col">
                <span className="font-medium text-sm text-gray-900">{photo.name}</span>
                <span className="text-xs text-gray-500">{photo.name}</span>
            </div>
        </div>
    );

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

                    {/* Terug knop */}
                    <div className="mb-6 lg:mb-10">
                        <Link href="/">
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

                    {/* Titel */}
                    <div className="mb-6 lg:mb-10">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black tracking-tight">
                            Bestelling #{orderInfo.id}
                        </h1>
                    </div>

                    {/* Markeer als voltooid knop en Info sectie */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6 mb-8 lg:mb-10">
                        <Button
                            onClick={handleMarkAsCompleted}
                            variant="ghost"
                            size="sm"
                            className={`self-start text-sm ${isCompleted ? 'text-green-700' : 'text-gray-700'} hover:bg-gray-50`}
                        >
                            <Check className="w-4 h-4 mr-2" />
                            {isCompleted ? '✅ Gemarkeerd als voltooid' : '✅ Markeer als voltooid'}
                        </Button>
                    </div>

                    {/* Info Tabel */}
                    <div className="mb-8 lg:mb-12">
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium text-black bg-gray-50 w-80">
                                            Status
                                        </TableCell>
                                        <TableCell className="text-black">
                                            {orderInfo.status}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium text-black bg-gray-50">
                                            Adres
                                        </TableCell>
                                        <TableCell className="text-black">
                                            {orderInfo.address}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium text-black bg-gray-50">
                                            Aantal foto's
                                        </TableCell>
                                        <TableCell className="text-black">
                                            {orderInfo.photoCount}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    {/* Foto Grid */}
                    <div className="mb-12">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                            {photos.map((photo) => (
                                <PhotoCard key={photo.id} photo={photo} />
                            ))}
                        </div>
                    </div>

                    {/* Footer met Paginering */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
                            1 - 10 van 120 resultaten
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            {/* Paginering */}
                            <div className="flex items-center border border-gray-200 rounded-sm shadow-sm">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-8 h-8 sm:w-10 sm:h-10 p-1 border-r border-gray-200"
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`w-8 h-8 sm:w-10 sm:h-10 border-r border-gray-200 text-xs sm:text-sm ${currentPage === 1 ? 'bg-[#080D31] text-white' : ''}`}
                                    onClick={() => setCurrentPage(1)}
                                >
                                    1
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`w-8 h-8 sm:w-10 sm:h-10 border-r border-gray-200 text-xs sm:text-sm ${currentPage === 2 ? 'bg-[#080D31] text-white' : ''}`}
                                    onClick={() => setCurrentPage(2)}
                                >
                                    2
                                </Button>

                                <Button variant="ghost" size="sm" className="w-8 h-8 sm:w-10 sm:h-10 border-r border-gray-200 text-xs sm:text-sm">
                                    ...
                                </Button>

                                <Button variant="ghost" size="sm" className="w-8 h-8 sm:w-10 sm:h-10 border-r border-gray-200 text-xs sm:text-sm">
                                    10
                                </Button>

                                <Button variant="ghost" size="sm" className="w-8 h-8 sm:w-10 sm:h-10 border-r border-gray-200 text-xs sm:text-sm">
                                    11
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-8 h-8 sm:w-10 sm:h-10 p-1"
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Button>
                            </div>

                            {/* Items per pagina */}
                            <div className="flex items-center gap-2">
                                <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                                    <SelectTrigger className="w-12 h-6 sm:w-16 sm:h-8 text-xs sm:text-sm">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="text-[#314158] font-medium text-xs sm:text-sm">per pagina</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
} 