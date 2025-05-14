
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Campaign } from '@/types';
import { cn } from '@/lib/utils';

interface CampaignListProps {
  campaigns: Campaign[];
}

const CampaignList = ({ campaigns }: CampaignListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Journeys</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="flex items-center justify-between p-4 border rounded-md hover:bg-accent transition-colors"
            >
              <div className="space-y-1">
                <div className="font-medium">{campaign.name}</div>
                <div className="text-sm text-muted-foreground">
                  Ref: {campaign.referenceCode}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {campaign.targetCount} targets
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {campaign.successCount} successful
                  </div>
                </div>
                <Badge className={cn(getStatusColor(campaign.status))}>
                  {campaign.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignList;
