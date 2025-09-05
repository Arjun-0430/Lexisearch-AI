
"use client";

import { useState } from 'react';
import { Search, Filter, RefreshCw, Sparkles, Eye } from 'lucide-react';
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
import { RiskBadge } from '@/components/shared/risk-badge';
import Link from 'next/link';
import { Calendar as CalendarIcon } from 'lucide-react';

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
          <CardTitle className="flex items-center gap-2">
            <Filter /> Search Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input name="searchQuery" className="pl-10" placeholder="Search by party name..." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Select name="state">
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select name="district">
                <SelectTrigger>
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select name="establishment">
                <SelectTrigger>
                  <SelectValue placeholder="Select Establishment" />
                </SelectTrigger>
                <SelectContent>
                  {establishments.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select name="disposalNature">
                <SelectTrigger>
                  <SelectValue placeholder="Select Disposal Nature" />
                </SelectTrigger>
                <SelectContent>
                  {disposalNatures.map((dn) => <SelectItem key={dn} value={dn}>{dn}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn("justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : <span>Start date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                </Popover>
                 <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn("justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : <span>End date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                    </PopoverContent>
                </Popover>
             </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
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
          <CardTitle className="flex items-center gap-2">
            Search Results
            {results.length > 0 && <Sparkles className="w-5 h-5 text-accent" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
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
                       <RefreshCw className="mr-2 h-6 w-6 animate-spin text-primary" />
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
                  <TableRow key={c.CNR}>
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
        </CardContent>
      </Card>
    </div>
  );
}
