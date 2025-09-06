
"use client";

import { useState } from 'react';
import { Search, Filter, RefreshCw, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { performSearch } from './actions';
import type { Case } from '@/lib/types';
import Link from 'next/link';
import { Calendar as CalendarIcon, Scale } from 'lucide-react';

interface SearchClientPageProps {
  states: string[];
  districts: string[];
  establishments: string[];
  disposalNatures: string[];
}

export function SearchClientPage({
  states,
  districts,
  establishments,
  disposalNatures,
}: SearchClientPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Case[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setResults([]);
    setError(null);

    const formData = new FormData(event.currentTarget);
    if(startDate) formData.append('startDate', startDate.toISOString());
    if(endDate) formData.append('endDate', endDate.toISOString());

    try {
      const searchResults = await performSearch(formData);
      setResults(searchResults);
    } catch (e) {
      console.error(e);
      setError('An error occurred while searching.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Filter /> Search Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input name="searchQuery" className="pl-10 bg-white/50 dark:bg-zinc-800/50" placeholder="Search by party name, case number, or CNR..." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Select name="state">
                <SelectTrigger className="bg-white/50 dark:bg-zinc-800/50">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent className="bg-glass border-glass">
                  {states.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select name="district">
                <SelectTrigger className="bg-white/50 dark:bg-zinc-800/50">
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent className="bg-glass border-glass">
                  {districts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select name="establishment">
                <SelectTrigger className="bg-white/50 dark:bg-zinc-800/50">
                  <SelectValue placeholder="Select Establishment" />
                </SelectTrigger>
                <SelectContent className="bg-glass border-glass">
                  {establishments.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select name="disposalNature">
                <SelectTrigger className="bg-white/50 dark:bg-zinc-800/50">
                  <SelectValue placeholder="Select Disposal Nature" />
                </SelectTrigger>
                <SelectContent className="bg-glass border-glass">
                  {disposalNatures.map((dn) => <SelectItem key={dn} value={dn}>{dn}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn("justify-start text-left font-normal bg-white/50 dark:bg-zinc-800/50", !startDate && "text-muted-foreground")}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : <span>Start date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-glass border-glass">
                        <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                </Popover>
                 <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn("justify-start text-left font-normal bg-white/50 dark:bg-zinc-800/50", !endDate && "text-muted-foreground")}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : <span>End date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-glass border-glass">
                        <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                    </PopoverContent>
                </Popover>
             </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 transition-opacity">
                {isLoading ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Search className="mr-2 h-4 w-4" />
                )}
                Search
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Scale /> Search Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                <TableRow className="hover:bg-transparent">
                    <TableHead>Case Details</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Disposal Nature</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {isLoading ? (
                    <TableRow>
                    <TableCell colSpan={5} className="text-center">
                        <div className="flex items-center justify-center p-8">
                        <RefreshCw className="mr-2 h-6 w-6 animate-spin bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500" />
                        <span className="text-muted-foreground">Searching...</span>
                        </div>
                    </TableCell>
                    </TableRow>
                ) : error ? (
                    <TableRow>
                    <TableCell colSpan={5} className="text-center text-destructive h-24">{error}</TableCell>
                    </TableRow>
                ) : results.length > 0 ? (
                    results.map((c) => (
                    <TableRow key={c.CNR} className="hover:bg-white/50 dark:hover:bg-zinc-800/50">
                        <TableCell>
                        <div className="font-medium">{c.Party_Name}</div>
                        <div className="text-sm text-muted-foreground">{c.Case_Number} ({c.CNR})</div>
                        </TableCell>
                        <TableCell>
                            <div className="font-medium">{c.District}, {c.State}</div>
                            <div className="text-sm text-muted-foreground">{c.Establishment}</div>
                        </TableCell>
                        <TableCell>
                        Reg: {c.Date_of_Registration}<br/>Next: {c.Next_Date || 'N/A'}
                        </TableCell>
                        <TableCell>
                        {c.Disposal_Nature}
                        </TableCell>
                        <TableCell>
                        <Button asChild variant="ghost" size="icon">
                            <Link href={`/search/${c.CNR}`}>
                            <Eye className="h-4 w-4" />
                            </Link>
                        </Button>
                        </TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">No results found.</TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
