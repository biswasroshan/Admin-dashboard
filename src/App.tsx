import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Tables } from './pages/Tables';
import { Charts } from './pages/Charts';
import { Calendar } from './pages/Calendar';
import { Kanban } from './pages/Kanban';
import { Settings } from './pages/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'tables':
        return <Tables />;
      case 'charts':
        return <Charts />;
      case 'calendar':
        return <Calendar />;
      case 'kanban':
        return <Kanban />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'tables':
        return 'Data Tables';
      case 'charts':
        return 'Analytics Charts';
      case 'calendar':
        return 'Calendar';
      case 'kanban':
        return 'Kanban Board';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title={getPageTitle()} />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;