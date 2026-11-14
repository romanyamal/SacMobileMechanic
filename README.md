# Sac Mobile Mechanic & Roadside Assistance

A fast, accessible, single-page website for a mobile mechanic and roadside assistance business. It's designed to be easy to follow on a phone (where most stranded drivers will find it) and just as clean on desktop, and it scores **100 / 100 / 100 / 100** in Lighthouse on both mobile and desktop.

| Lighthouse     | Mobile | Desktop |
| :------------- | :----: | :-----: |
| Performance    |  100   |   100   |
| Accessibility  |  100   |   100   |
| Best Practices |  100   |   100   |
| SEO            |  100   |   100   |

Built with [Astro](https://astro.build), [Tailwind CSS v4](https://tailwindcss.com), and almost no JavaScript. It builds to plain static files (about 1.4 MB total, including every image), so it can be hosted for free.

---

## Features

- **One simple page, easy to scan.** Hero, services, recent work, about, service area, FAQ, scheduler, and contact form, all reachable from a sticky header and a mobile menu.
- **Call and text anywhere.** Prominent `tel:` and `sms:` links in the hero, contact section, service-area section, and footer, because stranded customers want to call, not fill out forms.
- **Job scheduler.** Customers pick their vehicle and service, and the service duration is passed on to a booking calendar (Cal.com slot is scaffolded and ready to wire up).
- **Contact form.** Web3Forms integration with honeypot spam protection, accessible validation messages, and a consent checkbox (scaffolded, one flag to go live).
- **Service area section** with a map and a city/neighborhood list grouped by primary and secondary areas.
- **Recent-work gallery.** Shows 3 jobs on phones and all of them on larger screens.
- **FAQ, About, and trust strip** (reviews and social links).
- **Legal pages:** privacy, terms, and an accessibility statement. Plus a custom 404 page.
- **Content lives in data files.** Most of the business details (name, phone, hours, services, FAQs, cities, gallery) are plain JavaScript files in `src/data/`, so you don't need to touch component code to rebrand it.

### Built for 100s

**Performance**

- Zero client-side framework. Astro ships static HTML and only a few tiny vanilla-JS scripts (menu, scroll/focus handling, scheduler, contact form).
- CSS is inlined into the HTML (`inlineStylesheets: "always"`), so there's no render-blocking stylesheet request. HTML is minified and sourcemaps are off.
- All images are converted to WebP at build time via `astro:assets`. Typical results from the current build: gallery photos from 1–3 MB down to 17–52 KB, and the hero image from 1.7 MB down to 4–12 KB.
- The hero image is the LCP element, so it uses `fetchpriority="high"`, and phones get a smaller 640px variant while desktops get 1200px, via `<picture>`.
- Below-the-fold images are lazy-loaded.
- The font (Changa) is self-hosted through Fontsource, so there are no third-party font requests.

**Accessibility**

- Built to WCAG 2.1 Level AA, with a skip link, full keyboard support, labeled forms, and screen-reader announcements. See [Accessibility](#accessibility) for the full list and how it relates to California law.

**SEO**

- Unique `<title>` and meta description, canonical URLs, Open Graph and Twitter cards.
- `AutoRepair` JSON-LD structured data (name, phone, hours, service area, social links) generated from your config.
- Auto-generated `sitemap-index.xml` and a `robots.txt`.
- Web app manifest, favicons, and Apple touch icon.

---

## Accessibility

Accessibility was a design requirement from the start, not an afterthought. The site targets **WCAG 2.1 Level AA** and scores 100 in Lighthouse's accessibility audit on mobile and desktop.

### What's built in

**Navigation and structure**

- **Skip to main content link.** The first focusable element on every page. It's hidden until a keyboard user tabs to it, then appears at the top-left and jumps straight to `<main id="main-content">`, so keyboard and screen-reader users don't have to tab through the header menu on every page.
- **Semantic landmarks:** `<header>`, `<nav aria-label="Primary">`, `<main>`, `<footer>`, and a labeled breadcrumb `<nav>` on legal pages.
- **One `<h1>` per page** with headings in logical order, and `lang="en"` set on the page.
- **Focus follows navigation.** When someone uses a menu link or deep link (`/#faq`), the page scrolls to that section and moves keyboard focus to its heading, so screen-reader users land where the page scrolled instead of being left behind at the top.
- **Back-to-top** returns focus to the main heading.
- **Sticky header offset.** Scroll offsets account for the fixed header so anchored headings aren't hidden under it.

**Keyboard and focus**

- Everything is operable with a keyboard alone: menu, FAQ, forms, buttons, and modal.
- Clear, high-contrast `:focus-visible` outlines on every link, button, and form control.
- The mobile menu is a real `<button>` with `aria-expanded`, `aria-controls`, and a label that changes between "Open menu" and "Close menu". `Esc` closes it.
- The "show more" toggles (About, Gallery) use `aria-expanded` / `aria-controls`.
- The FAQ uses native `<details>` / `<summary>` elements, so it works with keyboards and screen readers without extra scripting.
- The form-result dialog uses `aria-modal` and `aria-labelledby`. It moves focus into the dialog, keeps `Tab` inside it, closes on `Esc`, and returns focus to where the user was.

**Forms**

- Every field has a visible `<label>` tied to its input, with appropriate `autocomplete` values (name, address) to help users with motor or cognitive disabilities.
- Required fields use native `required` validation.
- Status and error messages are announced through `aria-live` / `role="status"` regions (e.g. "Form cleared.", "Scheduling form loaded.").
- Spam protection uses a hidden honeypot field that's removed from tab order and from assistive tech, so there's no CAPTCHA puzzle to solve.

**Visual design**

- Light text on dark backgrounds with strong contrast. Lighthouse's contrast audit passes.
- Information isn't conveyed by color alone. Selected options and open FAQ items also change borders and icons.
- Readable text sizes that scale with browser zoom, and a responsive layout with no horizontal scrolling at mobile widths.
- Decorative images and icons are hidden from screen readers (`alt=""` / `aria-hidden="true"`), while meaningful images have descriptive alt text you control (see [Make it your own](#make-it-your-own)).
- Icon-only links, like the social icons, have `aria-label`s.
- `tel:` and `sms:` links give people an easy alternative to typing in a form, which helps many users with disabilities.

**Pages**

- A dedicated [Accessibility Statement](src/pages/accessibility.astro) page, linked from the footer, states the conformance target and gives people a phone number and email to report barriers.

### How this relates to California regulations

In California, a business website that serves the public is generally expected to be accessible to people with disabilities under two laws:

- **The Americans with Disabilities Act (ADA), Title III**, a federal law covering businesses open to the public.
- **The Unruh Civil Rights Act** (California Civil Code § 51), under which an ADA violation is also a violation of Unruh. Unruh allows damages (a minimum of $4,000 per violation), which is why accessibility lawsuits against small California businesses are common.

Neither law names a specific technical standard for private business websites. In practice, courts, the U.S. Department of Justice, and accessibility attorneys use **WCAG 2.1 Level AA** as the benchmark, and that is exactly the standard this site is built to and its accessibility statement declares. So the site is set up to:

| What people look for           | How the site addresses it                                                                                                                                                                      |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Perceivable (WCAG principle 1) | Text alternatives for images, strong color contrast, text that scales and reflows, and meaning that doesn't depend on color alone                                                              |
| Operable (principle 2)         | Full keyboard access, a skip link, visible focus, logical focus order, no keyboard traps (the dialog's Tab loop is intentional and escapable with `Esc`), and descriptive link and button text |
| Understandable (principle 3)   | Page language declared, labeled form fields, predictable navigation, and clear status messages                                                                                                 |
| Robust (principle 4)           | Valid semantic HTML and ARIA only where it's needed, so assistive technology can interpret the page                                                                                            |
| A way to report problems       | An accessibility statement with phone and email contact                                                                                                                                        |

### Important limits

- **This is not legal advice or a guarantee of compliance.** No tool or README can promise immunity from a claim. Have a lawyer review your own situation if you're concerned.
- **A 100 Lighthouse score doesn't prove full WCAG conformance.** Automated tools (Lighthouse, axe) catch only a portion of WCAG issues. Things like meaningful alt text, logical reading order, and a good screen-reader experience need human checking.
- **Your content affects accessibility too.** When you add photos, write real alt text. Keep text readable if you change colors (re-check contrast), and don't add pop-ups, auto-playing media, or third-party widgets (like the Cal.com embed) without testing them. Third-party embeds are a common source of new accessibility problems.
- **The accessibility statement is placeholder text.** Before launch, edit `src/pages/accessibility.astro`: fill in the "Known Limitations" section, set a real response-time promise for feedback, remove the placeholder notice, and have it reviewed.

### Testing it yourself

1. **Lighthouse** accessibility audit on the [local production build](#preview-the-production-build-locally-use-this-for-lighthouse).
2. **Keyboard-only pass.** Unplug the mouse and use `Tab`, `Shift+Tab`, `Enter`, `Space`, and `Esc` through the whole page. You should always see where focus is, and the first `Tab` press should reveal "Skip to main content".
3. **Screen reader pass.** Try VoiceOver (macOS/iOS, `Cmd+F5`), TalkBack (Android), or NVDA (free on Windows) on the menu, forms, and FAQ.
4. **Zoom and reflow.** Zoom the browser to 200% and check that nothing is cut off or overlapping.
5. **Free scanners** like the [axe DevTools](https://www.deque.com/axe/) browser extension or [WAVE](https://wave.webaim.org) to catch what Lighthouse misses.

---

## Tech stack

|           |                                                            |
| :-------- | :--------------------------------------------------------- |
| Framework | Astro 7                                                    |
| Styling   | Tailwind CSS 4 (via `@tailwindcss/vite`)                   |
| Font      | Changa Variable (`@fontsource-variable/changa`)            |
| SEO       | `@astrojs/sitemap`                                         |
| Forms     | Web3Forms (contact), Cal.com (scheduling, to be connected) |
| Hosting   | GitHub Pages (workflow included)                           |

---

## Getting started

**Requirements:** [Node.js](https://nodejs.org) 22.12 or newer.

```sh
# 1. Get the code
git clone https://github.com/<your-username>/SacMobileMechanic.git
cd SacMobileMechanic

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open **http://localhost:4321/SacMobileMechanic/**. Note the path: the site is configured with a `base` for GitHub Pages (see [Deploying](#deploying)), so the URL is not just `localhost:4321`.

| Command           | What it does                                                                                                                                           |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                                                                                                                             |
| `npm run build`   | Builds the production site into `dist/`                                                                                                                |
| `npm run preview` | Serves the built `dist/` locally. Use this one for Lighthouse testing ([details below](#preview-the-production-build-locally-use-this-for-lighthouse)) |

### Preview the production build locally (use this for Lighthouse)

`npm run dev` is for editing only. It serves unminified code with extra tooling, so it performs worse and will give misleading Lighthouse scores. To see the site the way visitors will, and to get accurate scores, build it and preview the result:

```sh
# 1. Create the optimized production build in dist/
npm run build

# 2. Serve that build locally
npm run preview
```

Then open **http://localhost:4321/SacMobileMechanic/**.

The production build is what's actually deployed, and it's much faster because it has:

- Minified HTML and JavaScript, with the CSS inlined
- Images converted to small, resized WebP files
- No dev server scripts or sourcemaps

To run Lighthouse:

1. Open the preview URL above in **Chrome**, ideally in an **Incognito window** so extensions don't skew results.
2. Open DevTools (`F12`), go to the **Lighthouse** tab, pick **Mobile** or **Desktop**, check all four categories, and click **Analyze page load**.
3. Run it once for each device type. Close other heavy tabs and apps first, because a busy machine can lower the Performance score from run to run.

Re-run `npm run build` after every change you want to test. `npm run preview` only serves the last build, so it won't pick up edits on its own.

---

## Make it your own

Work through these in order. Everything marked **(data file)** is a plain edit with no component code involved.

### 1. Business details: `src/data/site-config.js` (data file)

This one file feeds the header, hero, footer, contact section, legal pages, SEO tags, and JSON-LD.

| Field                               | What to put                                                                                                                                                       |
| :---------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `businessName`                      | Full business name (used in the page title and structured data)                                                                                                   |
| `shortName`                         | Short name or initials shown as the logo text in the header                                                                                                       |
| `tagline`                           | One-line tagline                                                                                                                                                  |
| `phone`                             | Digits in international format, e.g. `+19165551234`. Used for `tel:` and `sms:` links                                                                             |
| `phoneDisplay`                      | How the number appears on screen, e.g. `(916) 555-1234`                                                                                                           |
| `email`                             | Public contact email                                                                                                                                              |
| `domain`                            | Your final site URL with no trailing slash. Drives canonical URLs and structured data                                                                             |
| `hours`                             | Opening hours per day, as `"8:00–18:00"` or `"closed"`                                                                                                            |
| `address`                           | A real street address (uncomment the fields), **or leave as `{}`** to hide the address. Mobile businesses often skip it                                           |
| `social.google` / `social.facebook` | Your Google Business Profile and Facebook URLs. These power the trust strip and footer icons                                                                      |
| `about`                             | The About section: `intro` headline, `paragraphs`, `stats`, `credentials`, and image `alt` text                                                                   |
| `license`, `ard`                    | License number and your state repair-dealer registration (the footer shows both. Remove or edit the line in `Footer.astro` if they don't apply where you operate) |
| `insuranceDisclosure`               | One-line insurance/bonding statement for the footer                                                                                                               |
| `paymentMethods`                    | Accepted payment methods. Set to `[]` to hide that footer section                                                                                                 |
| `priceRange`                        | `"$"`, `"$$"`, etc. for search-engine structured data                                                                                                             |

### 2. Services: `src/data/services.js` (data file)

Each service is an object:

```js
{
  id: "oil-change",              // unique, lowercase, no spaces
  category: "Maintenance Services", // services with the same category are grouped together
  name: "Oil Change",
  description: "Full synthetic or conventional oil and filter change.",
  durationMinutes: 30,           // used by the scheduler to size the booking
}
```

Add, remove, or reorder freely. The services section, the scheduler's radio buttons, and the footer links all update automatically.

### 3. Service areas: `src/data/service-areas.js` (data file)

Each city has a `tier` of `"primary"` or `"secondary"` and a list of `neighborhoods`. Replace them with the cities you serve. You'll also want to replace the map image (see step 6) and update the hardcoded "Sacramento" text (step 5).

### 4. FAQ, gallery, nav, vehicle makes (data files)

- **`src/data/faq.js`**: `question` / `answer` pairs. Update the answers that mention your hours, payment methods, service radius, and warranty, because they're written out as text and **don't** read from `site-config.js`.
- **`src/data/gallery.js`**: one entry per job photo (`id`, `src`, `alt`, `caption`). Put the image in `src/assets/gallery/` and set `src` to `/src/assets/gallery/<file-name>`. The path must match exactly, or the photo silently won't show up. Write real alt text for each one.
- **`src/data/nav.js`**: the header and footer menu. Each `href` is a section id on the page.
- **`src/data/car-details.js`**: the list of vehicle `makes` in the dropdowns. The year list builds itself from the current year.

### 5. Text written directly in components

A few headlines are written in the components rather than in data files. Search the project for `Sacramento` (and your old business name) and update each:

| File                                                            | What's there                                                                                                |
| :-------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `src/components/Hero.astro`                                     | The main `<h1>`, the intro paragraph, and the "Serving …" line                                              |
| `src/components/Services.astro`                                 | Section heading                                                                                             |
| `src/components/Gallery.astro`                                  | Section heading                                                                                             |
| `src/components/ServiceArea.astro`                              | Section heading and the map's `alt` text                                                                    |
| `src/layouts/Layout.astro`                                      | The default meta description (shown in Google results)                                                      |
| `src/pages/accessibility.astro`, `privacy.astro`, `terms.astro` | Legal copy. Have these reviewed for your state and business before launch. Set `updatedDate` once finalized |

### 6. Images

Replace these files **keeping the same file names** (or update the import at the top of the component):

| File                              | Used for                                                 | Suggested size                                                |
| :-------------------------------- | :------------------------------------------------------- | :------------------------------------------------------------ |
| `src/assets/Hero-bg.jpg`          | Hero background                                          | At least 1600 px wide, landscape                              |
| `src/assets/work-vehicle.jpg`     | About section photo (imported directly in `About.astro`) | 800×600 or larger, 4:3                                        |
| `src/assets/service-area-map.png` | Service area map                                         | Any, ideally a screenshot of your radius                      |
| `src/assets/gallery/*.jpg`        | Recent work photos                                       | Any size. They're resized and converted to WebP automatically |

Don't worry about compressing images by hand. The build does it. Just avoid huge originals (over ~5 MB) to keep builds quick.

> Heads up: the `about.src` value in `site-config.js` is not currently used. The About photo comes from `src/assets/work-vehicle.jpg`.

### 7. Colors and branding

The design uses Tailwind's `red-600` as the accent on a dark gray/black background.

- **Accent color:** find and replace `red-` with another Tailwind color (e.g. `blue-`, `orange-`) across `src/`. Check contrast afterwards. Lighthouse will flag low-contrast text.
- **Font:** swap the Fontsource package in `package.json`, the import in `src/layouts/Layout.astro`, and the `--font-sans` value in `src/styles/global.css`.
- **Browser theme color:** update `theme-color` in `Layout.astro` and `theme_color` / `background_color` in `public/manifest.json`.

### 8. Icons, social image, and manifest: `public/`

Replace these with your own branding (same file names and sizes):

- `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`
- `apple-touch-icon.png` (180×180)
- `android-chrome-192x192.png`, `android-chrome-512x512.png`
- `og-image.png`: the preview image shown when your link is shared (1200×630 works well)
- `manifest.json`: update `name`, `short_name`, and `description`

A free generator like [realfavicongenerator.net](https://realfavicongenerator.net) will produce the whole icon set from one logo.

### 9. Site URL, `robots.txt`, and sitemap

Search engines need to know your real address:

1. In `astro.config.mjs`, set `site` to your full domain (e.g. `https://www.yourbusiness.com`).
2. In `site-config.js`, set `domain` to the same URL (no trailing slash).
3. In `public/robots.txt`, update the `Sitemap:` line to `https://<your-domain>/sitemap-index.xml`. This file is plain text, so it does **not** read from the config. Don't skip this one.
4. In `src/components/Footer.astro`, the JSON-LD `image` field points to `/images/og-share-default.jpg`. Change it to your real social image (`og-image.png`).

If you're using your own domain at the root (not a GitHub Pages project URL), also **delete the `base: "/SacMobileMechanic/"` line** from `astro.config.mjs`. The dev URL then becomes plain `http://localhost:4321/`.

### 10. Turn on the contact form (Web3Forms)

The form is fully built but intentionally switched off, so it shows a placeholder message instead of sending anything.

1. Get a free access key at [web3forms.com](https://web3forms.com) (it emails the key to you).
2. In `src/components/ContactForm.astro`, replace `YOUR_WEB3FORMS_ACCESS_KEY` in the hidden `access_key` input.
3. In the `<script>` in the same file, change `const WEB3FORMS_ENABLED = false;` to `true`.
4. Test it by submitting the form on the deployed site.

### 11. Connect online booking (Cal.com)

The scheduler collects the vehicle and service, then currently shows a "calendar coming soon" placeholder. To finish it:

1. Create a [Cal.com](https://cal.com) account and an event type.
2. In `src/components/Scheduler.astro`, find the `TODO once Cal.com event type + identifiers exist` comment in the form's submit handler.
3. Load the Cal.com embed there and mount it in `#scheduler-embed`. Pass the selected `duration` and the vehicle details as prefill values.
4. Remove the placeholder content inside `#scheduler-embed-box`.

> **Keep it fast:** load the Cal.com script _inside_ the submit handler (only when someone clicks "Proceed to Scheduling"), not in the page head. That keeps it off the initial page load, so your Lighthouse scores stay at 100.

If you'd rather not use a calendar yet, you can remove the `Scheduler` import and component from `src/pages/index.astro` and the `Schedule` item from `src/data/nav.js`.

---

## Deploying

### GitHub Pages (included)

A GitHub Actions workflow in `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

1. Push the project to a GitHub repository.
2. In the repo, go to **Settings → Pages**, and set **Source** to **GitHub Actions**.
3. Push to `main`. The site appears at `https://<username>.github.io/<repo-name>/`.
4. Make sure `site` and `base` in `astro.config.mjs` match your username and repository name.

**Custom domain:** add it under Settings → Pages, add the DNS records GitHub shows you, then set `site` to your domain, remove `base`, and update `domain` in `site-config.js` as described in step 9.

### Other hosts

The output in `dist/` is plain static files, so it also works on Netlify, Cloudflare Pages, Vercel, or any web host. Run `npm run build` and upload `dist/`. On those hosts, remove the `base` setting.

---

## Project structure

```text
├── public/                  Static files copied as-is (icons, og-image, robots.txt, manifest)
├── src/
│   ├── assets/              Images that get optimized at build time
│   │   └── gallery/         Recent-work photos
│   ├── components/          One component per page section (Hero, Services, Scheduler, ...)
│   ├── data/                Business content: edit these first
│   │   ├── site-config.js   Name, phone, hours, about, license, social, SEO details
│   │   ├── services.js      Services offered
│   │   ├── service-areas.js Cities and neighborhoods
│   │   ├── faq.js           FAQ entries
│   │   ├── gallery.js       Recent work entries
│   │   ├── nav.js           Menu links
│   │   └── car-details.js   Vehicle year/make dropdown options
│   ├── layouts/             Layout.astro (head/SEO/shell) and LegalLayout.astro
│   ├── pages/               index, 404, privacy, terms, accessibility
│   └── styles/global.css    Tailwind import, font, theme
├── astro.config.mjs         Site URL, base path, build/performance settings
└── .github/workflows/       GitHub Pages deploy
```

---

## Pre-launch checklist

- [ ] `site-config.js` has your real phone, email, hours, social links, license, and insurance details (search for `PLACEHOLDER`)
- [ ] Hero, section headings, and FAQ answers mention your business and city
- [ ] All photos replaced, with accurate `alt` text
- [ ] Icons, `og-image.png`, and `manifest.json` updated
- [ ] `site`, `domain`, `robots.txt`, and the JSON-LD image URL all point to your real domain
- [ ] Web3Forms key added and `WEB3FORMS_ENABLED = true`, tested with a real submission
- [ ] Scheduler connected to Cal.com, or removed
- [ ] Privacy, terms, and accessibility pages reviewed for your business
- [ ] `npm run build && npm run preview`, then run Lighthouse on mobile and desktop

---

## License

All rights reserved.
