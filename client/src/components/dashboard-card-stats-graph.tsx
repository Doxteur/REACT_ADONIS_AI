'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight } from 'lucide-react';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
];

export function DashboardCard() {
  return (
    <div className='bg-white rounded-lg shadow-md p-4 max-w-sm'>
      <div className='flex justify-between items-center mb-3'>
        <h2 className='text-lg font-semibold text-gray-800'>Revenus mensuels</h2>
        <select className='border border-gray-300 rounded-md text-gray-600 px-2 py-1 text-xs'>
          <option>6 derniers mois</option>
          <option>12 derniers mois</option>
          <option>2 dernières années</option>
        </select>
      </div>
      <div className='mb-3'>
        <div className='flex items-center'>
          <span className='text-2xl font-bold text-gray-900'>12 345 €</span>
          <span className='ml-2 flex items-center text-xs font-medium text-ambre-600'>
            <ArrowUpRight className='w-3 h-3 mr-1' />
            8,2%
          </span>
        </div>
        <p className='text-gray-500 text-xs'>Comparé à 11 412 € le mois dernier</p>
      </div>
      <div className='h-48 w-full bg-gray-50 rounded-lg p-2'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#F59E0B' />
            <XAxis
              dataKey='name'
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#F59E0B' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#F59E0B' }}
              width={30}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
              }}
            />
            <Bar
              dataKey='value'
              fill='#F59E0B'
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className='mt-3 flex justify-between text-xs'>
        <div>
          <p className='text-gray-500'>Revenu le plus élevé</p>
          <p className='font-semibold text-gray-900'>1 200 € en avril</p>
        </div>
        <div>
          <p className='text-gray-500'>Revenu le plus bas</p>
          <p className='font-semibold text-gray-900'>300 € en février</p>
        </div>
      </div>
    </div>
  );
}
