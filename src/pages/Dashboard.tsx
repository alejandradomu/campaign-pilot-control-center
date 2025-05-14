
import React from 'react';
import { BarChart3, Users, Mail, AlertTriangle } from 'lucide-react';
import { mockMetrics, mockCampaigns } from '@/data/mockData';
import StatCard from '@/components/dashboard/StatCard';
import CampaignList from '@/components/dashboard/CampaignList';
import CampaignChart from '@/components/dashboard/CampaignChart';

const Dashboard = () => {
  // For demonstration purposes, let's calculate daily error rate
  const dailyErrorRate = Math.round((mockMetrics.bounceCount + mockMetrics.failCount) / mockMetrics.totalTargets * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Journeys Today"
          value={mockMetrics.activeCampaigns}
          icon={<BarChart3 className="h-5 w-5" />}
        />
        <StatCard
          title="Targets in Last Journey"
          value={mockMetrics.totalTargets}
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 10, positive: true }}
        />
        <StatCard
          title="Active Journeys"
          value={mockMetrics.activeCampaigns}
          icon={<Mail className="h-5 w-5" />}
        />
        <StatCard
          title="Daily Error Rate"
          value={`${dailyErrorRate}%`}
          icon={<AlertTriangle className="h-5 w-5" />}
          trend={{ value: 2.1, positive: false }}
          description="Bounce, Deferred, Dropped"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <CampaignChart data={mockMetrics.campaigns} />
        <CampaignList campaigns={mockCampaigns} />
      </div>
    </div>
  );
};

export default Dashboard;
