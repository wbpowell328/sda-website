// CASTLE chat widget — inline panel rendered at the top of the homepage.
// Looks for an element with id="castle-chat-inline" and mounts itself there;
// no-ops if the element isn't on the current page.
//
// Configure by setting window.CASTLE_CHAT_API before loading this script:
//   window.CASTLE_CHAT_API = "http://localhost:3000/chat";

(function () {
  const mount = document.getElementById('castle-chat-inline');
  if (!mount) return;

  const API_URL = window.CASTLE_CHAT_API || 'http://localhost:3000/chat';
  const STORAGE_KEY = 'castle_chat_messages_v2';
  const SESSION_KEY = 'castle_chat_session_v1';
  const MARKED_CDN = 'https://cdn.jsdelivr.net/npm/marked@15/marked.min.js';

  // Stable per-tab session ID so the admin log can group conversations.
  function getSessionId() {
    try {
      let id = sessionStorage.getItem(SESSION_KEY);
      if (!id) {
        id = (crypto.randomUUID ? crypto.randomUUID() : (Date.now() + '-' + Math.random().toString(36).slice(2)));
        sessionStorage.setItem(SESSION_KEY, id);
      }
      return id;
    } catch (e) {
      return Date.now() + '-' + Math.random().toString(36).slice(2);
    }
  }

  const SUGGESTIONS = [
    "What is a decision?",
    "What is the universal modeling framework?",
    "What is reinforcement learning?",
    "What is a state variable?",
    "What are the four classes of policies?",
    "Give a mathematical description of the knowledge gradient",
  ];

  // --- Lazy-load marked --------------------------------------------------
  let markedReady = null;
  function loadMarked() {
    if (markedReady) return markedReady;
    markedReady = new Promise((resolve) => {
      if (window.marked) return resolve(window.marked);
      const s = document.createElement('script');
      s.src = MARKED_CDN;
      s.onload = () => {
        if (window.marked?.setOptions) window.marked.setOptions({ breaks: true, gfm: true });
        resolve(window.marked);
      };
      s.onerror = () => resolve(null);
      document.head.appendChild(s);
    });
    return markedReady;
  }
  loadMarked();

  // --- Styles ------------------------------------------------------------
  const style = document.createElement('style');
  style.textContent = `
    .castle-chat-hero {
      background: #ffffff;
      border: 1px solid #d8c89c;
      border-radius: 12px;
      padding: 1.1rem 1.25rem;
      box-shadow: 0 2px 10px rgba(60, 40, 20, 0.06);
      margin-bottom: 1.5rem;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    }
    .castle-chat-header {
      display: flex;
      align-items: baseline;
      gap: 0.6rem;
      flex-wrap: wrap;
      margin-bottom: 0.85rem;
    }
    .castle-chat-icon {
      color: #c9621e;
      font-size: 1.05rem;
      line-height: 1;
    }
    .castle-chat-title {
      font-weight: 700;
      font-size: 1.02rem;
      color: #3d2914;
    }
    .castle-chat-sub {
      color: #7a6240;
      font-size: 0.9rem;
    }
    .castle-chat-suggestions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 0.85rem;
    }
    .castle-pill {
      background: #faf5e6;
      border: 1px solid #e5d8b5;
      color: #3d2914;
      border-radius: 999px;
      padding: 0.4rem 0.9rem;
      font-size: 0.86rem;
      font-family: inherit;
      cursor: pointer;
      transition: background 0.12s, border-color 0.12s;
      line-height: 1.2;
    }
    .castle-pill:hover {
      background: #ede0bd;
      border-color: #c9a86b;
    }
    .castle-chat-form {
      display: flex;
      gap: 0.5rem;
      align-items: stretch;
    }
    .castle-chat-input {
      flex: 1;
      border: 1px solid #d8c89c;
      border-radius: 8px;
      padding: 0.6rem 0.85rem;
      font-size: 0.95rem;
      font-family: inherit;
      line-height: 1.4;
      outline: none;
      resize: none;
      max-height: 140px;
      min-height: 42px;
      background: #fbf9f4;
      color: #2b2419;
    }
    .castle-chat-input:focus {
      border-color: #c9621e;
      background: #fff;
    }
    .castle-chat-send {
      flex: 0 0 auto;
      width: 42px;
      background: #c9621e;
      color: #fff;
      border: 0;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.12s;
    }
    .castle-chat-send:hover:not(:disabled) { background: #a84d12; }
    .castle-chat-send:disabled { opacity: 0.45; cursor: not-allowed; }

    .castle-chat-conv {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #ede0bd;
      max-height: 480px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .castle-chat-conv-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.6rem;
      font-size: 0.82rem;
      color: #7a6240;
    }
    .castle-chat-clear {
      background: none;
      border: 0;
      color: #8a3a1a;
      cursor: pointer;
      font-size: 0.82rem;
      padding: 0;
      text-decoration: underline;
    }
    .castle-msg {
      max-width: 85%;
      padding: 0.55rem 0.85rem;
      border-radius: 12px;
      line-height: 1.5;
      font-size: 0.95rem;
      word-wrap: break-word;
    }
    .castle-msg.user {
      align-self: flex-end;
      background: #3d2914;
      color: #f5ecd6;
      border-bottom-right-radius: 4px;
      white-space: pre-wrap;
    }
    .castle-msg.assistant {
      align-self: flex-start;
      background: #faf5e6;
      color: #2b2419;
      border: 1px solid #e5d8b5;
      border-bottom-left-radius: 4px;
    }
    .castle-msg.error {
      align-self: stretch;
      background: #fdecec;
      color: #8a1a1a;
      border: 1px solid #f5c2c2;
      font-size: 0.88rem;
    }
    .castle-msg.assistant.streaming::after {
      content: "▋";
      color: #c9621e;
      animation: castle-blink 1s steps(2) infinite;
    }
    @keyframes castle-blink { 50% { opacity: 0; } }

    /* Markdown rendering inside assistant bubbles */
    .castle-msg.assistant p { margin: 0 0 0.5rem; }
    .castle-msg.assistant p:last-child { margin-bottom: 0; }
    .castle-msg.assistant ul, .castle-msg.assistant ol {
      margin: 0.25rem 0 0.5rem; padding-left: 1.3rem;
    }
    .castle-msg.assistant li { margin: 0.1rem 0; }
    .castle-msg.assistant strong { color: #3d2914; }
    .castle-msg.assistant em { color: #5a4a35; }
    .castle-msg.assistant a { color: #8a3a1a; }

    /* Citation marker (e.g. "[1]") — small, orange, clickable. */
    .castle-msg.assistant a.castle-cite {
      display: inline-block;
      background: #ede0bd;
      color: #8a3a1a;
      text-decoration: none;
      padding: 0 0.3em;
      border-radius: 3px;
      font-size: 0.78em;
      font-weight: 600;
      vertical-align: 0.15em;
      margin: 0 0.05em;
      cursor: pointer;
    }
    .castle-msg.assistant a.castle-cite:hover {
      background: #c9621e;
      color: #fff;
    }
    .castle-sources .castle-cite-flash {
      background: #ede0bd;
      transition: background 0.6s;
    }
    .castle-sources {
      align-self: flex-start;
      max-width: 85%;
      margin-top: -0.2rem;
      font-size: 0.78rem;
      color: #7a6240;
    }
    .castle-sources summary {
      cursor: pointer;
      padding: 0.2rem 0.4rem;
      list-style: none;
      display: inline-block;
      color: #8a6a3a;
    }
    .castle-sources summary::-webkit-details-marker { display: none; }
    .castle-sources summary::before {
      content: "▸";
      display: inline-block;
      margin-right: 0.3rem;
      transition: transform 0.15s;
    }
    .castle-sources[open] summary::before { transform: rotate(90deg); }
    .castle-sources ol {
      margin: 0.2rem 0 0.5rem 0.5rem;
      padding: 0 0 0 1.3rem;
      color: #5a4a35;
    }
    .castle-sources li { margin: 0.15rem 0; line-height: 1.4; }
    .castle-sources .book { font-weight: 600; color: #3d2914; }
    .castle-msg.assistant blockquote {
      margin: 0.4rem 0;
      padding: 0.15rem 0.6rem;
      border-left: 3px solid #c9621e;
      color: #5a4a35;
      font-style: italic;
    }
    .castle-msg.assistant code {
      background: #ede0bd; padding: 0.05em 0.3em;
      border-radius: 3px; font-size: 0.88em;
    }
    .castle-msg.assistant pre {
      background: #1a1208; color: #f5ecd6;
      padding: 0.6rem 0.75rem; border-radius: 4px;
      overflow-x: auto; margin: 0.4rem 0; font-size: 0.85em;
    }
    .castle-msg.assistant pre code { background: transparent; padding: 0; color: inherit; }
    .castle-msg.assistant h1, .castle-msg.assistant h2,
    .castle-msg.assistant h3, .castle-msg.assistant h4 {
      margin: 0.5rem 0 0.25rem;
      color: #3d2914;
      font-size: 1rem;
      font-weight: 600;
    }

    .castle-chat-footer {
      margin-top: 0.6rem;
      font-size: 0.72rem;
      color: #8a6a3a;
      text-align: right;
    }
    .castle-chat-footer a { color: #8a3a1a; text-decoration: none; }

    @media (max-width: 600px) {
      .castle-chat-hero { padding: 0.9rem; }
      .castle-pill { font-size: 0.82rem; padding: 0.35rem 0.7rem; }
    }
  `;
  document.head.appendChild(style);

  // --- Markup ------------------------------------------------------------
  mount.innerHTML = `
    <section class="castle-chat-hero">
      <div class="castle-chat-header">
        <span class="castle-chat-icon">✦</span>
        <span class="castle-chat-title">Ask any questions about sequential decision problems, such as:</span>
      </div>
      <div class="castle-chat-suggestions"></div>
      <form class="castle-chat-form" novalidate>
        <textarea class="castle-chat-input" rows="1"
          placeholder="Ask anything about Warren's research, books, courses, or writing..."></textarea>
        <button type="submit" class="castle-chat-send" aria-label="Send">↑</button>
      </form>
      <div class="castle-chat-conv" hidden>
        <div class="castle-chat-conv-toolbar">
          <span class="castle-chat-conv-label">Conversation</span>
          <button type="button" class="castle-chat-clear">Clear</button>
        </div>
        <div class="castle-chat-messages"></div>
      </div>
      <div class="castle-chat-footer">Responses may be wrong; verify before citing.</div>
    </section>
  `;

  const sugWrap     = mount.querySelector('.castle-chat-suggestions');
  const form        = mount.querySelector('.castle-chat-form');
  const input       = mount.querySelector('.castle-chat-input');
  const sendBtn     = mount.querySelector('.castle-chat-send');
  const convWrap    = mount.querySelector('.castle-chat-conv');
  const messagesEl  = mount.querySelector('.castle-chat-messages');
  const clearBtn    = mount.querySelector('.castle-chat-clear');

  const INITIAL_PLACEHOLDER  = "Ask your question here";
  const FOLLOWUP_PLACEHOLDER = "Ask a follow-up — the bot remembers this conversation...";
  function refreshPlaceholder() {
    input.placeholder = messages.length > 0 ? FOLLOWUP_PLACEHOLDER : INITIAL_PLACEHOLDER;
  }

  // Render suggestion pills
  for (const s of SUGGESTIONS) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'castle-pill';
    btn.textContent = s;
    btn.addEventListener('click', () => {
      input.value = s;
      send();
    });
    sugWrap.appendChild(btn);
  }

  // --- State -------------------------------------------------------------
  let messages = [];
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) messages = JSON.parse(stored);
  } catch (e) { /* ignore */ }

  function saveMessages() {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch (e) {}
  }

  function showConv() { convWrap.hidden = false; }
  function hideConv() { convWrap.hidden = true; }

  function addBubble(role, text) {
    const div = document.createElement('div');
    div.className = `castle-msg ${role}`;
    div.textContent = text;
    if (role === 'user') {
      // New questions go to the TOP of the chat so the latest exchange is
      // always visible first. Older Q&A pairs sit below.
      messagesEl.insertBefore(div, messagesEl.firstChild);
      // The actual scroll container is `convWrap` (.castle-chat-conv has
      // max-height + overflow-y), not messagesEl itself. Reset both to 0
      // so the new Q&A pair is in view even if the user had scrolled down
      // to read an older exchange.
      if (convWrap) convWrap.scrollTop = 0;
      messagesEl.scrollTop = 0;
    } else {
      // Assistant messages: insert immediately after the topmost user
      // bubble so the Q&A pair stays together at the top.
      const topUser = messagesEl.querySelector('.castle-msg.user');
      if (topUser) {
        messagesEl.insertBefore(div, topUser.nextSibling);
      } else {
        messagesEl.insertBefore(div, messagesEl.firstChild);
      }
    }
    return div;
  }

  async function renderMarkdown(bubble, text) {
    const marked = await loadMarked();
    if (!marked) { bubble.textContent = text; return; }

    // Protect $$...$$ and $...$ math blocks from marked's backslash escaping
    // (otherwise "\left\{" becomes "\left{" and MathJax can't parse it).
    const blocks = [];
    const SENTINEL = 'CASTLEMATH';
    let protectedText = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, m) => {
      blocks.push({ display: true, content: m });
      return SENTINEL + (blocks.length - 1) + SENTINEL;
    });
    protectedText = protectedText.replace(/(?<!\\)\$(?!\$)([^\$\n]+?)(?<!\\)\$(?!\$)/g, (_, m) => {
      blocks.push({ display: false, content: m });
      return SENTINEL + (blocks.length - 1) + SENTINEL;
    });

    let html = marked.parse(protectedText);

    // Restore math placeholders.
    const escRe = new RegExp(SENTINEL + '(\\d+)' + SENTINEL, 'g');
    /* cleaned: math sentinel regex */
    html = html.replace(escRe, (_, idx) => {
      const b = blocks[Number(idx)];
      return b.display ? '$$' + b.content + '$$' : '$' + b.content + '$';
    });

    bubble.innerHTML = html;
    linkifyCitations(bubble);
  }

  // Ask MathJax to typeset any $...$ / $$...$$ math inside an element.
  // No-op if MathJax isn't loaded on this page.
  function typesetMath(el) {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([el]).catch(err => console.error('MathJax:', err));
    }
  }

  // Convert plain "[1]" / "[2]" citation markers in the rendered assistant text
  // into clickable links. If the citation has a URL (CASTLE Site pages), the
  // marker opens the URL in a new tab. Otherwise it opens/scrolls the Sources
  // panel attached to this answer.
  function linkifyCitations(bubble) {
    const cites = bubble.dataset.citations
      ? JSON.parse(bubble.dataset.citations)
      : (bubble._castleCitations || []);
    if (!cites || cites.length === 0) return;

    function processText(node) {
      const text = node.nodeValue;
      if (!/\[\d+\]/.test(text)) return;
      const frag = document.createDocumentFragment();
      let lastIdx = 0;
      text.replace(/\[(\d+)\]/g, (match, numStr, offset) => {
        frag.appendChild(document.createTextNode(text.slice(lastIdx, offset)));
        const n = Number(numStr);
        const c = cites[n - 1];
        const a = document.createElement('a');
        a.className = 'castle-cite';
        a.textContent = match;
        if (c && c.url) {
          a.href = c.url;
          a.target = '_blank';
          a.rel = 'noopener';
          a.title = [c.book, c.chapter, c.section].filter(Boolean).join(' · ');
        } else if (c) {
          a.href = '#';
          a.title = [c.book, c.chapter, c.section].filter(Boolean).join(' · ');
          a.addEventListener('click', (e) => {
            e.preventDefault();
            const det = bubble.nextElementSibling;
            if (det && det.classList.contains('castle-sources')) {
              det.open = true;
              const li = det.querySelector(`li:nth-child(${n})`);
              if (li) {
                li.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                li.classList.add('castle-cite-flash');
                setTimeout(() => li.classList.remove('castle-cite-flash'), 1200);
              }
            }
          });
        } else {
          a.href = '#';
          a.addEventListener('click', e => e.preventDefault());
        }
        frag.appendChild(a);
        lastIdx = offset + match.length;
        return match;
      });
      frag.appendChild(document.createTextNode(text.slice(lastIdx)));
      node.parentNode.replaceChild(frag, node);
    }

    // Walk only text nodes (don't break existing <a> tags from markdown).
    const walker = document.createTreeWalker(bubble, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(processText);
  }

  // Render a collapsible "Sources" panel under the assistant message.
  function renderSources(bubble, citations) {
    // Stash citations on the bubble so subsequent re-renders (during streaming)
    // can also linkify [N] markers.
    bubble._castleCitations = citations;
    linkifyCitations(bubble);

    const det = document.createElement('details');
    det.className = 'castle-sources';
    const sum = document.createElement('summary');
    sum.textContent = `Sources (${citations.length})`;
    det.appendChild(sum);
    const ol = document.createElement('ol');
    for (const c of citations) {
      const li = document.createElement('li');
      const parts = [c.chapter, c.section].filter(s => s && s.trim()).join(' · ');
      const inner = `<span class="book">${escapeHtml(c.book || 'Source')}</span>${parts ? ' — ' + escapeHtml(parts) : ''}`;
      if (c.url) {
        li.innerHTML = `<a href="${escapeHtml(c.url)}" target="_blank" rel="noopener">${inner}</a>`;
      } else {
        li.innerHTML = inner;
      }
      ol.appendChild(li);
    }
    det.appendChild(ol);
    // Place the Sources panel immediately after its assistant bubble so it
    // travels with the Q&A pair under the reverse-chronological layout.
    messagesEl.insertBefore(det, bubble.nextSibling);
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, ch => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[ch]);
  }

  function renderAll() {
    messagesEl.innerHTML = '';
    if (messages.length === 0) { hideConv(); return; }
    showConv();
    for (const m of messages) {
      const bubble = addBubble(m.role, m.content);
      if (m.role === 'assistant') {
        if (Array.isArray(m.citations) && m.citations.length > 0) {
          bubble._castleCitations = m.citations;
        }
        // Render markdown then typeset math sequentially.
        renderMarkdown(bubble, m.content).then(() => typesetMath(bubble));
        if (Array.isArray(m.citations) && m.citations.length > 0) {
          renderSources(bubble, m.citations);
        }
      }
    }
  }
  renderAll();

  // --- Send --------------------------------------------------------------
  let sending = false;

  async function send() {
    if (sending) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    input.style.height = 'auto';

    messages.push({ role: 'user', content: text });
    showConv();
    addBubble('user', text);
    saveMessages();

    sending = true;
    sendBtn.disabled = true;
    const assistantBubble = addBubble('assistant', '');
    assistantBubble.classList.add('streaming');
    let assistantText = '';
    let lastCitations = null;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, sessionId: getSessionId() }),
      });

      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => `${res.status} ${res.statusText}`);
        throw new Error(errText);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = line.slice(6).trim();
          if (!payload) continue;
          try {
            const evt = JSON.parse(payload);
            if (evt.delta) {
              assistantText += evt.delta;
              renderMarkdown(assistantBubble, assistantText);
              // Do NOT auto-scroll here: the user's question is pinned to
              // the top of the view (see addBubble for 'user'), and we want
              // the streaming answer to fill in below it at its own pace.
            } else if (evt.citations) {
              lastCitations = evt.citations;
            } else if (evt.error) {
              throw new Error(evt.error);
            }
          } catch (e) {
            if (e instanceof SyntaxError) continue;
            throw e;
          }
        }
      }

      assistantBubble.classList.remove('streaming');
      if (Array.isArray(lastCitations) && lastCitations.length > 0) {
        renderSources(assistantBubble, lastCitations);
      }
      typesetMath(assistantBubble);
      messages.push({ role: 'assistant', content: assistantText, citations: lastCitations || [] });
      saveMessages();
      refreshPlaceholder();
    } catch (err) {
      assistantBubble.remove();
      addBubble('error', `Error: ${err.message}\n\nIs the chatbot server running? (npm start in chatbot/)`);
    } finally {
      sending = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }

  // --- Wire up -----------------------------------------------------------
  form.addEventListener('submit', (e) => { e.preventDefault(); send(); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(140, input.scrollHeight) + 'px';
  });
  clearBtn.addEventListener('click', () => {
    messages = [];
    saveMessages();
    // Reset the session ID too — Clear starts a fresh conversation in the log.
    try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
    messagesEl.innerHTML = '';
    hideConv();
    refreshPlaceholder();
    input.focus();
  });

  // Set the initial placeholder based on any restored session-storage messages.
  refreshPlaceholder();
})();
