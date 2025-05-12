
import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { mockTargets, mockCampaigns } from '@/data/mockData';
import { Target, TargetStatus } from '@/types';
import { Check, Download, Search, UploadCloud } from 'lucide-react';

const TargetManagement = () => {
  const [targets, setTargets] = useState<Target[]>(mockTargets);
  const [selectedCampaign, setSelectedCampaign] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Filter targets based on selected campaign, status, and search term
  const filteredTargets = targets.filter(target => {
    const matchesCampaign = selectedCampaign === 'all' || target.campaignId === selectedCampaign;
    const matchesStatus = statusFilter === 'all' || target.status === statusFilter;
    const matchesSearch = 
      target.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      target.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      target.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCampaign && matchesStatus && matchesSearch;
  });
  
  const handleStatusChange = (newStatus: TargetStatus) => {
    if (selectedTargets.length === 0) {
      toast.error('No targets selected', {
        description: 'Please select at least one target to update.',
      });
      return;
    }
    
    // Update targets
    const updatedTargets = targets.map(target => {
      if (selectedTargets.includes(target.id)) {
        return { ...target, status: newStatus };
      }
      return target;
    });
    
    setTargets(updatedTargets);
    
    toast.success('Status updated', {
      description: `${selectedTargets.length} targets updated to ${newStatus}.`,
    });
    
    setSelectedTargets([]);
  };
  
  const toggleTargetSelection = (targetId: string) => {
    setSelectedTargets(prev => {
      if (prev.includes(targetId)) {
        return prev.filter(id => id !== targetId);
      } else {
        return [...prev, targetId];
      }
    });
  };
  
  const selectAllVisible = () => {
    if (selectedTargets.length === filteredTargets.length) {
      setSelectedTargets([]);
    } else {
      setSelectedTargets(filteredTargets.map(target => target.id));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Target Management</h1>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>
                <UploadCloud className="mr-2 h-4 w-4" />
                Upload Targets
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Upload Target List</AlertDialogTitle>
                <AlertDialogDescription>
                  Upload a CSV file with your target list. The file should contain columns for email, firstName, lastName, and phone (optional).
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="grid w-full max-w-sm items-center gap-1.5 py-4">
                <Input id="target-file" type="file" accept=".csv" />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Upload</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Target List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search targets..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select
                value={selectedCampaign}
                onValueChange={setSelectedCampaign}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Campaign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campaigns</SelectItem>
                  {mockCampaigns.map(campaign => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="brushed">Brushed</SelectItem>
                  <SelectItem value="loaded">Loaded</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-muted-foreground">
                  {selectedTargets.length} of {filteredTargets.length} targets selected
                </span>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={selectAllVisible}
                >
                  {selectedTargets.length === filteredTargets.length ? 'Deselect All' : 'Select All'}
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      disabled={selectedTargets.length === 0}
                    >
                      Update Status
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Update Target Status</AlertDialogTitle>
                      <AlertDialogDescription>
                        Select the new status for the {selectedTargets.length} selected targets.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => handleStatusChange('brushed')}
                        >
                          Set to Brushed
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleStatusChange('loaded')}
                        >
                          Set to Loaded
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleStatusChange('pending')}
                        >
                          Set to Pending
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleStatusChange('completed')}
                        >
                          Set to Completed
                        </Button>
                      </div>
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <div className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={selectedTargets.length === filteredTargets.length && filteredTargets.length > 0}
                          onChange={selectAllVisible}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </div>
                    </TableHead>
                    <TableHead className="w-1/6">Name</TableHead>
                    <TableHead className="w-1/4">Email</TableHead>
                    <TableHead className="w-1/6">Phone</TableHead>
                    <TableHead className="w-1/6">Campaign</TableHead>
                    <TableHead className="w-1/8">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTargets.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No targets found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTargets.map(target => {
                      const campaign = mockCampaigns.find(c => c.id === target.campaignId);
                      return (
                        <TableRow key={target.id} className="cursor-pointer">
                          <TableCell>
                            <div className="flex items-center justify-center">
                              <input
                                type="checkbox"
                                checked={selectedTargets.includes(target.id)}
                                onChange={() => toggleTargetSelection(target.id)}
                                className="h-4 w-4 rounded border-gray-300"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            {target.firstName} {target.lastName}
                          </TableCell>
                          <TableCell>{target.email}</TableCell>
                          <TableCell>{target.phone || '-'}</TableCell>
                          <TableCell>{campaign?.name || 'Unknown'}</TableCell>
                          <TableCell>
                            <Badge
                              className={`status-badge-${target.status} capitalize`}
                            >
                              {target.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TargetManagement;
