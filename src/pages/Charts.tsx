import React from 'react';

const chartData = {
  sales: [
    { month: 'Jan', value: 4000 },
    { month: 'Feb', value: 3000 },
    { month: 'Mar', value: 5000 },
    { month: 'Apr', value: 4500 },
    { month: 'May', value: 6000 },
    { month: 'Jun', value: 5500 }
  ],
  categories: [
    { name: 'Electronics', value: 35, color: 'bg-blue-500' },
    { name: 'Clothing', value: 25, color: 'bg-green-500' },
    { name: 'Books', value: 20, color: 'bg-purple-500' },
    { name: 'Home', value: 15, color: 'bg-orange-500' },
    { name: 'Other', value: 5, color: 'bg-gray-500' }
  ],
  performance: [
    { metric: 'Page Views', current: 12500, previous: 11200, change: 11.6 },
    { metric: 'Unique Visitors', current: 8900, previous: 8100, change: 9.9 },
    { metric: 'Bounce Rate', current: 32.5, previous: 35.2, change: -7.7 },
    { metric: 'Session Duration', current: 245, previous: 220, change: 11.4 }
  ]
};

export const Charts: React.FC = () => {
  const maxValue = Math.max(...chartData.sales.map(item => item.value));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Monthly Sales</h3>
          <div className="space-y-4">
            {chartData.sales.map((item, index) => (
              <div key={item.month} className="flex items-center space-x-4">
                <div className="w-12 text-sm text-gray-600 dark:text-gray-400">{item.month}</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${(item.value / maxValue) * 100}%`,
                      animationDelay: `${index * 200}ms`
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                    ${item.value.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Sales by Category</h3>
          <div className="space-y-4">
            {chartData.categories.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ease-out ${category.color}`}
                      style={{ 
                        width: `${category.value}%`,
                        animationDelay: `${index * 150}ms`
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-8">{category.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Line Chart</h3>
          <div className="h-64 relative">
            <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-visible">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map(i => (
                <line
                  key={i}
                  x1="0"
                  y1={i * 50}
                  x2="400"
                  y2={i * 50}
                  stroke="currentColor"
                  strokeOpacity="0.1"
                  className="text-gray-400"
                />
              ))}
              
              {/* Data line */}
              <polyline
                fill="url(#lineGradient)"
                stroke="#3B82F6"
                strokeWidth="3"
                points={chartData.sales.map((item, index) => 
                  `${(index * 80) + 40},${200 - (item.value / maxValue) * 160}`
                ).join(' ')}
                className="transition-all duration-2000 ease-out"
              />
              
              {/* Data points */}
              {chartData.sales.map((item, index) => (
                <circle
                  key={index}
                  cx={(index * 80) + 40}
                  cy={200 - (item.value / maxValue) * 160}
                  r="4"
                  fill="#3B82F6"
                  className="transition-all duration-1000 ease-out hover:r-6"
                  style={{ animationDelay: `${index * 200}ms` }}
                />
              ))}
            </svg>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Performance Metrics</h3>
          <div className="space-y-6">
            {chartData.performance.map((metric, index) => (
              <div key={metric.metric} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{metric.metric}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {metric.metric === 'Session Duration' ? `${metric.current}s` : 
                       metric.metric === 'Bounce Rate' ? `${metric.current}%` : 
                       metric.current.toLocaleString()}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      metric.change > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${Math.min((metric.current / (metric.current + metric.previous)) * 100, 100)}%`,
                      animationDelay: `${index * 200}ms`
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Previous: {metric.metric === 'Session Duration' ? `${metric.previous}s` : 
                                   metric.metric === 'Bounce Rate' ? `${metric.previous}%` : 
                                   metric.previous.toLocaleString()}</span>
                  <span>Current: {metric.metric === 'Session Duration' ? `${metric.current}s` : 
                                  metric.metric === 'Bounce Rate' ? `${metric.current}%` : 
                                  metric.current.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};