# HiveSchool Events & Admin Guide

A practical guide for running HiveSchool events on the website — for both the public Events pages and the private Control Hub (admin).

---

## 1. Public Events (what visitors see)

### Events hub — `/events`

Also linked from the top nav as **Events**.

- Hero copy on the left, with **Explore Masterclasses** scrolling down to the listing.
- If an event is marked **Featured**, it appears as a large card on the right of the hero (poster + title + date + venue).
- Below: filters for **Upcoming / Past / All**, then a grid of event cards.
- Each card shows poster, date, tags, venue (or “Online · …”), capacity if set, and a link to the detail page.

### Event detail — `/events/[slug]`

Example: `/events/hive-founders-summit-2026`

Layout (desktop):

| Left column | Right column |
|-------------|--------------|
| Poster carousel (auto-slides if multiple images) | Sticky registration form |
| Tags, title, tagline | |
| Date & time, venue / online join link | |
| Capacity bar (if limited) | |
| About / description | |

**Registration form fields**

| Field | Required |
|-------|----------|
| Full name | Yes |
| Email | Yes |
| Phone | Yes |
| LinkedIn | No |

- Past events and full-capacity events cannot register.
- After a successful signup, the visitor sees a confirmation on the same form.

---

## 2. Admin Control Hub (internal only)

The admin portal is **not linked** anywhere on the site. Outsiders who guess the URL see a normal **404**.

### How to open admin

1. Go to the public HiveSchool site (any page).
2. Press:
   - **Mac:** `⌘ + Shift + H`
   - **Windows / Linux:** `Ctrl + Shift + H`
3. You’ll land on the admin login page.
4. Enter the **admin password** (ask the site owner if you don’t have it).

**Notes**

- The shortcut only works when you’re not typing in an input/textarea.
- Unlock lasts about **10 minutes**; if login 404s again, press the shortcut once more.
- After login you’re signed in for about **24 hours**.
- **Sign Out** returns you to the public homepage (admin stays hidden).

Do **not** share the keyboard shortcut or password outside the team.

---

## 3. Control Hub sections

| Section | Purpose |
|---------|---------|
| **Dashboard** | Totals: events, registrations, visitors; recent registration chart; top events |
| **Events** | Create, edit, publish, feature, delete events |
| **Members** | All registrations; filter by event; search; export CSV |
| **Analytics** | Deeper visit / registration stats |
| **View Live Events** | Opens `/events` in a new tab |

---

## 4. Creating & editing an event

**Path:** Control Hub → **Events** → **New Event** (or edit an existing one)

### Event details

| Field | What to enter |
|-------|----------------|
| **Title** | Public name (also used to build the URL slug) |
| **Tagline** | Short line on cards |
| **Description** | Longer “About” copy. Blank lines = new paragraphs |

### Schedule & location

| Field | Notes |
|-------|--------|
| **Start date & time** | Required — always **India time (IST)** |
| **End date & time** | Optional — also IST |
| **In person / Online** | Toggle |
| **Venue** (in person) | Address or place name |
| **Venue link** (in person) | Optional Google Maps URL |
| **Platform / label** (online) | e.g. `Zoom`, `Google Meet` |
| **Join link** (online) | Zoom/Meet URL — shown as a clickable link on the event page |
| **Capacity** | Leave blank for unlimited; when full, registration closes |
| **Tags** | Comma-separated, e.g. `Workshop, GTM, AI` |

### Posters

- Upload **one or more** images (JPEG / PNG / WebP, max ~10 MB each).
- First image = **Cover** (cards + featured hero).
- Reorder with the arrows; remove with ×.
- With **2+ images**, the public detail page and featured card **auto-slide** about every 4.5 seconds (arrows/dots also work). Hover pauses the slideshow.

Always click **Save Changes** / **Create Event** after uploading — uploads alone are not enough.

### Publishing

| Toggle | Effect |
|--------|--------|
| **Published** | Visible on `/events` and detail URLs. Off = draft (admin only). |
| **Featured** | Shown in the hero card on `/events`. Prefer **one** featured upcoming event. |

---

## 5. Members (registrations)

**Path:** Control Hub → **Members**

- Table of everyone who registered (name, email, phone, LinkedIn, event, time).
- Filter by event; search by name/email/event.
- **Export CSV** for the current filter (or all).

Use this list for follow-ups, WhatsApp groups, Zoom invites, etc.

---

## 6. Typical workflows

### Launch a new workshop

1. Shortcut → login → **Events** → **New Event**.
2. Fill title, tagline, description, date.
3. Choose **In person** or **Online** and fill venue / join link.
4. Upload posters; set capacity if needed; add tags.
5. Turn **Published** on (and **Featured** if this is the hero event).
6. Save → open **View Live Events** and check `/events` + the detail page.
7. Share the detail URL.

### After people register

1. **Members** → filter by that event.
2. Export CSV if needed.
3. For online events, send the join link from the CSV / Members list (or from the event’s join URL field).

### End or hide an event

- Turn **Published** off to hide it, **or**
- Leave it published so it moves under **Past** after the start date.

---

## 7. Quick FAQ

**Why don’t I see my new posters?**  
Save the event after upload, then hard-refresh the public page.

**Why isn’t the second poster sliding?**  
You need 2+ images saved on the event. Check cover + #2 in the admin form, then save.

**Featured card is empty / wrong event?**  
Only **Featured** + preferably upcoming events appear in the hero. Unfeature older ones.

**Admin URL 404s?**  
Expected without the shortcut (or an active session). Press `⌘/Ctrl + Shift + H` on the public site first.

**Can two people use admin at once?**  
Yes, if they both know the shortcut and password. Don’t share those broadly.

**Registration count on cards**  
This is real signups from the form, not mock data.

---

## 8. URLs cheat sheet

| What | URL |
|------|-----|
| Events hub | `/events` |
| One event | `/events/<slug>` |
| Admin login | Only via keyboard shortcut (then `/hive-control-hub/login`) |
| Admin home | `/hive-control-hub` (after login) |

---

*HiveSchool — Events & Control Hub. Keep this document internal.*
