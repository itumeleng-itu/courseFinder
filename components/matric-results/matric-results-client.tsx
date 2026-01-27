'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Filter, MapPin, Award, BookOpen, GraduationCap, X, ChevronDown, Check, LayoutDashboard } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SchoolResult {
  progressed: string;
  wrote: string;
  achieved: string;
  percentage: string;
}

interface School {
  district: string;
  emis: string;
  centreNo: string;
  name: string;
  quintile: string;
  results: {
    [year: string]: SchoolResult;
  };
}

interface MatricResultsClientProps {
  schools: School[];
}

export default function MatricResultsClient({ schools }: MatricResultsClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedQuintile, setSelectedQuintile] = useState('All');
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Extract unique districts and quintiles for filters
  const districts = useMemo(() => {
    const unique = new Set(schools.map(s => s.district).filter(d => d && d !== 'UNKNOWN'));
    return Array.from(unique).sort();
  }, [schools]);

  const quintiles = useMemo(() => {
    const unique = new Set(schools.map(s => s.quintile).filter(q => q && q !== '99'));
    return Array.from(unique).sort();
  }, [schools]);

  // Filtered schools for autocomplete
  const filteredSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];

    return schools.filter(school => {
      const matchesSearch = 
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        school.emis.includes(searchTerm) || 
        school.centreNo.includes(searchTerm);
      
      const matchesDistrict = selectedDistrict === 'All' || school.district === selectedDistrict;
      const matchesQuintile = selectedQuintile === 'All' || school.quintile === selectedQuintile;

      return matchesSearch && matchesDistrict && matchesQuintile;
    }).slice(0, 10);
  }, [schools, searchTerm, selectedDistrict, selectedQuintile]);

  const handleSelectSchool = (school: School) => {
    setSelectedSchool(school);
    setSearchTerm(school.name);
    setIsDropdownOpen(false);
  };

  const clearSelection = () => {
    setSelectedSchool(null);
    setSearchTerm('');
  };

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!selectedSchool) return [];
    
    return ['2023', '2024', '2025'].map(year => {
      const res = selectedSchool.results[year];
      return {
        year,
        percentage: res ? parseFloat(res.percentage) : 0,
        wrote: res ? parseInt(res.wrote) : 0,
        achieved: res ? parseInt(res.achieved) : 0,
      };
    });
  }, [selectedSchool]);

  return (
    <div className="flex flex-col h-full">
      {/* Header - Matches Dashboard Theme */}
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6 hidden xl:flex">
        <div className="flex items-center gap-2 text-sm">
          <LayoutDashboard className="h-4 w-4" />
          <span className="font-semibold">Matric Results</span>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 sm:p-6 space-y-8 animate-fadeIn">
        
        {/* Title Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Matric Results Portal
          </h1>
          <p className="text-muted-foreground">
            Search for detailed performance statistics regarding 2023-2025 matric results.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <select
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  clearSelection();
                }}
                className="w-full h-10 pl-10 pr-4 bg-background border border-input rounded-md ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none cursor-pointer"
              >
                <option value="All">All Districts</option>
                {districts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
            </div>

            <div className="relative">
              <Award className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <select
                value={selectedQuintile}
                onChange={(e) => {
                  setSelectedQuintile(e.target.value);
                  clearSelection();
                }}
                className="w-full h-10 pl-10 pr-4 bg-background border border-input rounded-md ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none cursor-pointer"
              >
                <option value="All">All Quintiles</option>
                {quintiles.map(q => (
                  <option key={q} value={q}>Quintile {q}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
            </div>
          </div>

          <div className="relative" ref={dropdownRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search school name, EMIS, or Centre No..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                  if (selectedSchool && e.target.value !== selectedSchool.name) {
                    setSelectedSchool(null);
                  }
                }}
                onFocus={() => setIsDropdownOpen(true)}
                className="w-full h-12 pl-10 pr-10 bg-background border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-base"
              />
              {searchTerm && (
                <button 
                  onClick={clearSelection}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {isDropdownOpen && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-popover text-popover-foreground border rounded-md shadow-md max-h-[300px] overflow-y-auto">
                {filteredSuggestions.map((school) => (
                  <button
                    key={school.emis}
                    onClick={() => handleSelectSchool(school)}
                    className="w-full px-4 py-2 text-left hover:bg-muted transition-colors flex justify-between items-center group"
                  >
                    <div>
                      <div className="font-medium group-hover:underline decoration-1 underline-offset-4">
                        {school.name}
                      </div>
                      <div className="text-xs text-muted-foreground flex gap-2 mt-0.5">
                        <span>EMIS: {school.emis}</span>
                        <span>•</span>
                        <span>{school.district}</span>
                      </div>
                    </div>
                    {selectedSchool?.emis === school.emis && (
                      <Check className="w-4 h-4 text-foreground" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedSchool ? (
          <div className="space-y-8 animate-fadeIn">
            <div className="border rounded-lg p-6 bg-card text-card-foreground shadow-sm">
              <h2 className="text-2xl font-bold mb-6 tracking-tight">{selectedSchool.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 border rounded-md bg-secondary text-secondary-foreground">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium">District</p>
                    <p className="font-semibold text-lg">{selectedSchool.district}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 border rounded-md bg-secondary text-secondary-foreground">
                    <Award size={18} />
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium">Quintile</p>
                    <p className="font-semibold text-lg">{selectedSchool.quintile}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 border rounded-md bg-secondary text-secondary-foreground">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium">Centre No</p>
                    <p className="font-semibold text-lg">{selectedSchool.centreNo}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['2025', '2024', '2023'].map((year) => {
                const data = selectedSchool.results[year];
                if (!data) return null;
                const percentage = parseFloat(data.percentage);
                
                return (
                  <div key={year} className="border rounded-lg p-6 bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">{year}</h3>
                      <span className="font-mono text-lg font-bold border px-2 py-0.5 rounded bg-secondary">
                        {data.percentage}%
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Wrote</span>
                        <span className="font-semibold font-mono">{data.wrote}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Achieved</span>
                        <span className="font-semibold font-mono">{data.achieved}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Passed</span>
                        <span className="font-semibold font-mono text-foreground border-b border-foreground/20">{data.percentage}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border rounded-lg p-6 md:p-8 bg-card text-card-foreground shadow-sm">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-foreground" />
                Performance Trend (2023 - 2025)
              </h3>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="0" vertical={false} className="stroke-muted" />
                    <XAxis 
                      dataKey="year" 
                      tick={{ fontSize: 12 }} 
                      axisLine={false} 
                      tickLine={false} 
                      dy={10} 
                      className="text-muted-foreground fill-muted-foreground"
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      tickFormatter={(v) => `${v}%`} 
                      tick={{ fontSize: 12 }} 
                      axisLine={false} 
                      tickLine={false} 
                      dx={-5} 
                      className="text-muted-foreground fill-muted-foreground"
                    />
                    <Tooltip 
                      formatter={(v: any) => [`${v}%`, 'Pass Rate']}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        padding: "8px 12px",
                      }}
                    />
                    <Line 
                      type="natural" 
                      dataKey="percentage" 
                      name="Pass Rate"
                      stroke="currentColor" 
                      strokeWidth={2.5}
                      dot={false}
                      className="text-foreground stroke-foreground"
                      activeDot={{ r: 5, strokeWidth: 2, className: "fill-foreground stroke-background" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 opacity-50">
            <div className="p-6 rounded-full bg-secondary">
              <Search size={48} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">Ready to explore?</h3>
            <p className="text-muted-foreground max-w-sm">
              Use the search bar above to find a school. Filter by district or quintile to narrow down results.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
