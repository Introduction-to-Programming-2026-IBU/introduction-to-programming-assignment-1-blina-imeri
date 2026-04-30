/**
 * Exercise 6: Fetch & APIs
 * =========================
 * Complete each async function below.
 * All APIs used are free and require no authentication.
 */

// ============================================================
// UTILITY: Show a loading spinner inside an element
// ============================================================
function showLoading(element) {
  element.innerHTML = '<div class="spinner"></div>';
}

function showError(element, message) {
  element.innerHTML = `<p class="error-text">❌ ${message}</p>`;
}


// ============================================================
// TASK 1 — Random Quote
// API: https://api.quotable.io/random
// ============================================================
const quoteDisplay = document.querySelector('#quote-display');
const btnNewQuote  = document.querySelector('#btn-new-quote');

async function fetchQuote() {
  showLoading(quoteDisplay);

  try {
    // TODO: fetch from 'https://api.quotable.io/random'
    // TODO: check response.ok, throw if not
    // TODO: parse JSON
    // TODO: update quoteDisplay with the quote content and author
    // Template:
    // quoteDisplay.innerHTML = `
    //   <blockquote>"${data.content}"</blockquote>
    //   <p class="quote-author">— ${data.author}</p>
    // `;

  } catch (error) {
    showError(quoteDisplay, 'Could not load quote. Check your connection.');
    console.error(error);
  }
}

// Fetch a quote when the page loads, and on button click
fetchQuote();
btnNewQuote.addEventListener('click', fetchQuote);


// ============================================================
// TASK 2 — GitHub User Search
// API: https://api.github.com/users/{username}
// ============================================================
const githubInput  = document.querySelector('#github-input');
const btnSearch    = document.querySelector('#btn-search-user');
const githubResult = document.querySelector('#github-result');

async function searchUser() {
  const username = githubInput.value.trim();
  if (!username) return;

  showLoading(githubResult);

  try {
    // TODO: fetch from `https://api.github.com/users/${username}`
    // TODO: If response.status === 404, show "User not found"
    // TODO: If !response.ok for other reasons, throw an error
    // TODO: Parse JSON and display:
    //   - avatar_url (as an <img>)
    //   - name, login, bio
    //   - followers, public_repos
    //   - html_url (as a link)

  } catch (error) {
    showError(githubResult, error.message || 'Search failed. Try again.');
  }
}

btnSearch.addEventListener('click', searchUser);
githubInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') searchUser(); });


// ============================================================
// TASK 3 — Posts Feed with Pagination
// API: https://jsonplaceholder.typicode.com/posts
// ============================================================
const postsContainer = document.querySelector('#posts-container');
const btnLoadMore    = document.querySelector('#btn-load-more');
let currentPage = 1;
const postsPerPage = 10;

async function loadPosts() {
  const start = (currentPage - 1) * postsPerPage;
  // TODO: fetch from:
  //   `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${postsPerPage}`
  // TODO: For each post, create a card element and append to postsContainer
  // TODO: When a card is clicked, call loadComments(post.id, cardElement)
  // TODO: Increment currentPage after success
}

async function loadComments(postId, cardElement) {
  // TODO: fetch from `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  // TODO: Display comments inside or below cardElement
  // Toggle: if comments already shown, hide them
}

loadPosts();
btnLoadMore.addEventListener('click', loadPosts);


// ============================================================
// TASK 5 — Promise.all: Parallel Fetches
// ============================================================
const btnFetchAll  = document.querySelector('#btn-fetch-all');
const multiResult  = document.querySelector('#multi-result');

async function fetchAllParallel() {
  showLoading(multiResult);

  try {
    // TODO: Use Promise.all to fetch all three simultaneously:
    //   1. https://api.quotable.io/random
    //   2. https://jsonplaceholder.typicode.com/users/1
    //   3. https://jsonplaceholder.typicode.com/todos/1
    //
    // const [quoteRes, userRes, todoRes] = await Promise.all([
    //   fetch('...'), fetch('...'), fetch('...')
    // ]);
    // const [quote, user, todo] = await Promise.all([
    //   quoteRes.json(), userRes.json(), todoRes.json()
    // ]);
    //
    // TODO: Display all three results in multiResult

  } catch (error) {
    showError(multiResult, 'One or more requests failed.');
  }
}

btnFetchAll.addEventListener('click', fetchAllParallel);
