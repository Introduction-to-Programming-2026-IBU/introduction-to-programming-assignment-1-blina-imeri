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

function saveNotes() {
  // TODO: JSON.stringify notes and save to localStorage
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

  // TODO: Sort so pinned notes appear first
  // filtered.sort((a, b) => ...);

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
    // TODO: Set editingId back to null
    // TODO: Reset form to "add" mode

  } else {
    // ===== TASK 2: CREATE new note =====
    // TODO: Build note object with id, title, body, createdAt, pinned: false
    // TODO: Push to notes array
  }

  saveNotes();
  renderNotes();
  noteForm.reset();
});

cancelBtn.addEventListener('click', function() {
  // TODO: Reset editingId to null, reset form, hide cancel button, change button text back
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
  }

  if (action === 'pin') {
    // TODO Task 5: toggle note.pinned, save, render
  }

  if (action === 'edit') {
    // TODO Task 4: find note, set editingId, populate form, change button text
  }
});


// ============================================================
// TASK 6 — Search Filter (Bonus)
// ============================================================

const searchInput = document.querySelector('#search-input');
// TODO: Add 'input' listener → call renderNotes(searchInput.value)


// ============================================================
// Initialize
// ============================================================
renderNotes();
