import { useEffect, useState } from 'react';
import { getInterns, addIntern, updateStatus, deleteIntern } from './api';
import './App.css';

function App() {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', batch: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadInterns();
  }, []);

  async function loadInterns() {
    setLoading(true);
    setError('');
    try {
      const data = await getInterns();
      setInterns(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const newIntern = await addIntern(form);
      setInterns((prev) => [newIntern, ...prev]);
      setForm({ name: '', email: '', batch: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleToggleStatus(id, currentStatus) {
    const newStatus = currentStatus === 'active' ? 'completed' : 'active';
    setError('');
    try {
      await updateStatus(id, newStatus);
      setInterns((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    setError('');
    try {
      await deleteIntern(id);
      setInterns((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container">
      <h1>Intern Directory</h1>

      {error && <div className="error-banner">{error}</div>}

      <form className="intern-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Batch (e.g. 2026)"
          value={form.batch}
          onChange={(e) => setForm({ ...form, batch: e.target.value })}
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add Intern'}
        </button>
      </form>

      {loading ? (
        <p className="loading">Loading interns...</p>
      ) : (
        <ul className="intern-list">
          {interns.map((intern) => (
            <li key={intern.id} className={intern.status}>
              <div>
                <strong>{intern.name}</strong> ({intern.email}) — Batch {intern.batch}
                <span className="status-badge">{intern.status}</span>
              </div>
              <div className="actions">
                <button onClick={() => handleToggleStatus(intern.id, intern.status)}>
                  Mark {intern.status === 'active' ? 'Completed' : 'Active'}
                </button>
                <button onClick={() => handleDelete(intern.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </li>
          ))}
          {interns.length === 0 && <p>No interns yet. Add one above.</p>}
        </ul>
      )}
    </div>
  );
}

export default App;