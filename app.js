/**
 * K-Explore Event Management Platform - Main Application Script
 * Features: Dynamic Rendering, Multi-criteria Filtering, Real-time Search,
 * Form Validation, LocalStorage Data Management, Live Countdown Timers,
 * Dark/Light Mode, Ticket Generation & Printing.
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. Application State & Storage Keys
  // =========================================================================
  const STORAGE_KEYS = {
    THEME: 'kexplore_theme',
    FAVORITES: 'kexplore_favorites',
    REGISTRATIONS: 'kexplore_registrations'
  };

  const state = {
    events: [...EVENTS_DATA],
    filteredEvents: [...EVENTS_DATA],
    selectedCategory: 'all',
    searchQuery: '',
    sortOption: 'upcoming',
    filterStatus: 'all', // 'all', 'featured', 'saved'
    favorites: new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]')),
    registrations: JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTRATIONS) || '[]'),
    theme: localStorage.getItem(STORAGE_KEYS.THEME) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    activeDetailEventId: null,
    heroTimerInterval: null,
    modalTimerInterval: null
  };

  // Flagship event for the Hero countdown
  const FLAGSHIP_EVENT_ID = 'hack-k-explore-2026';

  // =========================================================================
  // 2. DOM Elements Cache
  // =========================================================================
  const DOM = {
    html: document.documentElement,
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    navMenu: document.getElementById('navMenu'),
    navLinks: document.querySelectorAll('.nav-link'),
    siteHeader: document.querySelector('.site-header'),

    // Hero elements
    heroCountdownDays: document.getElementById('heroDays'),
    heroCountdownHours: document.getElementById('heroHours'),
    heroCountdownMins: document.getElementById('heroMins'),
    heroCountdownSecs: document.getElementById('heroSecs'),
    heroRegisterBtn: document.getElementById('heroRegisterBtn'),
    heroExploreBtn: document.getElementById('heroExploreBtn'),

    // Search and filter controls
    searchInput: document.getElementById('searchInput'),
    searchClearBtn: document.getElementById('searchClearBtn'),
    sortSelect: document.getElementById('sortSelect'),
    statusFilterSelect: document.getElementById('statusFilterSelect'),
    categoryPillsContainer: document.getElementById('categoryPills'),
    filterSummaryText: document.getElementById('filterSummaryText'),
    resetFiltersBtn: document.getElementById('resetFiltersBtn'),

    // Events grid
    eventsGrid: document.getElementById('eventsGrid'),
    myTicketsBtn: document.getElementById('myTicketsBtn'),
    ticketsCountBadge: document.getElementById('ticketsCountBadge'),

    // Event Details Modal
    detailsModal: document.getElementById('detailsModal'),
    detailsModalCloseBtn: document.getElementById('detailsModalCloseBtn'),
    detailsModalBody: document.getElementById('detailsModalBody'),
    detailsModalRegisterBtn: document.getElementById('detailsModalRegisterBtn'),

    // Registration Modal & Form
    registrationModal: document.getElementById('registrationModal'),
    registrationModalCloseBtn: document.getElementById('registrationModalCloseBtn'),
    registrationForm: document.getElementById('registrationForm'),
    regEventSelect: document.getElementById('regEventSelect'),
    regSubmitBtn: document.getElementById('regSubmitBtn'),

    // Form inputs
    inputName: document.getElementById('regName'),
    inputEmail: document.getElementById('regEmail'),
    inputPhone: document.getElementById('regPhone'),
    inputOrg: document.getElementById('regOrg'),
    inputTicketType: document.getElementById('regTicketType'),
    inputNotes: document.getElementById('regNotes'),
    inputTerms: document.getElementById('regTerms'),

    // Ticket Confirmation Modal
    ticketModal: document.getElementById('ticketModal'),
    ticketModalCloseBtn: document.getElementById('ticketModalCloseBtn'),
    ticketPassElement: document.getElementById('ticketPassElement'),
    ticketPrintBtn: document.getElementById('ticketPrintBtn'),
    ticketCalendarBtn: document.getElementById('ticketCalendarBtn'),
    ticketViewDrawerBtn: document.getElementById('ticketViewDrawerBtn'),

    // "My Registrations" Drawer
    myRegistrationsDrawer: document.getElementById('myRegistrationsDrawer'),
    drawerCloseBtn: document.getElementById('drawerCloseBtn'),
    drawerListContainer: document.getElementById('drawerListContainer'),

    // Toast Container
    toastContainer: document.getElementById('toastContainer')
  };

  // =========================================================================
  // 3. Theme Toggle & Preferences
  // =========================================================================
  function initTheme() {
    DOM.html.setAttribute('data-theme', state.theme);
    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.setAttribute('aria-label', `Switch to ${state.theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    DOM.html.setAttribute('data-theme', state.theme);
    localStorage.setItem(STORAGE_KEYS.THEME, state.theme);
    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.setAttribute('aria-label', `Switch to ${state.theme === 'dark' ? 'light' : 'dark'} mode`);
    }
    showToast(`Switched to ${state.theme.toUpperCase()} mode`, 'info');
  }

  // =========================================================================
  // 4. Hero Flagship Countdown Timer (Bonus Challenge)
  // =========================================================================
  function initHeroCountdown() {
    const flagship = state.events.find(e => e.id === FLAGSHIP_EVENT_ID) || state.events[0];
    if (!flagship) return;

    const targetDate = new Date(flagship.isoDate).getTime();

    function update() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        if (DOM.heroCountdownDays) DOM.heroCountdownDays.textContent = '00';
        if (DOM.heroCountdownHours) DOM.heroCountdownHours.textContent = '00';
        if (DOM.heroCountdownMins) DOM.heroCountdownMins.textContent = '00';
        if (DOM.heroCountdownSecs) DOM.heroCountdownSecs.textContent = '00';
        clearInterval(state.heroTimerInterval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (DOM.heroCountdownDays) DOM.heroCountdownDays.textContent = String(days).padStart(2, '0');
      if (DOM.heroCountdownHours) DOM.heroCountdownHours.textContent = String(hours).padStart(2, '0');
      if (DOM.heroCountdownMins) DOM.heroCountdownMins.textContent = String(minutes).padStart(2, '0');
      if (DOM.heroCountdownSecs) DOM.heroCountdownSecs.textContent = String(seconds).padStart(2, '0');
    }

    update();
    state.heroTimerInterval = setInterval(update, 1000);
  }

  // =========================================================================
  // 5. Category Pills Rendering
  // =========================================================================
  function renderCategoryPills() {
    if (!DOM.categoryPillsContainer) return;
    DOM.categoryPillsContainer.innerHTML = '';

    CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `category-pill ${state.selectedCategory === cat.id ? 'active' : ''}`;
      btn.dataset.category = cat.id;
      btn.innerHTML = `
        <span class="pill-dot"></span>
        <span>${cat.label}</span>
      `;
      btn.addEventListener('click', () => {
        state.selectedCategory = cat.id;
        document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        applyFiltersAndRender();
      });
      DOM.categoryPillsContainer.appendChild(btn);
    });
  }

  // Populate registration event dropdown
  function populateEventDropdown() {
    if (!DOM.regEventSelect) return;
    DOM.regEventSelect.innerHTML = '<option value="" disabled selected>Choose an event to attend *</option>';

    state.events.forEach(ev => {
      const opt = document.createElement('option');
      opt.value = ev.id;
      opt.textContent = `${ev.title} (${formatShortDate(ev.date)})`;
      DOM.regEventSelect.appendChild(opt);
    });
  }

  // =========================================================================
  // 6. Filtering, Searching & Sorting Logic
  // =========================================================================
  function applyFiltersAndRender() {
    let result = [...state.events];

    // Filter by Category
    if (state.selectedCategory !== 'all') {
      result = result.filter(e => e.category === state.selectedCategory);
    }

    // Filter by Status (Featured, Saved, etc.)
    if (state.filterStatus === 'featured') {
      result = result.filter(e => e.featured);
    } else if (state.filterStatus === 'saved') {
      result = result.filter(e => state.favorites.has(e.id));
    }

    // Filter by Search Query
    if (state.searchQuery.trim() !== '') {
      const query = state.searchQuery.toLowerCase().trim();
      result = result.filter(e =>
        e.title.toLowerCase().includes(query) ||
        e.shortDescription.toLowerCase().includes(query) ||
        e.venue.toLowerCase().includes(query) ||
        e.categoryLabel.toLowerCase().includes(query)
      );
    }

    // Sort Logic
    if (state.sortOption === 'upcoming') {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (state.sortOption === 'popular') {
      result.sort((a, b) => (b.seatsFilled / b.seatsTotal) - (a.seatsFilled / a.seatsTotal));
    } else if (state.sortOption === 'title-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    state.filteredEvents = result;
    renderEventsGrid(result);
    updateFilterSummary(result.length);
  }

  function updateFilterSummary(count) {
    if (!DOM.filterSummaryText) return;

    let text = `Showing <strong>${count}</strong> event${count === 1 ? '' : 's'}`;
    if (state.selectedCategory !== 'all') {
      const catObj = CATEGORIES.find(c => c.id === state.selectedCategory);
      if (catObj) text += ` in <em>${catObj.label}</em>`;
    }
    if (state.searchQuery.trim() !== '') {
      text += ` matching "${escapeHtml(state.searchQuery)}"`;
    }
    if (state.filterStatus === 'saved') {
      text += ` (Favorites only)`;
    } else if (state.filterStatus === 'featured') {
      text += ` (Featured only)`;
    }

    DOM.filterSummaryText.innerHTML = text;
  }

  // =========================================================================
  // 7. Event Cards Rendering
  // =========================================================================
  function renderEventsGrid(events) {
    if (!DOM.eventsGrid) return;

    if (events.length === 0) {
      DOM.eventsGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
          <h3 class="empty-state-title">No Events Found</h3>
          <p class="empty-state-text">No events match your current search and filter criteria. Try adjusting your keyword or clearing filters.</p>
          <button type="button" class="btn btn-secondary btn-sm" id="emptyStateResetBtn">
            Reset All Filters
          </button>
        </div>
      `;

      const resetBtn = document.getElementById('emptyStateResetBtn');
      if (resetBtn) resetBtn.addEventListener('click', resetAllFilters);
      return;
    }

    DOM.eventsGrid.innerHTML = events.map(ev => {
      const isFavorited = state.favorites.has(ev.id);
      const isRegistered = state.registrations.some(r => r.eventId === ev.id);
      const seatsLeft = ev.seatsTotal - ev.seatsFilled;
      const fillPercentage = Math.round((ev.seatsFilled / ev.seatsTotal) * 100);

      return `
        <article class="event-card" data-id="${ev.id}">
          <div class="card-media">
            <img src="${ev.image}" alt="${escapeHtml(ev.title)}" class="card-img" loading="lazy" />
            <div class="card-overlay-gradient"></div>

            <div class="card-badges-top">
              <span class="card-category-badge">${ev.categoryLabel}</span>
              <button type="button" class="card-favorite-btn ${isFavorited ? 'favorited' : ''}" 
                      aria-label="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}"
                      data-fav-id="${ev.id}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFavorited ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>

            <div class="card-date-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>${formatPrettyDate(ev.date)}</span>
            </div>
          </div>

          <div class="card-body">
            <h3 class="card-title">${escapeHtml(ev.title)}</h3>
            <p class="card-desc">${escapeHtml(ev.shortDescription)}</p>

            <div class="card-meta-list">
              <div class="card-meta-row">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>${ev.time}</span>
              </div>
              <div class="card-meta-row">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span>${escapeHtml(ev.venue)}</span>
              </div>

              <!-- Seat availability progress -->
              <div class="seats-progress-wrapper">
                <div class="seats-label-row">
                  <span>Seats: ${seatsLeft > 0 ? `${seatsLeft} left` : 'Sold out'}</span>
                  <span>${fillPercentage}% Filled</span>
                </div>
                <div class="seats-progress-bar">
                  <div class="seats-fill" style="width: ${fillPercentage}%"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <button type="button" class="btn btn-secondary btn-sm btn-details" data-detail-id="${ev.id}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              View Details
            </button>
            <button type="button" class="btn ${isRegistered ? 'btn-secondary' : 'btn-primary'} btn-sm btn-register" data-reg-id="${ev.id}">
              ${isRegistered ? `
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Registered
              ` : `
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
                Register
              `}
            </button>
          </div>
        </article>
      `;
    }).join('');

    attachCardEventListeners();
  }

  function attachCardEventListeners() {
    // Favorite Buttons
    document.querySelectorAll('[data-fav-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(btn.dataset.favId);
      });
    });

    // View Details Buttons
    document.querySelectorAll('[data-detail-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        openEventDetailsModal(btn.dataset.detailId);
      });
    });

    // Register Buttons
    document.querySelectorAll('[data-reg-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const eventId = btn.dataset.regId;
        const alreadyReg = state.registrations.find(r => r.eventId === eventId);
        if (alreadyReg) {
          showTicketPassModal(alreadyReg);
        } else {
          openRegistrationModal(eventId);
        }
      });
    });
  }

  // =========================================================================
  // 8. Favorites / Bookmarking (Bonus Challenge)
  // =========================================================================
  function toggleFavorite(eventId) {
    if (state.favorites.has(eventId)) {
      state.favorites.delete(eventId);
      showToast('Removed from favorites', 'info');
    } else {
      state.favorites.add(eventId);
      showToast('Added to your favorite events!', 'success');
    }

    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([...state.favorites]));
    applyFiltersAndRender();
  }

  // =========================================================================
  // 9. Event Details Modal
  // =========================================================================
  function openEventDetailsModal(eventId) {
    const eventObj = state.events.find(e => e.id === eventId);
    if (!eventObj) return;

    state.activeDetailEventId = eventId;
    const isRegistered = state.registrations.some(r => r.eventId === eventId);

    // Build Modal Content
    DOM.detailsModalBody.innerHTML = `
      <div class="modal-hero-cover">
        <img src="${eventObj.image}" alt="${escapeHtml(eventObj.title)}" />
        <div class="modal-hero-overlay">
          <span class="modal-category-tag">${eventObj.categoryLabel}</span>
          <h2 class="modal-event-title">${escapeHtml(eventObj.title)}</h2>
          <p style="opacity: 0.9; font-size: 0.95rem; margin-top: 0.25rem;">${escapeHtml(eventObj.tagline || '')}</p>
        </div>
      </div>

      <div class="modal-scroll-body">
        <!-- Live Countdown specific to this event -->
        <div class="modal-countdown-block">
          <div class="modal-countdown-label">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Starts In:</span>
          </div>
          <div class="modal-clock-inline" id="modalCountdownClock">
            <div class="clock-inline-item"><span class="clock-inline-val" id="modalClockDays">00</span><span class="clock-inline-unit">Days</span></div>
            <div class="clock-inline-item"><span class="clock-inline-val" id="modalClockHours">00</span><span class="clock-inline-unit">Hours</span></div>
            <div class="clock-inline-item"><span class="clock-inline-val" id="modalClockMins">00</span><span class="clock-inline-unit">Mins</span></div>
            <div class="clock-inline-item"><span class="clock-inline-val" id="modalClockSecs">00</span><span class="clock-inline-unit">Secs</span></div>
          </div>
        </div>

        <!-- Meta Grid -->
        <div class="details-meta-grid">
          <div class="meta-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <div>
              <div class="meta-box-label">Date</div>
              <div class="meta-box-value">${formatPrettyDate(eventObj.date)}</div>
            </div>
          </div>
          <div class="meta-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <div>
              <div class="meta-box-label">Time</div>
              <div class="meta-box-value">${eventObj.time}</div>
            </div>
          </div>
          <div class="meta-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <div>
              <div class="meta-box-label">Venue</div>
              <div class="meta-box-value">${escapeHtml(eventObj.venue)}</div>
            </div>
          </div>
          <div class="meta-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
            </svg>
            <div>
              <div class="meta-box-label">Availability</div>
              <div class="meta-box-value">${eventObj.seatsTotal - eventObj.seatsFilled} Seats Left</div>
            </div>
          </div>
        </div>

        <!-- Full Description -->
        <div>
          <h4 class="details-section-heading">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            About This Event
          </h4>
          <p style="color: var(--text-muted); line-height: 1.7; font-size: 0.95rem;">${escapeHtml(eventObj.fullDescription)}</p>
        </div>

        <!-- Schedule / Agenda -->
        ${eventObj.schedule && eventObj.schedule.length > 0 ? `
          <div>
            <h4 class="details-section-heading">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 14 14"></polyline>
              </svg>
              Event Agenda
            </h4>
            <div class="timeline">
              ${eventObj.schedule.map(item => `
                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-time">${escapeHtml(item.time)}</div>
                  <div class="timeline-activity">${escapeHtml(item.activity)}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Speakers / Mentors -->
        ${eventObj.speakers && eventObj.speakers.length > 0 ? `
          <div>
            <h4 class="details-section-heading">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Featured Speakers & Mentors
            </h4>
            <div class="speakers-grid">
              ${eventObj.speakers.map(sp => `
                <div class="speaker-card">
                  <img src="${sp.avatar}" alt="${escapeHtml(sp.name)}" class="speaker-avatar" />
                  <div class="speaker-info">
                    <h5>${escapeHtml(sp.name)}</h5>
                    <p>${escapeHtml(sp.role)}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Perks / Badges -->
        ${eventObj.perks && eventObj.perks.length > 0 ? `
          <div>
            <h4 class="details-section-heading">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              Attendee Perks & Takeaways
            </h4>
            <div class="perks-list">
              ${eventObj.perks.map(perk => `
                <span class="perk-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  ${escapeHtml(perk)}
                </span>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <div class="modal-bottom-actions">
        <div>
          <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">Registration Fee</span>
          <span style="font-size: 1.25rem; font-weight: 800; color: var(--success);">${eventObj.price}</span>
        </div>
        <button type="button" class="btn btn-primary" id="modalActionBtn">
          ${isRegistered ? 'View My Digital Pass' : 'Register for this Event'}
        </button>
      </div>
    `;

    // Hook up modal countdown
    initModalCountdown(eventObj.isoDate);

    // Hook up CTA button
    const actionBtn = document.getElementById('modalActionBtn');
    if (actionBtn) {
      actionBtn.addEventListener('click', () => {
        closeModal(DOM.detailsModal);
        if (isRegistered) {
          const regItem = state.registrations.find(r => r.eventId === eventId);
          showTicketPassModal(regItem);
        } else {
          openRegistrationModal(eventId);
        }
      });
    }

    openModal(DOM.detailsModal);
  }

  function initModalCountdown(isoDate) {
    if (state.modalTimerInterval) clearInterval(state.modalTimerInterval);

    const target = new Date(isoDate).getTime();
    const daysEl = document.getElementById('modalClockDays');
    const hoursEl = document.getElementById('modalClockHours');
    const minsEl = document.getElementById('modalClockMins');
    const secsEl = document.getElementById('modalClockSecs');

    function update() {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minsEl) minsEl.textContent = '00';
        if (secsEl) secsEl.textContent = '00';
        clearInterval(state.modalTimerInterval);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
    }

    update();
    state.modalTimerInterval = setInterval(update, 1000);
  }

  // =========================================================================
  // 10. Registration Form Handling & Validation
  // =========================================================================
  function openRegistrationModal(preSelectedEventId = null) {
    if (preSelectedEventId && DOM.regEventSelect) {
      DOM.regEventSelect.value = preSelectedEventId;
    }
    clearFormErrors();
    openModal(DOM.registrationModal);
  }

  // Form Field Validation Rules
  const VALIDATION_RULES = {
    name: {
      regex: /^[A-Za-z\s]{3,50}$/,
      message: 'Please enter a valid full name (at least 3 characters, alphabets only).'
    },
    email: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      message: 'Please enter a valid email address (e.g., student@domain.com).'
    },
    phone: {
      regex: /^[6-9]\d{9}$/,
      message: 'Please enter a valid 10-digit mobile number (e.g., 9876543210).'
    }
  };

  function validateField(inputElement) {
    const id = inputElement.id;
    const formGroup = inputElement.closest('.form-group');
    const errorEl = formGroup ? formGroup.querySelector('.form-error-feedback') : null;
    let isValid = true;
    let errorMsg = '';

    const val = inputElement.value.trim();

    if (id === 'regName') {
      if (!val) {
        isValid = false;
        errorMsg = 'Full Name is required.';
      } else if (!VALIDATION_RULES.name.regex.test(val)) {
        isValid = false;
        errorMsg = VALIDATION_RULES.name.message;
      }
    } else if (id === 'regEmail') {
      if (!val) {
        isValid = false;
        errorMsg = 'Email address is required.';
      } else if (!VALIDATION_RULES.email.regex.test(val)) {
        isValid = false;
        errorMsg = VALIDATION_RULES.email.message;
      }
    } else if (id === 'regPhone') {
      if (!val) {
        isValid = false;
        errorMsg = 'Phone number is required.';
      } else if (!VALIDATION_RULES.phone.regex.test(val)) {
        isValid = false;
        errorMsg = VALIDATION_RULES.phone.message;
      }
    } else if (id === 'regEventSelect') {
      if (!val) {
        isValid = false;
        errorMsg = 'Please select an event to register.';
      }
    } else if (id === 'regTicketType') {
      if (!val) {
        isValid = false;
        errorMsg = 'Please select a pass / ticket type.';
      }
    } else if (id === 'regTerms') {
      if (!inputElement.checked) {
        isValid = false;
        errorMsg = 'You must accept the terms to proceed.';
      }
    }

    // Update UI states
    if (!isValid) {
      inputElement.classList.add('is-invalid');
      inputElement.classList.remove('is-valid');
      if (formGroup) formGroup.classList.add('has-error');
      if (errorEl) errorEl.textContent = errorMsg;
    } else {
      inputElement.classList.remove('is-invalid');
      inputElement.classList.add('is-valid');
      if (formGroup) formGroup.classList.remove('has-error');
      if (errorEl) errorEl.textContent = '';
    }

    return isValid;
  }

  function clearFormErrors() {
    if (!DOM.registrationForm) return;
    const inputs = DOM.registrationForm.querySelectorAll('.form-control, input[type="checkbox"]');
    inputs.forEach(input => {
      input.classList.remove('is-invalid', 'is-valid');
      const formGroup = input.closest('.form-group');
      if (formGroup) {
        formGroup.classList.remove('has-error');
        const err = formGroup.querySelector('.form-error-feedback');
        if (err) err.textContent = '';
      }
    });
  }

  function handleRegistrationSubmit(e) {
    e.preventDefault();

    // Validate all required inputs
    const inputsToValidate = [
      DOM.regEventSelect,
      DOM.inputName,
      DOM.inputEmail,
      DOM.inputPhone,
      DOM.inputTicketType,
      DOM.inputTerms
    ];

    let isFormValid = true;
    let firstInvalidInput = null;

    inputsToValidate.forEach(input => {
      if (!input) return;
      const valid = validateField(input);
      if (!valid) {
        isFormValid = false;
        if (!firstInvalidInput) firstInvalidInput = input;
      }
    });

    if (!isFormValid) {
      if (firstInvalidInput) firstInvalidInput.focus();
      showToast('Please correct the highlighted errors in the form.', 'error');
      return;
    }

    const eventId = DOM.regEventSelect.value;
    const eventObj = state.events.find(ev => ev.id === eventId);
    if (!eventObj) return;

    // Check duplicate registration
    const email = DOM.inputEmail.value.trim().toLowerCase();
    const isAlreadyRegistered = state.registrations.some(
      r => r.eventId === eventId && r.email.toLowerCase() === email
    );

    if (isAlreadyRegistered) {
      showToast('You are already registered for this event with this email!', 'error');
      return;
    }

    // Submit Simulation & Loading State
    const submitBtn = DOM.regSubmitBtn;
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spin-animation" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"></circle>
      </svg>
      Securing Your Spot...
    `;

    setTimeout(() => {
      // Create Registration Record
      const registrationRecord = {
        id: `KX-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        eventId: eventObj.id,
        eventTitle: eventObj.title,
        eventDate: eventObj.date,
        eventTime: eventObj.time,
        eventVenue: eventObj.venue,
        eventCategory: eventObj.categoryLabel,
        name: DOM.inputName.value.trim(),
        email: email,
        phone: DOM.inputPhone.value.trim(),
        org: DOM.inputOrg ? DOM.inputOrg.value.trim() || 'General Attendee' : 'General Attendee',
        ticketType: DOM.inputTicketType.value,
        notes: DOM.inputNotes ? DOM.inputNotes.value.trim() : '',
        timestamp: new Date().toISOString()
      };

      // Update seat count locally
      eventObj.seatsFilled = Math.min(eventObj.seatsTotal, eventObj.seatsFilled + 1);

      // Save to localStorage
      state.registrations.unshift(registrationRecord);
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(state.registrations));

      // Reset form & button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      DOM.registrationForm.reset();
      clearFormErrors();

      // Close reg modal & open ticket pass
      closeModal(DOM.registrationModal);
      updateTicketsBadge();
      applyFiltersAndRender();
      showToast('Registration confirmed successfully!', 'success');

      // Present digital ticket pass
      showTicketPassModal(registrationRecord);
    }, 800);
  }

  // =========================================================================
  // 11. Digital Ticket Pass Display & Printing
  // =========================================================================
  function showTicketPassModal(regData) {
    if (!DOM.ticketPassElement) return;

    // Generate dynamic barcode lines simulation
    const barcodePattern = Array.from({ length: 32 }, () => Math.random() > 0.4 ? '4' : '2').join(' ');

    DOM.ticketPassElement.innerHTML = `
      <div class="ticket-header">
        <div>
          <h4>K-EXPLORE PASS</h4>
          <span style="font-size: 0.8rem; opacity: 0.85;">Official Delegate Entry</span>
        </div>
        <div class="ticket-id-tag">${regData.id}</div>
      </div>

      <div class="ticket-body">
        <h3 class="ticket-event-name">${escapeHtml(regData.eventTitle)}</h3>

        <div class="ticket-details-grid">
          <div>
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Attendee</div>
            <div style="font-weight: 700; color: var(--text-main); font-size: 1rem;">${escapeHtml(regData.name)}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(regData.email)}</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Ticket Type</div>
            <div style="font-weight: 700; color: var(--primary); font-size: 1rem;">${escapeHtml(regData.ticketType)}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(regData.org)}</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Date & Time</div>
            <div style="font-weight: 600; color: var(--text-main);">${formatPrettyDate(regData.eventDate)}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${regData.eventTime}</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Venue</div>
            <div style="font-weight: 600; color: var(--text-main); font-size: 0.88rem;">${escapeHtml(regData.eventVenue)}</div>
          </div>
        </div>

        <div class="ticket-qr-section">
          <div>
            <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">Security Checkpoint Token</div>
            <div style="font-family: monospace; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.08em; margin-top: 0.25rem;">
              AUTH-${regData.id.replace('KX-', '')}-VERIFIED
            </div>
          </div>

          <div class="qr-code-placeholder" title="Scan at Event Gate">
            <svg viewBox="0 0 100 100" fill="none" stroke="#0f172a" stroke-width="3">
              <!-- Simulated QR Matrix -->
              <rect x="8" y="8" width="28" height="28" stroke-width="5" />
              <rect x="16" y="16" width="12" height="12" fill="#0f172a" />
              <rect x="64" y="8" width="28" height="28" stroke-width="5" />
              <rect x="72" y="16" width="12" height="12" fill="#0f172a" />
              <rect x="8" y="64" width="28" height="28" stroke-width="5" />
              <rect x="16" y="72" width="12" height="12" fill="#0f172a" />
              <circle cx="50" cy="50" r="8" fill="#4f46e5" />
              <line x1="45" y1="20" x2="55" y2="20" stroke-width="4" />
              <line x1="45" y1="80" x2="55" y2="80" stroke-width="4" />
              <line x1="75" y1="50" x2="85" y2="50" stroke-width="4" />
              <line x1="75" y1="75" x2="85" y2="75" stroke-width="4" />
            </svg>
          </div>
        </div>
      </div>
    `;

    // Hook up calendar link
    if (DOM.ticketCalendarBtn) {
      DOM.ticketCalendarBtn.onclick = () => {
        const calUrl = createGoogleCalendarLink(regData);
        window.open(calUrl, '_blank', 'noopener,noreferrer');
      };
    }

    openModal(DOM.ticketModal);
  }

  function createGoogleCalendarLink(regData) {
    const title = encodeURIComponent(regData.eventTitle);
    const details = encodeURIComponent(`Your K-Explore Event Pass ID: ${regData.id}\nAttendee: ${regData.name}\nTicket Type: ${regData.ticketType}`);
    const location = encodeURIComponent(regData.eventVenue);

    // Format dates YYYYMMDD
    const dateClean = regData.eventDate.replace(/-/g, '');
    const dates = `${dateClean}T090000Z/${dateClean}T180000Z`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  }

  // =========================================================================
  // 12. "My Registrations" Management Panel (Bonus Challenge)
  // =========================================================================
  function updateTicketsBadge() {
    const count = state.registrations.length;
    if (DOM.ticketsCountBadge) {
      DOM.ticketsCountBadge.textContent = count;
      DOM.ticketsCountBadge.style.display = count > 0 ? 'inline-flex' : 'none';
    }
  }

  function openMyRegistrationsDrawer() {
    renderMyRegistrationsList();
    if (DOM.myRegistrationsDrawer) {
      DOM.myRegistrationsDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMyRegistrationsDrawer() {
    if (DOM.myRegistrationsDrawer) {
      DOM.myRegistrationsDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function renderMyRegistrationsList() {
    if (!DOM.drawerListContainer) return;

    if (state.registrations.length === 0) {
      DOM.drawerListContainer.innerHTML = `
        <div class="empty-state" style="padding: 2.5rem 1rem;">
          <div class="empty-state-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
            </svg>
          </div>
          <h4 style="font-size: 1.15rem; font-weight: 700;">No Active Registrations</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); text-align: center;">You have not registered for any events yet. Explore upcoming events and reserve your spot!</p>
          <button type="button" class="btn btn-primary btn-sm" id="drawerExploreBtn">
            Explore Events
          </button>
        </div>
      `;

      const expBtn = document.getElementById('drawerExploreBtn');
      if (expBtn) {
        expBtn.addEventListener('click', () => {
          closeMyRegistrationsDrawer();
          const target = document.getElementById('eventsSection');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
      }
      return;
    }

    DOM.drawerListContainer.innerHTML = state.registrations.map(reg => `
      <div class="registration-item-card" data-reg-pass-id="${reg.id}">
        <div class="reg-card-top">
          <h4 class="reg-card-title">${escapeHtml(reg.eventTitle)}</h4>
          <span class="ticket-id-tag">${reg.id}</span>
        </div>

        <div class="reg-card-meta">
          <div><strong>Attendee:</strong> ${escapeHtml(reg.name)} (${escapeHtml(reg.ticketType)})</div>
          <div><strong>Date:</strong> ${formatPrettyDate(reg.eventDate)} at ${reg.eventTime}</div>
          <div><strong>Venue:</strong> ${escapeHtml(reg.eventVenue)}</div>
        </div>

        <div class="reg-card-actions">
          <button type="button" class="btn btn-secondary btn-sm btn-drawer-pass" data-pass-id="${reg.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
            </svg>
            Digital Pass
          </button>
          <button type="button" class="btn btn-sm btn-drawer-cancel" data-cancel-id="${reg.id}" style="color: var(--danger); background: var(--danger-light); border: none;">
            Cancel Spot
          </button>
        </div>
      </div>
    `).join('');

    // Attach drawer actions
    document.querySelectorAll('.btn-drawer-pass').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = state.registrations.find(r => r.id === btn.dataset.passId);
        if (item) {
          closeMyRegistrationsDrawer();
          showTicketPassModal(item);
        }
      });
    });

    document.querySelectorAll('.btn-drawer-cancel').forEach(btn => {
      btn.addEventListener('click', () => {
        cancelRegistration(btn.dataset.cancelId);
      });
    });
  }

  function cancelRegistration(regId) {
    if (!confirm('Are you sure you want to cancel this registration and forfeit your reserved seat?')) {
      return;
    }

    const regIndex = state.registrations.findIndex(r => r.id === regId);
    if (regIndex === -1) return;

    const removed = state.registrations.splice(regIndex, 1)[0];
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(state.registrations));

    // Release seat
    const eventObj = state.events.find(e => e.id === removed.eventId);
    if (eventObj) {
      eventObj.seatsFilled = Math.max(0, eventObj.seatsFilled - 1);
    }

    updateTicketsBadge();
    renderMyRegistrationsList();
    applyFiltersAndRender();
    showToast('Registration cancelled. Seat released.', 'info');
  }

  // =========================================================================
  // 13. Modal Utility Functions
  // =========================================================================
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    document.body.style.overflow = '';

    if (modalEl === DOM.detailsModal && state.modalTimerInterval) {
      clearInterval(state.modalTimerInterval);
    }
  }

  // Setup click outside & Esc key modal closing
  function initModalDismissals() {
    [DOM.detailsModal, DOM.registrationModal, DOM.ticketModal].forEach(modal => {
      if (!modal) return;
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    });

    if (DOM.myRegistrationsDrawer) {
      DOM.myRegistrationsDrawer.addEventListener('click', (e) => {
        if (e.target === DOM.myRegistrationsDrawer) {
          closeMyRegistrationsDrawer();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal(DOM.detailsModal);
        closeModal(DOM.registrationModal);
        closeModal(DOM.ticketModal);
        closeMyRegistrationsDrawer();
      }
    });

    if (DOM.detailsModalCloseBtn) DOM.detailsModalCloseBtn.addEventListener('click', () => closeModal(DOM.detailsModal));
    if (DOM.registrationModalCloseBtn) DOM.registrationModalCloseBtn.addEventListener('click', () => closeModal(DOM.registrationModal));
    if (DOM.ticketModalCloseBtn) DOM.ticketModalCloseBtn.addEventListener('click', () => closeModal(DOM.ticketModal));
    if (DOM.drawerCloseBtn) DOM.drawerCloseBtn.addEventListener('click', closeMyRegistrationsDrawer);
  }

  // =========================================================================
  // 14. Toast Alerts System
  // =========================================================================
  function showToast(message, type = 'info') {
    if (!DOM.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    } else {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    }

    toast.innerHTML = `
      ${iconSvg}
      <span>${escapeHtml(message)}</span>
    `;

    DOM.toastContainer.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto dismiss after 3.8s
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  }

  // =========================================================================
  // 15. Helper Utilities
  // =========================================================================
  function formatPrettyDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  function formatShortDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function resetAllFilters() {
    state.selectedCategory = 'all';
    state.searchQuery = '';
    state.sortOption = 'upcoming';
    state.filterStatus = 'all';

    if (DOM.searchInput) DOM.searchInput.value = '';
    if (DOM.searchClearBtn) DOM.searchClearBtn.style.display = 'none';
    if (DOM.sortSelect) DOM.sortSelect.value = 'upcoming';
    if (DOM.statusFilterSelect) DOM.statusFilterSelect.value = 'all';

    document.querySelectorAll('.category-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.category === 'all');
    });

    applyFiltersAndRender();
    showToast('Filters cleared', 'info');
  }

  // =========================================================================
  // 16. Event Listeners Initialization
  // =========================================================================
  function initEventListeners() {
    // Theme toggle
    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Mobile Hamburger
    if (DOM.mobileMenuBtn && DOM.navMenu) {
      DOM.mobileMenuBtn.addEventListener('click', () => {
        DOM.navMenu.classList.toggle('open');
      });

      // Close mobile menu when nav link clicked
      DOM.navLinks.forEach(link => {
        link.addEventListener('click', () => DOM.navMenu.classList.remove('open'));
      });
    }

    // Sticky Header Shadow
    window.addEventListener('scroll', () => {
      if (DOM.siteHeader) {
        DOM.siteHeader.classList.toggle('scrolled', window.scrollY > 20);
      }
    });

    // Hero Action Buttons
    if (DOM.heroRegisterBtn) {
      DOM.heroRegisterBtn.addEventListener('click', () => {
        openRegistrationModal(FLAGSHIP_EVENT_ID);
      });
    }

    if (DOM.heroExploreBtn) {
      DOM.heroExploreBtn.addEventListener('click', () => {
        const eventsSec = document.getElementById('eventsSection');
        if (eventsSec) eventsSec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Search Input with Debounce / Live handling
    if (DOM.searchInput) {
      DOM.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (DOM.searchClearBtn) {
          DOM.searchClearBtn.style.display = state.searchQuery ? 'block' : 'none';
        }
        applyFiltersAndRender();
      });
    }

    if (DOM.searchClearBtn) {
      DOM.searchClearBtn.addEventListener('click', () => {
        DOM.searchInput.value = '';
        state.searchQuery = '';
        DOM.searchClearBtn.style.display = 'none';
        applyFiltersAndRender();
        DOM.searchInput.focus();
      });
    }

    // Sort Dropdown
    if (DOM.sortSelect) {
      DOM.sortSelect.addEventListener('change', (e) => {
        state.sortOption = e.target.value;
        applyFiltersAndRender();
      });
    }

    // Status Filter Dropdown
    if (DOM.statusFilterSelect) {
      DOM.statusFilterSelect.addEventListener('change', (e) => {
        state.filterStatus = e.target.value;
        applyFiltersAndRender();
      });
    }

    // Reset Filters button
    if (DOM.resetFiltersBtn) {
      DOM.resetFiltersBtn.addEventListener('click', resetAllFilters);
    }

    // "My Tickets" Button & Drawer
    if (DOM.myTicketsBtn) {
      DOM.myTicketsBtn.addEventListener('click', openMyRegistrationsDrawer);
    }

    if (DOM.ticketViewDrawerBtn) {
      DOM.ticketViewDrawerBtn.addEventListener('click', () => {
        closeModal(DOM.ticketModal);
        openMyRegistrationsDrawer();
      });
    }

    // Ticket Print
    if (DOM.ticketPrintBtn) {
      DOM.ticketPrintBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Real-time Input Validation Listeners
    if (DOM.registrationForm) {
      DOM.registrationForm.addEventListener('submit', handleRegistrationSubmit);

      const liveInputs = [DOM.inputName, DOM.inputEmail, DOM.inputPhone, DOM.regEventSelect, DOM.inputTicketType, DOM.inputTerms];
      liveInputs.forEach(input => {
        if (!input) return;
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
      });
    }

    // Newsletter footer form simulation
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('newsletterEmail');
        if (emailInput && emailInput.value.includes('@')) {
          showToast('Thank you for subscribing to K-Explore event updates!', 'success');
          emailInput.value = '';
        } else {
          showToast('Please provide a valid email address.', 'error');
        }
      });
    }
  }

  // =========================================================================
  // 17. Application Entrypoint
  // =========================================================================
  function init() {
    initTheme();
    initHeroCountdown();
    renderCategoryPills();
    populateEventDropdown();
    applyFiltersAndRender();
    updateTicketsBadge();
    initModalDismissals();
    initEventListeners();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
