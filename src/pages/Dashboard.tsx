import React from 'react';
import { StatCard } from '../components/StatCard';
import { Users, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: 'Total Users',
    value: '12,345',
    change: '12%',
    changeType: 'positive' as const,
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    title: 'Revenue',
    value: '$45,678',
    change: '8%',
    changeType: 'positive' as const,
    icon: DollarSign,
    color: 'bg-green-500'
  },
  {
    title: 'Orders',
    value: '1,234',
    change: '3%',
    changeType: 'negative' as const,
    icon: ShoppingCart,
    color: 'bg-purple-500'
  },
  {
    title: 'Growth',
    value: '23%',
    change: '15%',
    changeType: 'positive' as const,
    icon: TrendingUp,
    color: 'bg-orange-500'
  }
];

const recentActivities = [
  { id: 1, action: 'New user registered', time: '2 minutes ago', type: 'user' },
  { id: 2, action: 'Order #1234 completed', time: '5 minutes ago', type: 'order' },
  { id: 3, action: 'Payment received', time: '10 minutes ago', type: 'payment' },
  { id: 4, action: 'New product added', time: '15 minutes ago', type: 'product' },
  { id: 5, action: 'System backup completed', time: '30 minutes ago', type: 'system' }
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sales Overview</h3>
          <div className="h-64 flex items-end space-x-2">
            {[40, 65, 30, 80, 45, 70, 85, 55, 90, 35, 75, 60].map((height, index) => (
              <div
                key={index}
                className="flex-1 bg-blue-500 rounded-t-sm transition-all duration-1000 hover:bg-blue-600"
                style={{ 
                  height: `${height}%`,
                  animationDelay: `${index * 100}ms`
                }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
            <span>Jan</span>
            <span>Dec</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div className={`w-3 h-3 rounded-full ${
                  activity.type === 'user' ? 'bg-blue-500' :
                  activity.type === 'order' ? 'bg-green-500' :
                  activity.type === 'payment' ? 'bg-purple-500' :
                  activity.type === 'product' ? 'bg-orange-500' :
                  'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};