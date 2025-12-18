import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './styles.css';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import Toolbar from './components/Toolbar';
import { loadNotes, saveNotes } from './utils/storage';

/**
 * Root App component for Browser Notes.
 * Manages global state for notes, filters, and editing.
 */
// PUBLIC_INTERFACE
function App() {
  /** Notes state shape:
   * {
   *   id: string, title: string, content?: string,
   *   tags: string[], color?: string,
   *   createdAt: number, updatedAt: number
   * }
   */
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const loaded = loadNotes();
    if (loaded && Array.isArray(loaded)) {
      setNotes(loaded);
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // Available tags derived from notes
  const allTags = useMemo(() => {
    const s = new Set();
    notes.forEach(n => (n.tags || []).forEach(t => s.add(t)));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [notes]);

  // Filtered notes by search and tag
  const filteredNotes = useMemo(() => {
    const text = searchText.trim().toLowerCase();
    return notes.filter(n => {
      const matchesText =
        !text ||
        n.title.toLowerCase().includes(text) ||
        (n.content || '').toLowerCase().includes(text);
      const matchesTag = !tagFilter || (n.tags || []).includes(tagFilter);
      return matchesText && matchesTag;
    });
  }, [notes, searchText, tagFilter]);

  // PUBLIC_INTERFACE
  const handleAddNote = (note) => {
    /** Add a new note to state with timestamps. */
    const now = Date.now();
    const newNote = {
      ...note,
      id: cryptoRandomId(),
      createdAt: now,
      updatedAt: now,
    };
    setNotes(prev => [newNote, ...prev]);
  };

  // PUBLIC_INTERFACE
  const handleUpdateNote = (updated) => {
    /** Update an existing note by id and set updatedAt. */
    setNotes(prev =>
      prev.map(n =>
        n.id === updated.id ? { ...n, ...updated, updatedAt: Date.now() } : n
      )
    );
    setEditingNote(null);
  };

  // PUBLIC_INTERFACE
  const handleDeleteNote = (id) => {
    /** Delete a note after confirmation. */
    const target = notes.find(n => n.id === id);
    const name = target ? target.title : 'this note';
    // eslint-disable-next-line no-alert
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      setNotes(prev => prev.filter(n => n.id !== id));
      if (editingNote && editingNote.id === id) {
        setEditingNote(null);
      }
    }
  };

  // PUBLIC_INTERFACE
  const handleClearAll = () => {
    /** Clear all notes after confirmation. */
    // eslint-disable-next-line no-alert
    if (window.confirm('Clear all notes? This cannot be undone.')) {
      setNotes([]);
      setEditingNote(null);
      setSearchText('');
      setTagFilter('');
    }
  };

  const handleEditStart = (note) => setEditingNote(note);
  const handleCancelEdit = () => setEditingNote(null);

  return (
    <div className="app-root">
      <Header />
      <main className="container">
        <section className="panel">
          <NoteForm
            key={editingNote ? editingNote.id : 'new-form'}
            initialNote={editingNote}
            onSubmit={editingNote ? handleUpdateNote : handleAddNote}
            onCancel={editingNote ? handleCancelEdit : undefined}
          />
        </section>

        <section className="toolbar-section">
          <Toolbar
            searchText={searchText}
            onSearchTextChange={setSearchText}
            tagFilter={tagFilter}
            onTagFilterChange={setTagFilter}
            availableTags={allTags}
            onClearAll={handleClearAll}
          />
        </section>

        <section className="list-section">
          <NotesList
            notes={filteredNotes}
            onEdit={handleEditStart}
            onDelete={handleDeleteNote}
          />
          {filteredNotes.length === 0 && (
            <div className="empty-state" role="status" aria-live="polite">
              <div className="empty-card">
                <div className="empty-accent" />
                <h3>No notes yet</h3>
                <p>
                  Add your first note using the form above. You can also search
                  or filter once you have notes. Notes are saved in your browser.
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

/** Generate a random id using crypto if available, falling back to Math.random. */
function cryptoRandomId() {
  if (window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr).map(n => n.toString(16)).join('');
  }
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export default App;
