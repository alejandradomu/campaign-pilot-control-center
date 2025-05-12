
import React from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  const handleSaveAPISettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('API settings saved', {
      description: 'Your API connection settings have been updated.',
    });
  };
  
  const handleSaveNotificationSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Notification settings saved', {
      description: 'Your notification preferences have been updated.',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      
      <Tabs defaultValue="api" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="api">API Connections</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Connections</CardTitle>
              <CardDescription>
                Configure your connection to various APIs and services.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveAPISettings} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="postman-url">Postman API Endpoint</Label>
                    <Input id="postman-url" defaultValue="https://api.example.com/campaigns" />
                    <p className="text-sm text-muted-foreground mt-1">
                      The URL for your Postman API endpoint
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="postman-key">Postman API Key</Label>
                    <Input id="postman-key" type="password" defaultValue="••••••••••••••••" />
                    <p className="text-sm text-muted-foreground mt-1">
                      Your API key for authentication
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="supabase-url">Supabase URL</Label>
                    <Input id="supabase-url" defaultValue="https://your-project.supabase.co" />
                    <p className="text-sm text-muted-foreground mt-1">
                      Your Supabase project URL
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="supabase-key">Supabase API Key</Label>
                    <Input id="supabase-key" type="password" defaultValue="••••••••••••••••" />
                    <p className="text-sm text-muted-foreground mt-1">
                      Your Supabase API key
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="journey-url">Journey API Endpoint</Label>
                    <Input id="journey-url" defaultValue="https://api.example.com/journeys" />
                    <p className="text-sm text-muted-foreground mt-1">
                      The URL for your journey management API
                    </p>
                  </div>
                </div>
                
                <Button type="submit">Save API Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure when and how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveNotificationSettings} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="campaign-completion">Campaign Completion</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when a campaign completes
                      </p>
                    </div>
                    <Switch id="campaign-completion" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="journey-start">Journey Start</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when a journey starts
                      </p>
                    </div>
                    <Switch id="journey-start" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="error-notifications">Errors & Warnings</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about errors and warnings
                      </p>
                    </div>
                    <Switch id="error-notifications" defaultChecked />
                  </div>
                  
                  <div>
                    <Label htmlFor="notification-email">Notification Email</Label>
                    <Input id="notification-email" type="email" defaultValue="user@example.com" />
                    <p className="text-sm text-muted-foreground mt-1">
                      Email address for notifications
                    </p>
                  </div>
                </div>
                
                <Button type="submit">Save Notification Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
