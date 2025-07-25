import { useState } from 'react';
import type { Task } from '../types/Task';
import { useDeleteTask, useUpdateTask } from '../hooks/useTasks';
import ConfirmModal from './ConfirmModal';
import TaskModal from './TaskModal';
import TaskForm from './TaskForm';
import toast from 'react-hot-toast';

interface TaskListViewProps {
  tasks: Task[];
  isLoading?: boolean;
  isError?: boolean;
}

type APIError = { response?: { data?: { message?: string } } };

export default function TaskListView({ tasks, isLoading, isError }: TaskListViewProps) {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  function handleDelete(id: number) {
    setDeleteId(id);
  }

  function confirmDelete() {
    if (deleteId == null) return;
    deleteTask.mutate(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
        toast.success('Task deleted successfully!');
      },
      onError: (err: unknown) => {
        const apiErr = err as APIError;
        const msg =
          typeof err === 'object' &&
          err !== null &&
          'response' in err &&
          typeof apiErr.response?.data?.message === 'string'
            ? apiErr.response!.data!.message!
            : 'Error deleting task.';
        toast.error(msg);
      },
    });
  }

  function handleComplete(task: Task) {
    updateTask.mutate({ id: task.id, data: { status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' } }, {
      onSuccess: () => {
        toast.success('Task status updated!');
      },
      onError: (err: unknown) => {
        const apiErr = err as APIError;
        const msg =
          typeof err === 'object' &&
          err !== null &&
          'response' in err &&
          typeof apiErr.response?.data?.message === 'string'
            ? apiErr.response!.data!.message!
            : 'Error updating task.';
        toast.error(msg);
      },
    });
  }

  function handleEdit(task: Task) {
    setEditTask(task);
  }

  function handleEditSubmit(data: { title: string; description?: string }) {
    if (!editTask) return;
    updateTask.mutate({ id: editTask.id, data }, {
      onSuccess: () => {
        setEditTask(null);
        toast.success('Task updated!');
      },
      onError: (err: unknown) => {
        const apiErr = err as APIError;
        const msg =
          typeof err === 'object' &&
          err !== null &&
          'response' in err &&
          typeof apiErr.response?.data?.message === 'string'
            ? apiErr.response!.data!.message!
            : 'Error updating task.';
        toast.error(msg);
      },
    });
  }

  if (isLoading) {
    return <div className="text-center text-gray-400 py-8">Loading tasks...</div>;
  }
  if (isError) {
    return <div className="text-center text-red-400 py-8">Failed to load tasks. Try again later.</div>;
  }
  if (!tasks || tasks.length === 0) {
    return <div className="text-center text-gray-200 font-bold py-8">No tasks found. Enjoy your free time!</div>;
  }
  return (
    <>
      <ul className="divide-y divide-gray-200 w-full">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between py-4 px-2 transition rounded-lg text-gray-200 hover:bg-black/25 hover:backdrop-blur-md w-full"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2 min-w-0">
                <span className={`inline-block w-2 h-2 rounded-full ${task.status === 'COMPLETED' ? 'bg-green-500' : 'bg-yellow-400'}`}></span>
                <span className={`font-semibold flex-1 min-w-0 w-full break-words whitespace-normal block ${task.status === 'COMPLETED' ? 'line-through text-gray-400' : 'text-gray-100'}`}>{task.title}</span>
              </div>
              {task.description && (
                <div className="text-sm text-gray-300 mt-1 break-words w-full">{task.description}</div>
              )}
            </div>
            <div className="flex flex-col items-end ml-4 gap-2">
              <span className="text-xs text-gray-400 mb-1">{new Date(task.createdAt).toLocaleDateString()}</span>
              <span className={`text-xs font-bold ${task.status === 'COMPLETED' ? 'text-green-400' : 'text-yellow-300'}`}>{task.status}</span>
              <div className="flex gap-2 mt-2">
                <button title="Edit" className="p-1 rounded hover:bg-blue-100/30 text-blue-400 hover:text-blue-600 transition cursor-pointer active:scale-95" onClick={() => handleEdit(task)}>
                  <svg width="18" height="18" fill="none" viewBox="0 0 20 20"><path d="M4 13.5V16h2.5l7.06-7.06-2.5-2.5L4 13.5zM17.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.13 1.13 3.75 3.75 1.13-1.13z" fill="currentColor"/></svg>
                </button>
                <button title={task.status === 'COMPLETED' ? 'Mark as Pending' : 'Complete'} className="p-1 rounded hover:bg-green-100/30 text-green-400 hover:text-green-600 transition cursor-pointer active:scale-95" onClick={() => handleComplete(task)} disabled={updateTask.status === 'pending'}>
                  <svg width="18" height="18" fill="none" viewBox="0 0 20 20"><path d="M7.629 15.314a1 1 0 0 1-1.415 0l-3.536-3.535a1 1 0 1 1 1.414-1.415l2.829 2.829 7.778-7.778a1 1 0 1 1 1.415 1.414l-8.485 8.485z" fill="currentColor"/></svg>
                </button>
                <button title="Delete" className="p-1 rounded hover:bg-red-100/30 text-red-400 hover:text-red-600 transition cursor-pointer active:scale-95" onClick={() => handleDelete(task.id)}>
                  <svg width="18" height="18" fill="none" viewBox="0 0 20 20"><path d="M6 7v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7M4 7h12M9 10v3m2-3v3m-6 4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7H4v10zM8 4V3a2 2 0 1 1 4 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ConfirmModal
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        loading={deleteTask.status === 'pending'}
      />
      <TaskModal open={!!editTask} onClose={() => setEditTask(null)}>
        {editTask && (
          <TaskForm
            onSubmit={handleEditSubmit}
            onCancel={() => setEditTask(null)}
            loading={updateTask.status === 'pending'}
            key={editTask.id}
            // Preencher campos
            {...{
              initialTitle: editTask.title,
              initialDescription: editTask.description,
            }}
          />
        )}
      </TaskModal>
    </>
  );
} 