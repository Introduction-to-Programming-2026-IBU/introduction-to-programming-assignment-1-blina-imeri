/**
 * Exercise 7: Local Storage — Notes App
 * =======================================
 * Build a full CRUD notes app using localStorage.
 * Read README.md for full instructions.
 */

// ============================================================
// TASK 1 — Initialize: Load notes from localStorage
// ============================================================

const STORAGE_KEY = 'week9_notes';

// TODO: Load notes from localStorage, or default to []
let notes = [];
let editingId = null; // null means we're in "add" mode

// Load notes from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const storedNotes = localStorage.getItem(STORAGE_KEY);
  if (storedNotes) {
    notes = JSON.parse(storedNotes);
  }
});

function saveNotes() {
  // TODO: JSON.stringify notes and save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}


// ============================================================
// TASK 3 — Render Notes
// ============================================================

const notesContainer = document.querySelector('#notes-container');

function renderNotes(filter = '') {
  notesContainer.innerHTML = '';

  // TODO: Filter notes by search term (if filter is not empty)
  let filtered = notes;
  // filtered = notes.filter(n => ...);
  if (filter) {
    filtered = filtered.filter(n => n.title.includes(filter) || n.body.includes(filter));
  }

  // TODO: Sort so pinned notes appear first
  // filtered.sort((a, b) => ...);
  filtered.sort((a, b) => b.pinned - a.pinned);

  if (filtered.length === 0) {
    notesContainer.innerHTML = `
      <div class="empty-state">
        <p>${filter ? `No results for "${filter}"` : 'No notes yet. Create your first one!'}</p>
      </div>`;
    return;
  }

  // TODO: For each note, create a card element and append
  // Each card should have:
  //   - title (with 📌 if pinned)
  //   - body preview (first 100 chars + "..." if longer)
  //   - formatted createdAt date
  //   - Edit, Pin, Delete buttons with data-id attributes
  filtered.forEach(note => {
    const card = document.createElement('div');
    card.className = 'note-card';
    card.innerHTML = `
      <h3>${note.pinned ? '📌 ' : ''}${note.title}</h3>
      <p>${note.body.substring(0, 100)}${note.body.length > 100 ? '...' : ''}</p>
      <p class="note-date">${new Date(note.createdAt).toLocaleDateString()}</p>
      <div class="note-actions">
        <button data-action="edit" data-id="${note.id}">Edit</button>
        <button data-action="pin" data-id="${note.id}">${note.pinned ? 'Unpin' : 'Pin'}</button>
        <button data-action="delete" data-id="${note.id}">Delete</button>
      </div>
    `;
    notesContainer.appendChild(card);
  });
}


// ============================================================
// TASK 2 — Create Notes
// ============================================================

const noteForm     = document.querySelector('#note-form');
const titleInput   = document.querySelector('#note-title');
const bodyInput    = document.querySelector('#note-body');
const submitBtn    = document.querySelector('#btn-submit');
const cancelBtn    = document.querySelector('#btn-cancel');

noteForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const body  = bodyInput.value.trim();

  if (!title) { titleInput.focus(); return; }

  if (editingId !== null) {
    // ===== TASK 4: UPDATE existing note =====
    // TODO: Find note by editingId, update title and body
    const noteIndex = notes.findIndex(n => n.id === editingId);
    if (noteIndex !== -1) {
      notes[noteIndex].title = title;
      notes[noteIndex].body = body;
    }
    // TODO: Set editingId back to null
    editingId = null;
    // TODO: Reset form to "add" mode
    submitBtn.textContent = 'Add Note';

  } else {
    // ===== TASK 2: CREATE new note =====
    // TODO: Build note object with id, title, body, createdAt, pinned: false
    // TODO: Push to notes array
    const newNote = {
      id: Date.now(), // simple unique ID based on timestamp
      title,
      body,
      createdAt: new Date().toISOString(),
      pinned: false
    };
    notes.push(newNote);
  }

  saveNotes();
  renderNotes();
  noteForm.reset();
});

cancelBtn.addEventListener('click', function() {
  // TODO: Reset editingId to null, reset form, hide cancel button, change button text back
  editingId = null;
  noteForm.reset();
  cancelBtn.style.display = 'none';
  submitBtn.textContent = 'Add Note';
});


// ============================================================
// TASKS 4 & 5 — Edit, Pin, Delete via Event Delegation
// ============================================================

notesContainer.addEventListener('click', function(event) {
  const btn = event.target.closest('button[data-action]');
  if (!btn) return;

  const id     = parseInt(btn.dataset.id);
  const action = btn.dataset.action;

  if (action === 'delete') {
    // TODO Task 5: confirm(), then remove note from array, save, render
    if (confirm('Are you sure you want to delete this note?')) {
      notes = notes.filter(n => n.id !== id);
      saveNotes();
      renderNotes();
    }
  }

  if (action === 'pin') {
    // TODO Task 5: toggle note.pinned, save, render
    const noteIndex = notes.findIndex(n => n.id === id);
    if (noteIndex !== -1) {
      notes[noteIndex].pinned = !notes[noteIndex].pinned;
      saveNotes();
      renderNotes();
    }
  }

  if (action === 'edit') {
    // TODO Task 4: find note, set editingId, populate form, change button text
    const note = notes.find(n => n.id === id);
    if (note) {
      editingId = note.id;
      titleInput.value = note.title;
      bodyInput.value = note.body;
      submitBtn.textContent = 'Update Note';
      cancelBtn.style.display = 'block';
    }
  }
});


// ============================================================
// TASK 6 — Search Filter (Bonus)
// ============================================================

const searchInput = document.querySelector('#search-input');
// TODO: Add 'input' listener → call renderNotes(searchInput.value)
searchInput.addEventListener('input', function() {
  renderNotes(searchInput.value.trim());
});


// ============================================================
// Initialize
// ============================================================
renderNotes();
