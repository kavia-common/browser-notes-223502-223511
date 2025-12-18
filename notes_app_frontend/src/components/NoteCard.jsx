import React from 'react';

/**
 * NoteCard renders a single note card with actions.
 * Props:
 * - note: the note object
 * - onEdit(id): start edit
 * - onDelete(id): delete note
 */
// PUBLIC_INTERFACE
export default function NoteCard({ note, onEdit, onDelete }) {
  const { id, title, content, tags = [], color = '#3b82f6', createdAt, updatedAt } = note;

  const snippet = (content || '').length > 180
    ? (content || '').slice(0, 180) + '…'
    : (content || '');

  const created = new Date(createdAt).toLocaleString();
  const updated = new Date(updatedAt).toLocaleString();

  return (
    <article className="note-card" aria-labelledby={`note-${id}-title`}>
      <div className="note-accent" style={{ background: color }} />
      <div className="note-content">
        <h3 id={`note-${id}-title`} className="note-title">{title}</h3>
        {snippet && <p className="note-body">{snippet}</p>}

        <div className="note-meta">
          {tags.map((t) => (
            <span key={t} className="tag" title={`Tag: ${t}`}>#{t}</span>
          ))}
        </div>

        <div className="note-meta" style={{ marginTop: 6 }}>
          <span title={`Created ${created}`}>Created: {created}</span>
          <span title={`Updated ${updated}`}>• Updated: {updated}</span>
        </div>

        <div className="note-actions">
          <button
            className="btn btn-success"
            onClick={() => onEdit(note)}
            aria-label={`Edit note: ${title}`}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(id)}
            aria-label={`Delete note: ${title}`}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
