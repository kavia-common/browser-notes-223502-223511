import React, { useEffect, useMemo, useState } from 'react';

/**
 * NoteForm allows creating or editing a note.
 * Props:
 * - initialNote?: the note to edit, if any
 * - onSubmit: (note | updatedNote) => void
 * - onCancel?: () => void
 */
// PUBLIC_INTERFACE
export default function NoteForm({ initialNote, onSubmit, onCancel }) {
  const isEditing = Boolean(initialNote);

  const [title, setTitle] = useState(initialNote?.title || '');
  const [content, setContent] = useState(initialNote?.content || '');
  const [tagsText, setTagsText] = useState(
    initialNote?.tags?.join(', ') || ''
  );
  const [color, setColor] = useState(initialNote?.color || '#3b82f6');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle(initialNote?.title || '');
    setContent(initialNote?.content || '');
    setTagsText(initialNote?.tags?.join(', ') || '');
    setColor(initialNote?.color || '#3b82f6');
    setErrors({});
  }, [initialNote]);

  const parsedTags = useMemo(() => {
    return tagsText
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);
  }, [tagsText]);

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = 'Title is required.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eMap = validate();
    setErrors(eMap);
    if (Object.keys(eMap).length > 0) return;

    const payload = {
      title: title.trim(),
      content: content.trim(),
      tags: parsedTags,
      color,
    };
    if (isEditing) {
      onSubmit({ ...initialNote, ...payload });
    } else {
      onSubmit(payload);
    }
    if (!isEditing) {
      setTitle('');
      setContent('');
      setTagsText('');
      setColor('#3b82f6');
      setErrors({});
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="title">Title</label>
          <input
            id="title"
            className="input"
            type="text"
            placeholder="e.g., Grocery list"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'title-error' : undefined}
            required
          />
          {errors.title && (
            <div id="title-error" className="error">{errors.title}</div>
          )}
        </div>

        <div>
          <label className="label" htmlFor="tags">Tags (comma-separated)</label>
          <input
            id="tags"
            className="input"
            type="text"
            placeholder="e.g., personal, ideas"
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
          />
          <div className="hint">Optional</div>
        </div>

        <div>
          <label className="label" htmlFor="color">Color</label>
          <input
            id="color"
            className="color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            aria-label="Note color"
          />
          <div className="hint">Optional</div>
        </div>

        <div style={{alignSelf: 'end'}}>
          <button type="submit" className={isEditing ? 'btn btn-success' : 'btn btn-primary'}>
            {isEditing ? 'Update Note' : 'Add Note'}
          </button>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <label className="label" htmlFor="content">Content</label>
        <textarea
          id="content"
          className="textarea"
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="hint">Optional</div>
      </div>

      {isEditing && (
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
}
