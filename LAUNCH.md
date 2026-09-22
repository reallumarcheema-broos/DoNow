# Launching SpeedMeter

The whole path, in order: live site → own domain → Google Search → AdSense.
Roughly 90 minutes of actual work, spread over a few weeks of waiting.

---

## Phase 1 — Put the site online (15 minutes, free)

The code is on the `claude/keen-einstein-ebbswo` branch. GitHub Pages serves
from a branch, so first get it onto `main`:

```sh
git checkout main
git merge claude/keen-einstein-ebbswo
git push origin main
```

Then delete the two leftover files from the old project, which are unrelated
pages sitting in the site root:

```sh
git rm "index[1].html" "index[2].html"
git commit -m "Remove leftover files from the previous project"
git push origin main
```

Now turn on hosting:

1. On GitHub: **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main`, folder `/ (root)` → **Save**
4. Wait 1–2 minutes. The site appears at
   `https://reallumarcheema-broos.github.io/DoNow/`

Open it and click GO. This is the first time the test runs against the real
Cloudflare endpoints rather than a mock, so confirm the numbers look sane for
your connection.

**This URL cannot be your AdSense site.** See Phase 2.

---

## Phase 2 — Buy a domain (20 minutes, ~$10–15/year)

This is not optional if you want AdSense, for two concrete reasons:

- `ads.txt` must sit at the **root of the domain** — `yourdomain.com/ads.txt`.
  On a project page your file lands at `github.io/DoNow/ads.txt`, which is
  never read, and the real root belongs to GitHub, not you.
- `github.io` is a shared domain. AdSense treats the whole of it as one site
  that you do not own.

**Buy from** Cloudflare Registrar (at cost), Porkbun, or Namecheap. Check
availability for something short — `speedmeter.app`, `speedmeter.io`,
`getspeedmeter.com`. Avoid hyphens and numbers.

**Point it at GitHub.** In your registrar's DNS settings add four A records
for the apex domain:

```
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153
CNAME  www   reallumarcheema-broos.github.io.
```

Then back on GitHub: **Settings → Pages → Custom domain** → enter your domain
→ Save. Wait for the DNS check to pass, then tick **Enforce HTTPS** (the
certificate can take up to a day; the checkbox stays greyed out until it is
ready).

Your site is now at `https://yourdomain.com/` and everything sits at the root.

---

## Phase 3 — Replace the placeholders (15 minutes)

Do this before you submit anything to Google.

- [ ] `contact.html` — your real email address
- [ ] `privacy.html` — your name or business name, and country
- [ ] `terms.html` — a governing-law clause naming your country or state
- [ ] `sitemap.xml` — every `https://example.com/` becomes your domain
- [ ] `robots.txt` — the `Sitemap:` line becomes your domain

Commit and push. GitHub Pages redeploys automatically within a minute.

---

## Phase 4 — Get into Google Search (20 minutes, then wait)

AdSense checks that a site is indexed. Do this before applying, not after.

1. Go to [Google Search Console](https://search.google.com/search-console).
2. **Add property → Domain**, enter `yourdomain.com`.
3. It gives you a TXT record. Add it in your registrar's DNS, then click
   **Verify** (allow a few minutes for DNS to propagate).
4. **Sitemaps** in the left menu → enter `sitemap.xml` → **Submit**.
5. **URL Inspection** at the top → paste your homepage URL → **Request
   indexing**. Repeat for two or three guide pages. This nudges the crawler;
   it does not guarantee anything.

Indexing typically takes a few days to two weeks for a new domain. Check the
**Pages** report until your URLs show as indexed. Do not move on until at
least the homepage is in the index.

While waiting, optionally add the site to
[Bing Webmaster Tools](https://www.bing.com/webmasters) — it takes five
minutes and imports directly from Search Console.

---

## Phase 5 — Apply to AdSense (20 minutes, then wait days to weeks)

1. Sign up at [adsense.google.com](https://adsense.google.com) with your
   domain.
2. AdSense gives you a publisher ID that looks like `ca-pub-1234567890123456`.
3. Put it in **two** places and push:
   - `assets/ads.js` → the `PUB_ID` line
   - `ads.txt` → replace `pub-XXXXXXXXXXXXXXXX` with your digits
4. Confirm `https://yourdomain.com/ads.txt` loads in a browser.
5. In AdSense, click **Request review**.

Then wait. A few days is common; several weeks happens. You will get an email
either way.

### If you are rejected

The usual reason is "low value content", and the usual fix is more of it.
Publish two or three more guides — a review of common router problems, an
explainer on fibre versus cable, a piece on mobile data speeds — wait for them
to be indexed, and reapply. You can reapply as often as you like, and each
attempt should change something real.

---

## Phase 6 — After approval (15 minutes)

1. **Create ad units.** In AdSense: **Ads → By ad unit → Display ads**. Create
   one, copy its numeric slot ID, and paste it over a `REPLACE-…` placeholder
   in the HTML. The placeholders are in `index.html` and each guide.
   *Simpler alternative:* set `AUTO_ONLY = true` in `assets/ads.js` and turn on
   Auto ads in the dashboard — Google then places them for you.
2. **Turn on the consent banner.** **Privacy & messaging → GDPR message** →
   create and publish. This is legally required for visitors in the EEA, the UK
   and Switzerland, and ads will not serve personalised to them without it.
   Create the **US states** message too while you are there.
3. **Set up payment.** Add your address and tax details. Google posts a PIN to
   verify your address once earnings reach $10, and pays out at $100.

---

## Rules that get accounts banned

- **Never click your own ads.** Not once, not to test. Detection is automatic
  and bans are usually permanent.
- Do not ask anyone else to click them either, and do not use traffic
  exchanges or bought traffic.
- Do not put ads where a visitor might hit one by accident — this is why the
  slots here sit well clear of the GO button.

---

## Realistic expectations

A speed test is a short-visit page, which is weak ad inventory: people arrive,
watch a gauge for 25 seconds, and leave. The guides are what actually earn,
because people read them and because they are what ranks in search.

Expect nothing for the first few months while the domain builds any search
presence at all. Traffic is the hard part — the ad code is trivial by
comparison. If you enjoy writing the guides, keep adding them; that is the
only lever that reliably moves both indexing and income.

Affiliate links for routers and mesh systems typically pay better per visitor
on this kind of site than display ads do, and are worth considering once you
have traffic worth converting.
