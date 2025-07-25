import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useTasks, useCreateTask } from '../hooks/useTasks';
import TaskListView from '../components/TaskListView';
import TaskModal from '../components/TaskModal';
import TaskForm from '../components/TaskForm';
import type { Task } from '../types/Task';
import toast from 'react-hot-toast';
import TaskFilterDropdown from '../components/TaskFilterDropdown';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';

export default function Dashboard() {
  const { user } = useAuth();
  const { data: tasks, isLoading, isError } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);
  const createTask = useCreateTask();
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'COMPLETED'>('ALL');
  const filteredTasks = (tasks ?? []).filter((task: Task) =>
    filter === 'ALL' ? true : task.status === filter
  );
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  function handleCreateTask(data: { title: string; description?: string }) {
    createTask.mutate(data, {
      onSuccess: () => {
        setModalOpen(false);
        toast.success('Task created successfully!');
      },
    });
  }

  function handleLogout() {
    setLogoutConfirm(true);
  }

  function confirmLogout() {
    setLogoutConfirm(false);
    localStorage.removeItem('token');
    toast.success('Logout realizado com sucesso!');
    setTimeout(() => {
      navigate('/login', { replace: true });
      window.location.reload();
    }, 800);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 py-10 bg-transparent">
      <h1 className="text-3xl font-bold text-white mb-2 text-center">Welcome, {user?.name}!</h1>
      <p className="text-gray-100 mb-8 text-center text-lg">This is your dashboard. Here you'll see your tasks.</p>
      <button
        className="mb-8 px-5 py-2 rounded bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold shadow hover:from-blue-500 hover:to-purple-600 transition outline outline-2 outline-white cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        + New Task
      </button>
      <div className="w-full max-w-5xl flex flex-col items-center mb-4">
        <span className="text-gray-200 font-semibold mb-1">Filter By</span>
        <TaskFilterDropdown value={filter} onChange={setFilter} />
      </div>
      <TaskModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setModalOpen(false)}
          loading={createTask.status === 'pending'}
        />
      </TaskModal>
      <div className="w-full px-2 sm:px-6 mb-10 max-w-5xl">
        <TaskListView tasks={filteredTasks} isLoading={isLoading} isError={isError} />
      </div>
      <button
        onClick={handleLogout}
        className="px-6 py-2 rounded bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold shadow hover:from-blue-500 hover:to-purple-600 mt-8 outline outline-2 outline-white cursor-pointer"
      >
        Logout
      </button>
      <ConfirmModal
        open={logoutConfirm}
        onClose={() => setLogoutConfirm(false)}
        onConfirm={confirmLogout}
        title="Logout"
        description="Tem certeza que deseja sair?"
        confirmText="Logout"
      />
    </div>
  );
} 