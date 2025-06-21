import React, { useState } from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import { Modal } from '../components/Modal';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'bg-gray-500',
    tasks: [
      {
        id: '1',
        title: 'Design System Update',
        description: 'Update the design system with new components',
        assignee: 'John Doe',
        priority: 'high',
        dueDate: '2024-01-20'
      },
      {
        id: '2',
        title: 'User Research',
        description: 'Conduct user interviews for the new feature',
        assignee: 'Jane Smith',
        priority: 'medium',
        dueDate: '2024-01-25'
      }
    ]
  },
  {
    id: 'progress',
    title: 'In Progress',
    color: 'bg-blue-500',
    tasks: [
      {
        id: '3',
        title: 'API Integration',
        description: 'Integrate with third-party payment API',
        assignee: 'Bob Johnson',
        priority: 'high',
        dueDate: '2024-01-18'
      },
      {
        id: '4',
        title: 'Mobile Optimization',
        description: 'Optimize the app for mobile devices',
        assignee: 'Alice Brown',
        priority: 'medium',
        dueDate: '2024-01-22'
      }
    ]
  },
  {
    id: 'review',
    title: 'Review',
    color: 'bg-orange-500',
    tasks: [
      {
        id: '5',
        title: 'Code Review',
        description: 'Review pull request for the new feature',
        assignee: 'Charlie Wilson',
        priority: 'low',
        dueDate: '2024-01-16'
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    color: 'bg-green-500',
    tasks: [
      {
        id: '6',
        title: 'Database Migration',
        description: 'Migrate user data to new database schema',
        assignee: 'Diana Davis',
        priority: 'high',
        dueDate: '2024-01-15'
      },
      {
        id: '7',
        title: 'Documentation',
        description: 'Update API documentation',
        assignee: 'Eve Miller',
        priority: 'low',
        dueDate: '2024-01-14'
      }
    ]
  }
];

export const Kanban: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<string>('todo');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    dueDate: ''
  });

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTask(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    
    if (!draggedTask) return;

    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      let draggedTaskData: Task | null = null;

      // Find and remove the dragged task
      for (let i = 0; i < newColumns.length; i++) {
        const taskIdx = newColumns[i].tasks.findIndex(task => task.id === draggedTask);
        if (taskIdx !== -1) {
          draggedTaskData = newColumns[i].tasks[taskIdx];
          newColumns[i].tasks.splice(taskIdx, 1);
          break;
        }
      }

      // Add the task to the target column
      if (draggedTaskData) {
        const targetColumnIndex = newColumns.findIndex(col => col.id === targetColumnId);
        if (targetColumnIndex !== -1) {
          newColumns[targetColumnIndex].tasks.push(draggedTaskData);
        }
      }

      return newColumns;
    });

    setDraggedTask(null);
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.description && newTask.assignee && newTask.dueDate) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        assignee: newTask.assignee,
        priority: newTask.priority,
        dueDate: newTask.dueDate
      };

      setColumns(prevColumns => {
        const newColumns = [...prevColumns];
        const columnIndex = newColumns.findIndex(col => col.id === selectedColumnId);
        if (columnIndex !== -1) {
          newColumns[columnIndex].tasks.push(task);
        }
        return newColumns;
      });

      setNewTask({
        title: '',
        description: '',
        assignee: '',
        priority: 'medium',
        dueDate: ''
      });
      setIsTaskModalOpen(false);
    }
  };

  const handleAddCard = (columnId: string) => {
    setSelectedColumnId(columnId);
    setIsTaskModalOpen(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Project Board</h2>
        <button 
          onClick={() => setIsTaskModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus size={16} />
          <span>Add Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 min-h-96"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{column.title}</h3>
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
                  {column.tasks.length}
                </span>
              </div>
              <button className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <MoreHorizontal size={16} />
              </button>
            </div>

            <div className="space-y-3">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 cursor-move hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">{task.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-xs mb-3 line-clamp-2">
                    {task.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {task.assignee.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{task.assignee}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-500">{task.dueDate}</span>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={() => handleAddCard(column.id)}
                className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus size={16} />
                <span className="text-sm">Add a card</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title="Create New Task"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Task Title
            </label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter task title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter task description"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Assignee
            </label>
            <input
              type="text"
              value={newTask.assignee}
              onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter assignee name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Priority
            </label>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              onClick={() => setIsTaskModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddTask}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Task
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};