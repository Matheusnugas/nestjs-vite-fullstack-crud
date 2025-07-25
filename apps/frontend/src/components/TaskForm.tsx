import { useState, useEffect, useRef } from 'react';

interface TaskFormProps {
  onSubmit: (data: { title: string; description?: string }) => void;
  onCancel?: () => void;
  loading?: boolean;
  initialTitle?: string;
  initialDescription?: string;
}

export default function TaskForm({ onSubmit, onCancel, loading, initialTitle = '', initialDescription = '' }: TaskFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState<string | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    if (titleRef.current) titleRef.current.focus();
  }, [initialTitle, initialDescription]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() && !description.trim()) {
      setError('Title and description cannot both be empty.');
      return;
    }
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!description.trim()) {
      setError('Description is required.');
      return;
    }
    setError(null);
    onSubmit({ title: title.trim(), description: description.trim() });
  }

  return (
    <form className="flex flex-col gap-4 min-h-[300px] h-full pb-0 sm:pb-0 pb-20" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-700 font-bold mb-1" htmlFor="title">Title<span className="text-red-500">*</span></label>
        <input
          id="title"
          ref={titleRef}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-400 py-2 text-gray-900 font-bold bg-transparent placeholder-gray-400"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Task title"
          disabled={loading}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-bold mb-1" htmlFor="description">Description<span className="text-red-500">*</span></label>
        <textarea
          id="description"
          className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-400 py-2 text-gray-900 font-bold bg-transparent placeholder-gray-400 resize-none"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Task description (required)"
          rows={3}
          disabled={loading}
        />
      </div>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <div className="flex gap-2 justify-end mt-2 sm:static absolute bottom-0 left-0 w-full bg-white p-4 border-t border-t-gray-100 sm:border-0 sm:bg-transparent z-10">
        {onCancel && (
          <button type="button" className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 cursor-pointer active:scale-95" onClick={onCancel} disabled={loading}>Cancel</button>
        )}
        <button type="submit" className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:opacity-60 cursor-pointer active:scale-95" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
} 