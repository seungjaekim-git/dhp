"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, ChevronDown, MoreHorizontal, Filter, X, ChevronRight, User, Building2, BarChart2, Calendar } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import FloatingScrollbar from './FloatingScrollbar';

interface TeamMember {
    id: number;
    name: string;
    status: string;
    role: string;
    department: string;
    location: string;
    salary: number;
    startDate: string;
    lastActive: string;
    progress: number;
    projects: number;
    tasksDone: number;
    tasksTotal: number;
    experience: string;
    team: string;
    performance: number;
}

interface ColumnGroup {
    id: string;
    title: string;
    columns: string[];
    isOpen: boolean;
    icon: React.ReactNode;
}

interface ColumnWidth {
    [key: string]: number;
}

const DataTable = () => {
    // 서버 사이드 렌더링 시 초기값 설정 방지
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [sortBy, setSortBy] = useState<{ column: keyof TeamMember | null, direction: 'asc' | 'desc' }>({ column: null, direction: 'asc' });
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const itemsPerPage = 20;
    const tableRef = useRef<HTMLTableElement>(null);

    // Column grouping state
    const [columnGroups, setColumnGroups] = useState<ColumnGroup[]>([
        {
            id: 'basic',
            title: 'Basic Information',
            columns: ['name', 'status', 'role'],
            isOpen: true,
            icon: <User className="w-4 h-4" />
        },
        {
            id: 'organization',
            title: 'Organization',
            columns: ['department', 'location', 'team'],
            isOpen: true,
            icon: <Building2 className="w-4 h-4" />
        },
        {
            id: 'performance',
            title: 'Performance Metrics',
            columns: ['projects', 'tasks', 'experience', 'performance', 'progress'],
            isOpen: true,
            icon: <BarChart2 className="w-4 h-4" />
        },
        {
            id: 'dates',
            title: 'Dates',
            columns: ['startDate', 'lastActive'],
            isOpen: true,
            icon: <Calendar className="w-4 h-4" />
        }
    ]);

    // Toggle column group
    const toggleColumnGroup = (groupId: string) => {
        setColumnGroups(prev => prev.map(group =>
            group.id === groupId ? { ...group, isOpen: !group.isOpen } : group
        ));
    };

    // Sample data with proper typing
    const data: TeamMember[] = [
        {
            id: 1,
            name: "Kim Minsu",
            status: "Active",
            role: "Developer",
            department: "Engineering",
            location: "Seoul",
            salary: 75000,
            startDate: "2023-01-15",
            lastActive: "2024-01-09",
            progress: 75,
            projects: 12,
            tasksDone: 156,
            tasksTotal: 189,
            experience: "5 years",
            team: "Frontend",
            performance: 4.5
        },
    ];

    // Generate 30 rows of test data
    const expandedData: TeamMember[] = Array.from({ length: 30 }, (_, index) => ({
        ...data[0],
        id: index + 1,
        name: [
            "Kim Minsu", "Lee Jieun", "Park Jiho", "Choi Yuna", "Jung Minho",
            "Kang Sora", "Yoo Jaesuk", "Shin Mina", "Kwon Yuri", "Han Jimin",
            "Bae Suzy", "Im Siwan", "Song Joongki", "Park Bogum", "Lee Minho",
            "Kim Sohyun", "Jung Haein", "Seo Yeji", "Kim Goeun", "Nam Joohyuk",
            "Park Seojoon", "IU", "Ryu Junyeol", "Kim Taeri", "Jo Insung",
            "Son Yejin", "Gong Yoo", "Kim Woobin", "Lee Jongsuk", "Park Minyoung"
        ][index],
        progress: Math.floor(Math.random() * 100),
        status: ["Active", "Offline", "Away"][Math.floor(Math.random() * 3)],
        role: ["Developer", "Designer", "Manager", "QA", "DevOps"][Math.floor(Math.random() * 5)],
        department: ["Engineering", "Design", "Product", "Marketing"][Math.floor(Math.random() * 4)],
        location: ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon"][Math.floor(Math.random() * 5)],
        team: ["Frontend", "Backend", "Mobile", "AI", "Cloud"][Math.floor(Math.random() * 5)],
        performance: Number((Math.random() * 2 + 3).toFixed(1)),
        projects: Math.floor(Math.random() * 20 + 5),
        tasksDone: Math.floor(Math.random() * 200 + 50),
        tasksTotal: Math.floor(Math.random() * 300 + 100),
        experience: `${Math.floor(Math.random() * 10 + 1)} years`
    }));

    const [filters, setFilters] = useState({
        status: '',
        role: '',
        department: '',
        location: '',
        team: ''
    });

    // 상태 관리 및 핸들러 함수들
    const totalPages = Math.ceil(expandedData.length / itemsPerPage);
    const [sortConfig, setSortConfig] = useState<{
        key: keyof TeamMember | null;
        direction: 'asc' | 'desc'
    }>({
        key: null,
        direction: 'asc'
    });

    // 정렬 핸들러
    const handleSort = (key: keyof TeamMember) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    // 행 선택 핸들러
    const handleRowSelect = (id: number) => {
        setSelectedRows(prev =>
            prev.includes(id)
                ? prev.filter(rowId => rowId !== id)
                : [...prev, id]
        );
    };

    // 전체 선택 핸들러
    const handleBulkSelect = () => {
        setSelectedRows(prev =>
            prev.length === expandedData.length
                ? []
                : expandedData.map(row => row.id)
        );
    };

    // 필터 핸들러
    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // 필터링된 데이터
    const filteredData = expandedData.filter(row => {
        return Object.entries(filters).every(([key, value]) => {
            if (!value) return true;
            return row[key as keyof TeamMember].toString().toLowerCase().includes(value.toLowerCase());
        });
    });

    if (!mounted) {
        return null;
    }

    return (
        <div className="p-6 space-y-4">
            {/* Table Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Team Members</h2>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Filter size={16} />
                                Filters
                                {Object.values(filters).some(Boolean) && (
                                    <Badge variant="secondary" className="ml-2">
                                        {Object.values(filters).filter(Boolean).length}
                                    </Badge>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>필터</SheetTitle>
                                <SheetDescription>
                                    원하는 조건으로 필터링하세요
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="mb-2 text-sm font-medium">Status</h4>
                                        <Select
                                            value={filters.status}
                                            onValueChange={(value) => handleFilterChange('status', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="All">All</SelectItem>
                                                <SelectItem value="Active">Active</SelectItem>
                                                <SelectItem value="Offline">Offline</SelectItem>
                                                <SelectItem value="Away">Away</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Separator />
                                    <div>
                                        <h4 className="mb-2 text-sm font-medium">Role</h4>
                                        <Select
                                            value={filters.role}
                                            onValueChange={(value) => handleFilterChange('role', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="All">All</SelectItem>
                                                <SelectItem value="Developer">Developer</SelectItem>
                                                <SelectItem value="Designer">Designer</SelectItem>
                                                <SelectItem value="Manager">Manager</SelectItem>
                                                <SelectItem value="QA">QA</SelectItem>
                                                <SelectItem value="DevOps">DevOps</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Separator />
                                    <div>
                                        <h4 className="mb-2 text-sm font-medium">Department</h4>
                                        <Select
                                            value={filters.department}
                                            onValueChange={(value) => handleFilterChange('department', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select department" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="All">All</SelectItem>
                                                <SelectItem value="Engineering">Engineering</SelectItem>
                                                <SelectItem value="Design">Design</SelectItem>
                                                <SelectItem value="Product">Product</SelectItem>
                                                <SelectItem value="Marketing">Marketing</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Separator />
                                    <div>
                                        <h4 className="mb-2 text-sm font-medium">Location</h4>
                                        <Select
                                            value={filters.location}
                                            onValueChange={(value) => handleFilterChange('location', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select location" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="All">All</SelectItem>
                                                <SelectItem value="Seoul">Seoul</SelectItem>
                                                <SelectItem value="Busan">Busan</SelectItem>
                                                <SelectItem value="Incheon">Incheon</SelectItem>
                                                <SelectItem value="Daegu">Daegu</SelectItem>
                                                <SelectItem value="Daejeon">Daejeon</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Separator />
                                    <div>
                                        <h4 className="mb-2 text-sm font-medium">Team</h4>
                                        <Select
                                            value={filters.team}
                                            onValueChange={(value) => handleFilterChange('team', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select team" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="All">All</SelectItem>
                                                <SelectItem value="Frontend">Frontend</SelectItem>
                                                <SelectItem value="Backend">Backend</SelectItem>
                                                <SelectItem value="Mobile">Mobile</SelectItem>
                                                <SelectItem value="AI">AI</SelectItem>
                                                <SelectItem value="Cloud">Cloud</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setFilters({
                                        status: '',
                                        role: '',
                                        department: '',
                                        location: '',
                                        team: ''
                                    })}
                                >
                                    Reset
                                </Button>
                                <SheetTrigger asChild>
                                    <Button>Apply Filters</Button>
                                </SheetTrigger>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <button className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Add New
                    </button>
                </div>
            </div>

            {/* Table Container with Horizontal Scroll */}
            <div className="table">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>
                <table ref={tableRef} className="w-full relative overflow-scroll max-h-[600px]">
                    {/* 헤더 포함 */}
                    <thead className="sticky top-0 z-10 bg-gray-50">
                        <tr>
                            <th className="sticky left-0 bg-gray-50 px-4 py-3 text-left z-20 min-w-[300px]" rowSpan={2}>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.length === expandedData.length}
                                        onChange={handleBulkSelect}
                                        className="rounded"
                                    />
                                    <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort('name' as keyof TeamMember)}>
                                        <span>Name</span>
                                        <ArrowUpDown size={16} />
                                    </div>
                                </div>
                            </th>
                            {columnGroups.map(group => (
                                <th
                                    key={group.id}
                                    colSpan={group.isOpen ? group.columns.filter(col => col !== 'name').length : 1}
                                    className="px-4 py-2 text-left font-medium text-gray-600 border-b relative"
                                >
                                    <button
                                        className="flex items-center space-x-2"
                                        onClick={() => toggleColumnGroup(group.id)}
                                    >
                                        {group.isOpen ? (
                                            <>
                                                <ChevronDown size={16} />
                                                <span>{group.title}</span>
                                                {group.icon}
                                            </>
                                        ) : (
                                            <>
                                                <ChevronRight size={16} />
                                                {group.icon}
                                            </>
                                        )}
                                    </button>
                                </th>
                            ))}
                            <th className="sticky right-0 bg-gray-50 px-4 py-3 text-left font-medium text-gray-600 z-20" rowSpan={2}>
                                Actions
                            </th>
                        </tr>
                        <tr>
                            {columnGroups.map(group => (
                                group.isOpen ? (
                                    group.columns.filter(col => col !== 'name').map(column => (
                                        <th key={column} className="px-4 py-2 text-left font-medium text-gray-600">
                                            <ResizablePanel>
                                                <ResizableHandle withHandle={true} />
                                                <div className="relative">
                                                    <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort(column as keyof TeamMember)}>
                                                        <span>{column.charAt(0).toUpperCase() + column.slice(1)}</span>
                                                        <ArrowUpDown size={16} />
                                                    </div>
                                                </div>
                                            </ResizablePanel>
                                        </th>
                                    ))
                                ) : (
                                    <th key={group.id} className="px-4 py-2 text-left font-medium text-gray-600"></th>
                                )
                            ))}
                        </tr>
                    </thead>
                    {/* 바디 */}
                    <tbody className="divide-y">
                    {filteredData.map(row => (
                        <tr key={row.id} className="hover:bg-sky-100 cursor-pointer transition-colors group">
                        <td className="sticky left-0 px-4 py-3 min-w-[300px] z-5 bg-white group-hover:bg-sky-100 transition-colors">
                            <div className="flex items-center space-x-4">
                            <input
                                type="checkbox"
                                checked={selectedRows.includes(row.id)}
                                onChange={() => handleRowSelect(row.id)}
                                className="rounded"
                            />
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                {row.name.charAt(0)}
                                </div>
                                <div>
                                <div className="font-medium">{row.name}</div>
                                <div className="text-sm text-gray-500">user{row.id}@example.com</div>
                                </div>
                            </div>
                            </div>
                        </td>
                        {columnGroups.map(group =>
                            group.isOpen ? (
                            group.columns.map(column => (
                                <td key={column} className="px-4 py-3">
                                {row[column as keyof TeamMember]}
                                </td>
                            ))
                            ) : (
                            <td key={group.id} className="px-4 py-3"></td>
                            )
                        )}
                        <td className="sticky right-0 px-4 py-3 z-20 bg-white group-hover:bg-sky-100 transition-colors">
                            <button className="p-1 hover:bg-gray-100 rounded-lg">
                            <MoreHorizontal size={16} />
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </ResizablePanel>
            </ResizablePanelGroup>
            </div>

        <div className="table">
        <ResizablePanelGroup direction="horizontal">
            <table ref={tableRef} className="w-full relative overflow-scroll max-h-[600px]">
                <tbody className="divide-y">
                    {filteredData.map((row) => (
                        <tr key={row.id} className="hover:bg-sky-100 cursor-pointer transition-colors group">
                            <td className="sticky left-0 px-4 py-3 min-w-[300px] z-5 bg-white group-hover:bg-sky-100 transition-colors">
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(row.id)}
                                        onChange={() => handleRowSelect(row.id)}
                                        className="rounded"
                                    />
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                            {row.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium">{row.name}</div>
                                            <div className="text-sm text-gray-500">user{row.id}@example.com</div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            {columnGroups.map(group => (
                                group.isOpen ? (
                                    group.columns.filter(col => col !== 'name').map(column => (
                                        <td
                                            key={column}
                                            className="px-4 py-3"
                                        >
                                            {column === 'status' ? (
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${row[column] === 'Active' ? 'bg-green-100 text-green-800' :
                                                        row[column] === 'Offline' ? 'bg-gray-100 text-gray-800' :
                                                            'bg-yellow-100 text-yellow-800'}`}>
                                                    {row[column]}
                                                </span>
                                            ) : column === 'progress' ? (
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-24 bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-blue-500 h-2 rounded-full"
                                                            style={{ width: `${row[column]}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm text-gray-600">{row[column]}%</span>
                                                </div>
                                            ) : column === 'performance' ? (
                                                <div className="flex items-center space-x-1">
                                                    <span>{row[column]}</span>
                                                    <span className="text-yellow-500">★</span>
                                                </div>
                                            ) : column === 'tasks' ? (
                                                `${row.tasksDone}/${row.tasksTotal}`
                                            ) : (
                                                row[column as keyof TeamMember]
                                            )}
                                        </td>
                                    ))
                                ) : (
                                    <td key={group.id} className="px-4 py-3"></td>
                                )
                            ))}
                            <td className="sticky right-0 px-4 py-3 z-20 bg-white group-hover:bg-sky-100 transition-colors">
                                <button className="p-1 hover:bg-gray-100 rounded-lg">
                                    <MoreHorizontal size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </ResizablePanelGroup>
    </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                <div className="text-sm text-gray-600">
                    {selectedRows.length} of {filteredData.length} row(s) selected
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
