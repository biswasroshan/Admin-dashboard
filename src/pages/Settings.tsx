import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { User, Bell, Shield, Palette, Database, Globe } from 'lucide-react';

export const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const settingsSections = [
    {
      title: 'Profile Settings',
      icon: User,
      items: [
        { label: 'Personal Information', description: 'Update your profile details' },
        { label: 'Change Password', description: 'Update your password' },
        { label: 'Account Preferences', description: 'Manage your account settings' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email Notifications', description: 'Configure email preferences' },
        { label: 'Push Notifications', description: 'Manage push notification settings' },
        { label: 'SMS Alerts', description: 'Set up SMS notifications' }
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        { label: 'Two-Factor Authentication', description: 'Enable 2FA for added security' },
        { label: 'Login History', description: 'View recent login activity' },
        { label: 'Active Sessions', description: 'Manage your active sessions' }
      ]
    },
    {
      title: 'Data & Storage',
      icon: Database,
      items: [
        { label: 'Data Export', description: 'Download your data' },
        { label: 'Storage Usage', description: 'View storage statistics' },
        { label: 'Data Retention', description: 'Configure data retention policies' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Palette className="text-blue-500" size={24} />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Theme Preference
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  theme === 'light'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
                <span className="text-sm">Light</span>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  theme === 'dark'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="w-4 h-4 bg-gray-800 rounded"></div>
                <span className="text-sm">Dark</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {settingsSections.map((section, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <section.icon className="text-blue-500" size={24} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h3>
          </div>
          
          <div className="space-y-4">
            {section.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                  Configure
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Globe className="text-blue-500" size={24} />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">System Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Application</h4>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Version:</span>
                <span>2.1.0</span>
              </div>
              <div className="flex justify-between">
                <span>Build:</span>
                <span>20240115</span>
              </div>
              <div className="flex justify-between">
                <span>Environment:</span>
                <span>Production</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Performance</h4>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Uptime:</span>
                <span>99.9%</span>
              </div>
              <div className="flex justify-between">
                <span>Response Time:</span>
                <span>125ms</span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated:</span>
                <span>2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};