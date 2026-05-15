# Detour.guru

> Real stories. Local stops. Better detours.

Gamified, mobile-first walking tour platform that acts as an antidote to generic tourist traps. Led by Skip, a 1940s NYC insider mascot, the platform offers curated Set Detours and on-demand AI Detours, with a built-in micro-philanthropy gem flywheel.

## Stack

- **Hosting:** Netlify (auto-deploys from this repo)
- **Database:** Supabase
- **Email:** Resend
- **AI:** Google Gemini API
- **Maps:** Google Maps API

## Local development

This is a static site — open `index.html` in a browser to preview, or use a local server:

```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Project structure

```
detour-guru/
├── index.html              # Main landing page
├── skip.png                # Skip the Guru mascot
├── badge.png               # Official badge logo
├── netlify.toml            # Netlify config
├── netlify/
│   └── functions/          # Serverless backend
│       └── waitlist.js     # Waitlist signup handler (coming soon)
└── README.md
```

## Roadmap

- [x] Landing page v1
- [ ] Supabase waitlist table
- [ ] Resend welcome emails
- [ ] Skip's AI Detour generator (Gemini)
- [ ] City subdomains (nyc, miami, la)
- [ ] Gem Flywheel + user accounts

---

© 2026 Detour.guru. All rights reserved.
