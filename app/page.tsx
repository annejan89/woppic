"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ChevronDown, ChevronLeft, ChevronRight, Edit, Plus, Filter, Menu } from "lucide-react";

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

export default function OrderPortal() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(2);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter and search functionality
  const filteredOrders = useMemo(() => {
    let filtered = orders;

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Group orders by status for display
  const groupedOrders = useMemo(() => {
    const groups = {
      nieuw: currentOrders.filter(order => order.status === "nieuw"),
      in_progress: currentOrders.filter(order => order.status === "in_progress"),
      completed: currentOrders.filter(order => order.status === "completed")
    };
    return groups;
  }, [currentOrders]);

  const handleEdit = (orderId: string) => {
    router.push(`/bestelling/${orderId}`);
  };

  const handleAddNew = () => {
    alert("Nieuwe bestelling toevoegen");
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "nieuw":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-orange-100 text-orange-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusDisplayName = (status: string) => {
    switch (status) {
      case "nieuw":
        return "Nieuw";
      case "in_progress":
        return "In behandeling";
      case "completed":
        return "Voltooid";
      default:
        return status;
    }
  };

  // Mobile card component for orders
  const OrderCard = ({ order }: { order: typeof orders[0] }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="font-mono text-sm font-medium text-gray-900">#{order.id}</p>
          <p className="text-sm text-gray-600 mt-1">{order.customerName}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
          {getStatusDisplayName(order.status)}
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-800">{order.address}</p>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{order.photos} foto's</span>
          <span>{order.date}</span>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleEdit(order.id)}
        className="w-full text-[#080D31] hover:bg-gray-100 justify-start"
      >
        ✏️ Bewerken
      </Button>
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
          {/* Title and Add Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black tracking-tight">
              Bestellingen
            </h1>
            <Button
              onClick={handleAddNew}
              className="bg-[#080D31] hover:bg-[#080D31]/90 w-full sm:w-auto"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Nieuwe bestelling</span>
              <span className="sm:hidden">Nieuw</span>
            </Button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
              <Input
                placeholder="Zoeken op ID, adres of klant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 sm:pl-12 h-10 sm:h-12 text-sm sm:text-base border-gray-200"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 h-10 sm:h-12">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter op status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle statussen</SelectItem>
                <SelectItem value="nieuw">Nieuw</SelectItem>
                <SelectItem value="in_progress">In behandeling</SelectItem>
                <SelectItem value="completed">Voltooid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block border border-gray-200 rounded-lg overflow-hidden mb-10">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-32 font-medium text-black px-3 py-2">
                    ID
                  </TableHead>
                  <TableHead className="font-medium text-black px-3 py-2">
                    Adres
                  </TableHead>
                  <TableHead className="w-32 font-medium text-black text-center px-3 py-2">
                    Aantal Foto's
                  </TableHead>
                  <TableHead className="w-32 font-medium text-black px-3 py-2">
                    Status
                  </TableHead>
                  <TableHead className="w-24 font-medium text-black text-right px-3 py-2">
                    Acties
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Category: Nieuw */}
                {groupedOrders.nieuw.length > 0 && statusFilter === "all" && (
                  <>
                    <TableRow className="bg-gray-50">
                      <TableCell colSpan={5} className="font-medium text-[#45556C] px-3 py-2">
                        Nieuw ({groupedOrders.nieuw.length})
                      </TableCell>
                    </TableRow>
                    {groupedOrders.nieuw.map((order) => (
                      <TableRow key={order.id} className="hover:bg-gray-50">
                        <TableCell className="px-3 py-2 text-base font-mono">{order.id}</TableCell>
                        <TableCell className="px-3 py-2 text-base">{order.address}</TableCell>
                        <TableCell className="px-3 py-2 text-base text-center">
                          {order.photos}
                        </TableCell>
                        <TableCell className="px-3 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
                            {getStatusDisplayName(order.status)}
                          </span>
                        </TableCell>
                        <TableCell className="px-3 py-2 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(order.id)}
                            className="text-[#080D31] hover:bg-gray-100 h-auto p-1"
                          >
                            ✏️ Bewerken
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}

                {/* Category: In behandeling */}
                {groupedOrders.in_progress.length > 0 && statusFilter === "all" && (
                  <>
                    <TableRow className="bg-gray-50">
                      <TableCell colSpan={5} className="font-medium text-[#45556C] px-3 py-2">
                        In behandeling ({groupedOrders.in_progress.length})
                      </TableCell>
                    </TableRow>
                    {groupedOrders.in_progress.map((order) => (
                      <TableRow key={order.id} className="hover:bg-gray-50">
                        <TableCell className="px-3 py-2 text-base font-mono">{order.id}</TableCell>
                        <TableCell className="px-3 py-2 text-base">{order.address}</TableCell>
                        <TableCell className="px-3 py-2 text-base text-center">
                          {order.photos}
                        </TableCell>
                        <TableCell className="px-3 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
                            {getStatusDisplayName(order.status)}
                          </span>
                        </TableCell>
                        <TableCell className="px-3 py-2 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(order.id)}
                            className="text-[#080D31] hover:bg-gray-100 h-auto p-1"
                          >
                            ✏️ Bewerken
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}

                {/* Category: Voltooid / Gearchiveerd */}
                {groupedOrders.completed.length > 0 && statusFilter === "all" && (
                  <>
                    <TableRow className="bg-gray-50">
                      <TableCell colSpan={5} className="font-medium text-[#45556C] px-3 py-2">
                        Voltooid / Gearchiveerd ({groupedOrders.completed.length})
                      </TableCell>
                    </TableRow>
                    {groupedOrders.completed.map((order) => (
                      <TableRow key={order.id} className="hover:bg-gray-50">
                        <TableCell className="px-3 py-2 text-base font-mono">{order.id}</TableCell>
                        <TableCell className="px-3 py-2 text-base">{order.address}</TableCell>
                        <TableCell className="px-3 py-2 text-base text-center">
                          {order.photos}
                        </TableCell>
                        <TableCell className="px-3 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
                            {getStatusDisplayName(order.status)}
                          </span>
                        </TableCell>
                        <TableCell className="px-3 py-2 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(order.id)}
                            className="text-[#080D31] hover:bg-gray-100 h-auto p-1"
                          >
                            ✏️ Bewerken
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}

                {/* When filter is applied, show all orders in simple format */}
                {statusFilter !== "all" &&
                  filteredOrders.slice(startIndex, endIndex).map((order) => (
                    <TableRow key={order.id} className="hover:bg-gray-50">
                      <TableCell className="px-3 py-2 text-base font-mono">{order.id}</TableCell>
                      <TableCell className="px-3 py-2 text-base">{order.address}</TableCell>
                      <TableCell className="px-3 py-2 text-base text-center">
                        {order.photos}
                      </TableCell>
                      <TableCell className="px-3 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
                          {getStatusDisplayName(order.status)}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 py-2 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(order.id)}
                          className="text-[#080D31] hover:bg-gray-100 h-auto p-1"
                        >
                          ✏️ Bewerken
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                }

                {/* Empty state */}
                {filteredOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      Geen bestellingen gevonden
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden mb-8">
            {/* Category headers for mobile */}
            {statusFilter === "all" && (
              <div className="space-y-6">
                {/* Nieuw */}
                {groupedOrders.nieuw.length > 0 && (
                  <div>
                    <h3 className="font-medium text-[#45556C] mb-3 text-sm">
                      Nieuw ({groupedOrders.nieuw.length})
                    </h3>
                    <div className="space-y-3">
                      {groupedOrders.nieuw.map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  </div>
                )}

                {/* In behandeling */}
                {groupedOrders.in_progress.length > 0 && (
                  <div>
                    <h3 className="font-medium text-[#45556C] mb-3 text-sm">
                      In behandeling ({groupedOrders.in_progress.length})
                    </h3>
                    <div className="space-y-3">
                      {groupedOrders.in_progress.map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Voltooid */}
                {groupedOrders.completed.length > 0 && (
                  <div>
                    <h3 className="font-medium text-[#45556C] mb-3 text-sm">
                      Voltooid / Gearchiveerd ({groupedOrders.completed.length})
                    </h3>
                    <div className="space-y-3">
                      {groupedOrders.completed.map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Filtered results */}
            {statusFilter !== "all" && (
              <div className="space-y-3">
                {filteredOrders.slice(startIndex, endIndex).map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}

            {/* Empty state for mobile */}
            {filteredOrders.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>Geen bestellingen gevonden</p>
              </div>
            )}
          </div>

          {/* Footer with Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
              {filteredOrders.length > 0 ? (
                `${startIndex + 1} - ${Math.min(endIndex, filteredOrders.length)} van ${filteredOrders.length} resultaten`
              ) : (
                "0 resultaten"
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Pagination */}
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
                  {totalPages - 1}
                </Button>

                <Button variant="ghost" size="sm" className="w-8 h-8 sm:w-10 sm:h-10 border-r border-gray-200 text-xs sm:text-sm">
                  {totalPages}
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

              {/* Items per page */}
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
