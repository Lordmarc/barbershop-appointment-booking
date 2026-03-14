import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { getWeeklyChart } from '../services/appointmentService';


const WeeklyChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await getWeeklyChart();
      setData(result);
    }
    fetch();
  }, []);

  return (
    <div className="bg-primary/10 rounded-lg p-4 border border-neutral-border">
      <p className="text-xl mb-4">Weekly Revenue</p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10"/>
          <XAxis dataKey="day" stroke="#94a3b8"/>
          <YAxis stroke="#94a3b8"/>
          <Tooltip
            formatter={(value) => [`PHP ${value}`, 'Revenue']}
            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
          />
          <Bar dataKey="revenue" fill="#D4AF37" radius={[4, 4, 0, 0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WeeklyChart;