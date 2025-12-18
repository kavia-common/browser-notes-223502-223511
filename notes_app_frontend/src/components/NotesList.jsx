import React from 'react';
import NoteCard from './NoteCard';

/**
 * NotesList renders a responsive grid of notes.
 * Props:
 * - notes: Note[]
 * - onEdit(note): start editing
 * - onDelete(id): delete a note
 */
// PUBLIC_INTERFACE
export default function NotesList({ notes, onEdit, onDelete }) {
  return (
    <div className="notes-grid" role="list">
      {notes.map(n => (
        <div key={n.id} role="listitem">
          <NoteCard note={n} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
