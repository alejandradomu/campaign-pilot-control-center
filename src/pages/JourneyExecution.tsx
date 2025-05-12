
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
import { mockJourneys, mockCampaigns, mockTargets } from '@/data/mockData';
import { Circle, Mail, MessageSquare, Clock, ArrowRight, Play } from 'lucide-react';

const JourneyExecution = () => {
  const [selectedJourney, setSelectedJourney] = useState<string>('');
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);
  
  const journey = mockJourneys.find(j => j.id === selectedJourney);
  const campaign = journey ? mockCampaigns.find(c => c.id === journey.campaignId) : null;
  
  // Find loaded targets for the selected campaign
  const loadedTargets = mockTargets.filter(
    target => campaign && target.campaignId === campaign.id && target.status === 'loaded'
  );
  
  const handleTriggerJourney = () => {
    if (!selectedJourney) return;
    
    toast.success('Journey triggered successfully', {
      description: `The journey has been started for campaign ${campaign?.name}.`,
    });
    
    setIsConfirmOpen(false);
    setIsSuccessOpen(true);
  };
  
  const getStepIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'sms':
        return <MessageSquare className="h-4 w-4" />;
      case 'wait':
        return <Clock className="h-4 w-4" />;
      case 'condition':
        return <Circle className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };
  
  const getStepLabel = (type: string, waitTime?: number) => {
    switch (type) {
      case 'email':
        return 'Send Email';
      case 'sms':
        return 'Send SMS';
      case 'wait':
        return `Wait ${waitTime} hours`;
      case 'condition':
        return 'Check Condition';
      default:
        return 'Unknown Step';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight">Journey Execution</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Select Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Select
              value={selectedJourney}
              onValueChange={setSelectedJourney}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a journey to execute" />
              </SelectTrigger>
              <SelectContent>
                {mockJourneys.map(journey => (
                  <SelectItem key={journey.id} value={journey.id}>
                    {journey.name} ({mockCampaigns.find(c => c.id === journey.campaignId)?.name})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {journey && (
              <div className="space-y-6 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{journey.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Campaign: {campaign?.name}
                    </p>
                  </div>
                  <Badge
                    className={
                      journey.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : journey.status === 'completed'
                        ? 'bg-purple-100 text-purple-800'
                        : journey.status === 'paused'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-gray-100 text-gray-800'
                    }
                  >
                    {journey.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Journey Flow</h4>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center flex-wrap">
                      {journey.steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                          <div className="flex items-center p-2 bg-white rounded border shadow-sm">
                            <div className="mr-2">
                              {getStepIcon(step.type)}
                            </div>
                            <span className="text-sm font-medium">
                              {getStepLabel(step.type, step.waitTime)}
                            </span>
                          </div>
                          {index < journey.steps.length - 1 && (
                            <ArrowRight className="mx-2 h-4 w-4 text-muted-foreground" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
                
                {loadedTargets.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Targets Ready for Journey ({loadedTargets.length})</h4>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {loadedTargets.slice(0, 5).map(target => (
                            <TableRow key={target.id}>
                              <TableCell>{target.firstName} {target.lastName}</TableCell>
                              <TableCell>{target.email}</TableCell>
                              <TableCell>
                                <Badge className="bg-green-100 text-green-800">{target.status}</Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                          {loadedTargets.length > 5 && (
                            <TableRow>
                              <TableCell colSpan={3} className="text-center text-muted-foreground">
                                And {loadedTargets.length - 5} more targets...
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    disabled={journey.status !== 'draft' || loadedTargets.length === 0} 
                    onClick={() => setIsConfirmOpen(true)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Journey
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Start Journey</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to start this journey for campaign "{campaign?.name}"? 
              This will send messages to {loadedTargets.length} loaded targets.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleTriggerJourney}>
              Start Journey
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Dialog */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Journey Started Successfully</DialogTitle>
            <DialogDescription>
              The journey "{journey?.name}" for campaign "{campaign?.name}" has been started.
              {loadedTargets.length} targets will receive communications according to the journey flow.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsSuccessOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JourneyExecution;
