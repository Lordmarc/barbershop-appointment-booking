import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { getWeeklyChart } from '../services/appointmentService';
import { supabase } from '../lib/supabase';

const RevenueChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getWeeklyChart();
      setData(result);
    };

    fetchData();

    const subscription = supabase
      .channel('revenue-chart-channel')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'appointments' },
        () => fetchData() 
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, []);

  return (
    <div className="bg-[#1a1f14] rounded-2xl p-5 border border-white/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.4)] h-full">
      <div className="flex items-center gap-2 mb-5">
        <div>
          <p className="text-[#f0ede6] font-bold">Weekly Revenue</p>
          <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500">This week</p>
        </div>
      </div>

      <div className="h-px bg-white/[0.07] mb-4"/>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false}/>
          <XAxis
            dataKey="day"
            stroke="#555"
            tick={{ fill: '#666', fontSize: 11, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="#555"
            tick={{ fill: '#666', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => [`PHP ${value}`, 'Revenue']}
            contentStyle={{
              backgroundColor: '#1e241a',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px',
              color: '#f0ede6',
              fontSize: '12px',
            }}
            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
          />
          <Bar dataKey="revenue" fill="#86c559" radius={[6, 6, 0, 0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;