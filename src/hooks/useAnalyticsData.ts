import { useState, useEffect } from 'react';
import { Ticket, Users, Clock, AlertCircle, Sparkles } from 'lucide-react';

const mockData = {
  data: [
    { name: 'Mon', tickets: 4000, resolved: 2400 },
    { name: 'Tue', tickets: 3000, resolved: 1398 },
    { name: 'Wed', tickets: 2000, resolved: 9800 },
    { name: 'Thu', tickets: 2780, resolved: 3908 },
    { name: 'Fri', tickets: 1890, resolved: 4800 },
    { name: 'Sat', tickets: 2390, resolved: 3800 },
    { name: 'Sun', tickets: 3490, resolved: 4300 },
  ],
  sentimentData: [
    { name: 'Mon', positive: 60, neutral: 30, negative: 10 },
    { name: 'Tue', positive: 65, neutral: 25, negative: 10 },
    { name: 'Wed', positive: 55, neutral: 35, negative: 10 },
    { name: 'Thu', positive: 70, neutral: 20, negative: 10 },
    { name: 'Fri', positive: 80, neutral: 15, negative: 5 },
    { name: 'Sat', positive: 85, neutral: 10, negative: 5 },
    { name: 'Sun', positive: 90, neutral: 5, negative: 5 },
  ],
  aiResolutionData: [
    { name: 'Week 1', ai: 45, human: 55 },
    { name: 'Week 2', ai: 55, human: 45 },
    { name: 'Week 3', ai: 65, human: 35 },
    { name: 'Week 4', ai: 78, human: 22 },
  ],
  stats: [
    { title: "Total Tickets", value: "12,492", trend: "+12%", iconName: "Ticket" },
    { title: "AI Resolution Rate", value: "78.4%", trend: "+15%", iconName: "Sparkles" },
    { title: "Avg. Resolution Time", value: "1.2h", trend: "-38%", iconName: "Clock" },
    { title: "Escalated to Human", value: "421", trend: "-22%", iconName: "AlertCircle" },
  ]
};

export const useAnalyticsData = () => {
  const [data, setData] = useState(mockData.data);
  const [sentimentData, setSentimentData] = useState(mockData.sentimentData);
  const [aiResolutionData, setAiResolutionData] = useState(mockData.aiResolutionData);
  const [stats, setStats] = useState(mockData.stats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate API call for fetching analytics
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setData(mockData.data);
        setSentimentData(mockData.sentimentData);
        setAiResolutionData(mockData.aiResolutionData);
        setStats(mockData.stats);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch analytics data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    sentimentData,
    aiResolutionData,
    stats,
    isLoading,
    error,
  };
};
