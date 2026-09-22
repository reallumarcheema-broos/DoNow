# SpeedMeter

A free, browser-based internet speed test — download, upload, ping and jitter —
with a small library of guides around it. Static HTML, CSS and JavaScript: no
build step, no framework, no backend.

## Preview it locally

```sh
npx http-server . -p 8080     # then open http://localhost:8080
```

Opening `index.html` directly from disk works too.

## Before you go live — the checklist

Everything below is marked in the files themselves. None of it is optional if
you are applying to AdSense.

| # | What to change | Where |
|---|---|---|
| 1 | Your AdSense publisher ID (`ca-pub-…`) | `assets/ads.js` — the `PUB_ID` line |
| 2 | Your publisher ID again, digits only | `ads.txt` |
| 3 | Your ad unit IDs, replacing the `REPLACE-…` placeholders | `data-ad-slot` attributes in the HTML |
| 4 | Your contact email | `contact.html` |
| 5 | Your name or business name, and country | `privacy.html` |
| 6 | A governing-law clause | `terms.html` |
| 7 | Your real domain, replacing `https://example.com/` | `sitemap.xml`, `robots.txt` |

Ad code **does not load at all** until `PUB_ID` is a real ID, so the site stays
clean while you wait for review. Slots whose `data-ad-slot` is still a
`REPLACE-…` placeholder are skipped individually, which means no invalid ad
requests are ever sent.

## Applying to AdSense

1. Put the site on a domain you control, over HTTPS. A custom domain is
   treated far more kindly than a free subdomain.
2. Verify the site in [Google Search Console](https://search.google.com/search-console)
   and submit `sitemap.xml`. AdSense checks that a site is indexed.
3. Set `PUB_ID` in `assets/ads.js` and upload `ads.txt` to the site root.
4. Apply. Reviews commonly take a few days and can take several weeks.
5. Once approved, turn on **Privacy & messaging → GDPR message** in the AdSense
   dashboard. A Google-certified consent banner is required before serving
   personalised ads to visitors in the EEA, the UK and Switzerland. Use
   Google's own CMP rather than writing one — a homemade banner does not
   satisfy the requirement.

Ad placement here is deliberately conservative: nothing sits beside the GO
button, because ads next to a large tap target invite accidental clicks, and
invalid click activity gets accounts disabled rather than warned.

## How the test works

Measurements run against Cloudflare's public speed-test edge endpoints
(`speed.cloudflare.com/__down` and `/__up`), so the site needs no server of its
own.

- **Latency** — 14 timed round trips; the median of the trimmed set, with
  jitter from the mean consecutive deviation.
- **Download** — 5 parallel streamed fetches over 10 seconds; the first 1.5 s
  is discarded so TCP slow start does not drag the average down.
- **Upload** — 3 parallel XHRs over 9 seconds, tracked by upload progress
  events and reconciled on completion.
- The gauge and graph are smoothed for readability; reported figures always
  come from raw byte counts.

**Worth knowing:** those endpoints are undocumented and exist to power
Cloudflare's own speed test, not as a public API with a usage allowance. They
work well and are widely used, but they can be rate-limited or changed without
notice. If this site becomes a real source of income, move the test to a
Cloudflare Worker on your own account, or self-host LibreSpeed, so the
measurement layer is one you control.

## Layout

```
index.html          the speed test
guides/             five long-form guides + an index
about.html          what the site is and how it measures
contact.html        contact details
privacy.html        privacy policy (covers AdSense cookies)
terms.html          terms of use
404.html            not-found page
assets/styles.css   all styling
assets/theme.js     light/dark switch, shared by every page
assets/ads.js       AdSense loader — the only file with your publisher ID
ads.txt             authorised sellers
sitemap.xml         for Search Console
```

Navigation and footer markup are repeated in each page rather than templated,
which is the trade-off for having no build step: edit them in one file and copy
the change across.
