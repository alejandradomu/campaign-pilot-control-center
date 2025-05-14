
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CampaignChartProps {
  data: Array<{
    name: string;
    targets: number;
    successRate: number;
  }>;
}

const CampaignChart = ({ data }: CampaignChartProps) => {
  const formattedData = data.map(item => ({
    ...item,
    name: item.name.split(' ').slice(0, 2).join(' ') + '...',
    successRate: Math.round(item.successRate * 100) / 100,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Journey Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={formattedData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 25,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={70}
                tick={{ fontSize: 12 }}
              />
              <YAxis yAxisId="left" orientation="left" stroke="#C5B3E6" />
              <YAxis yAxisId="right" orientation="right" stroke="#A78BCA" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="targets" name="Total Targets" fill="#C5B3E6" />
              <Bar yAxisId="right" dataKey="successRate" name="Success Rate (%)" fill="#A78BCA" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignChart;
