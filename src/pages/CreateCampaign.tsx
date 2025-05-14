
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

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
import { mockTemplates } from '@/data/mockData';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Journey name is required' }),
  campaignId: z.string().min(3, { message: 'Campaign ID is required' }),
  type: z.enum(['email', 'text'], { required_error: 'Please select a journey type' }),
  templateId: z.string().min(1, { message: 'Sendgrid template ID is required' }),
  templateFields: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CreateCampaign = () => {
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
  
  const onSubmit = (data: FormValues) => {
    // Here you would normally send this data to your API
    console.log('Journey data:', data);
    
    toast.success('Journey created successfully', {
      description: `${data.name} has been created and saved.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight">Create Journey</h1>
      
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Journey Details</CardTitle>
          <CardDescription>
            Enter the details for your new journey
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
                      <FormLabel>Journey Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Q2 Customer Onboarding" {...field} />
                      </FormControl>
                      <FormDescription>
                        A descriptive name for your journey
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
                      <FormLabel>Journey Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select journey type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="text">Text</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The type of journey you want to run
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
                      <FormLabel>Template Fields (JSON) - Optional</FormLabel>
                      <FormControl>
                        <Input placeholder='e.g. {"firstName":"{{firstName}}","actionUrl":"{{actionUrl}}"}' {...field} />
                      </FormControl>
                      <FormDescription>
                        Optional JSON fields that will be used in the template
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button type="submit">Create Journey</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCampaign;
