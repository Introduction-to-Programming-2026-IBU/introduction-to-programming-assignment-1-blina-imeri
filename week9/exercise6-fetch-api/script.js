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
    const response = await fetch('https://api.quotable.io/random');
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    const data = await response.json();
    quoteDisplay.innerHTML = `
      <blockquote>"${data.content}"</blockquote>
      <p class="quote-author">— ${data.author}</p>
    `;

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
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (response.status === 404) {
      showError(githubResult, 'User not found.');
      return;
    }
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    const data = await response.json();
    githubResult.innerHTML = `
      <div class="github-card">
        <img src="${data.avatar_url}" alt="${data.login}'s avatar" class="github-avatar">
        <h2>${data.name || data.login}</h2>
        <p>${data.bio || ''}</p>
        <p>Followers: ${data.followers} | Repos: ${data.public_repos}</p>
        <a href="${data.html_url}" target="_blank">View Profile</a>
      </div>
    `;  

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

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${postsPerPage}`);
    if (!response.ok) {
      throw new Error('Failed to load posts');
    }
    const posts = await response.json();
    posts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'post-card';
      card.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      `;
      card.addEventListener('click', () => loadComments(post.id, card));
      postsContainer.appendChild(card);
    });
    currentPage++;
}

async function loadComments(postId, cardElement) {
  // TODO: fetch from `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  // TODO: Display comments inside or below cardElement
  // Toggle: if comments already shown, hide them
  const existingComments = cardElement.querySelector('.comments');
  if (existingComments) {
    existingComments.remove();
    return;
  }

  const commentsContainer = document.createElement('div');
  commentsContainer.className = 'comments';
  cardElement.appendChild(commentsContainer);

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    if (!response.ok) {
      throw new Error('Failed to load comments');
    }
    const comments = await response.json();
    comments.forEach(comment => {
      const commentEl = document.createElement('div');
      commentEl.className = 'comment';
      commentEl.innerHTML = `
        <p><strong>${comment.name}</strong> (${comment.email})</p>
        <p>${comment.body}</p>
      `;
      commentsContainer.appendChild(commentEl);
    });
  } catch (error) {
    showError(commentsContainer, 'Could not load comments.');
  }
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
    const [quoteRes, userRes, todoRes] = await Promise.all([
      fetch('https://api.quotable.io/random'),
      fetch('https://jsonplaceholder.typicode.com/users/1'),
      fetch('https://jsonplaceholder.typicode.com/todos/1')
    ]);

    if (!quoteRes.ok || !userRes.ok || !todoRes.ok) {
      throw new Error('One or more requests failed');
    }

    const [quote, user, todo] = await Promise.all([
      quoteRes.json(),
      userRes.json(),
      todoRes.json()
    ]);

    multiResult.innerHTML = `
      <h3>Random Quote</h3>
      <blockquote>"${quote.content}"</blockquote>
      <p class="quote-author">— ${quote.author}</p>

      <h3>User Info</h3>
      <p>Name: ${user.name}</p>
      <p>Email: ${user.email}</p>
      <p>Company: ${user.company.name}</p>

      <h3>Todo Info</h3>
      <p>Title: ${todo.title}</p>
      <p>Completed: ${todo.completed ? 'Yes' : 'No'}</p>
    `;
  } catch (error) {
    showError(multiResult, 'One or more requests failed.');
  }
}

btnFetchAll.addEventListener('click', fetchAllParallel);
