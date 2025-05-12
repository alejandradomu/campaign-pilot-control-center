
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { mockTemplates } from '@/data/mockData';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Campaign name is required' }),
  campaignId: z.string().min(3, { message: 'Campaign ID is required' }),
  type: z.enum(['email', 'sms', 'mixed'], { required_error: 'Please select a campaign type' }),
  templateId: z.string().min(1, { message: 'Sendgrid template ID is required' }),
  templateFields: z.string().optional(),
  scheduledAt: z.date().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CreateCampaign = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [campaignType, setCampaignType] = useState<'email' | 'sms' | 'mixed'>('email');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      campaignId: '',
      type: 'email',
      templateId: '',
      templateFields: '',
    },
  });

  const watchType = form.watch('type');
  
  const onSubmit = (data: FormValues) => {
    // Here you would normally send this data to your API
    console.log('Campaign data:', data);
    
    toast.success('Campaign created successfully', {
      description: `${data.name} has been created and saved.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight">Create Campaign</h1>
      
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Campaign Details</CardTitle>
          <CardDescription>
            Enter the details for your new campaign
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Q2 Customer Onboarding" {...field} />
                      </FormControl>
                      <FormDescription>
                        A descriptive name for your campaign
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="campaignId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign ID</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Q2-ONBOARD-2023" {...field} />
                      </FormControl>
                      <FormDescription>
                        A unique identifier for this campaign
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Type</FormLabel>
                      <Select 
                        onValueChange={(value: 'email' | 'sms' | 'mixed') => {
                          field.onChange(value);
                          setCampaignType(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select campaign type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="email">Email Only</SelectItem>
                          <SelectItem value="sms">SMS Only</SelectItem>
                          <SelectItem value="mixed">Mixed (Email & SMS)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The type of campaign you want to run
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="templateId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sendgrid Template ID</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. d-f3ecde774b0543a6a6f79d9b4709378f" {...field} />
                      </FormControl>
                      <FormDescription>
                        The template ID from Sendgrid
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="templateFields"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Template Fields (JSON)</FormLabel>
                      <FormControl>
                        <Input placeholder='e.g. {"firstName":"{{firstName}}","actionUrl":"{{actionUrl}}"}' {...field} />
                      </FormControl>
                      <FormDescription>
                        JSON fields that will be used in the template
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="scheduledAt"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Schedule Date/Time (Optional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={`w-full justify-start text-left font-normal ${
                                !field.value && 'text-muted-foreground'
                              }`}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Select a date</span>
                              )}
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Set a date to schedule this campaign, or leave blank to save as draft
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button type="submit">Create Campaign</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCampaign;
