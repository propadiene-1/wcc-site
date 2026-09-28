# Deploying the WCC website (GitHub Pages + Namecheap)

About 30 minutes of work, plus some waiting while your domain connects.

You'll use three free-or-cheap services:
- **GitHub Pages** (free) hosts the site.
- **Namecheap** sells the domain (roughly $10–15/year for a .com or .org).
- **Formspree** (free plan) collects the mailing list and contact form submissions.

> Students: the **GitHub Student Developer Pack** (education.github.com/pack) includes free GitHub Pro and has offered free domain deals, including from Namecheap. Worth checking before you buy.

---

## Before you start
In `site.js`, set:
```js
showDesignPanel: false,
showPlaceholders: false,
```
and update `email` and `socials`. You can keep editing content after launch.

---

## Part 1: Put the site on GitHub Pages

1. Create a free account at **github.com**. A shared club email is best so the account can be handed down.
2. Click **+ → New repository**. Name it (e.g. `wcc-website`), set it to **Public**, and click **Create repository**.
3. On the next screen, click **uploading an existing file**.
4. Open the `wcc` folder and drag **everything inside it** into the upload area (so `index.html` ends up at the top level, not inside a folder). Click **Commit changes**.
   - `.nojekyll` is a hidden file and may not show up on your computer. That's fine; it's optional.
5. Go to **Settings → Pages**. Under **Build and deployment**, set Source to **Deploy from a branch**, choose **main** and **/ (root)**, and click **Save**.
6. After a minute or two, refresh the page. You'll see your live link: `https://yourusername.github.io/wcc-website/`.

---

## Part 2: Connect the forms (Formspree)

1. Sign up at **formspree.io** using the email where you want submissions sent.
2. Click **+ New Form**, name it `Mailing list`, and create it.
3. You'll see an endpoint like `https://formspree.io/f/xyzabcde`. Copy the ID at the end (`xyzabcde`).
4. Repeat for a second form called `Contact`.
5. Open `site.js` on GitHub (click the file, then the pencil icon) and paste the IDs:
   ```js
   forms: {
     mailingList: "xyzabcde",
     contact:     "abcd1234",
   },
   ```
   Click **Commit changes**.
6. Submit each form once on the live site. Formspree may ask you to confirm your email the first time.

Submissions are emailed to you and listed in your Formspree dashboard. The free plan has a monthly submission limit, which is plenty for most clubs; check Formspree's pricing page for current numbers.

The **Google Form** on the Join page doesn't need any of this. Just paste its link into `data-src=""` in `join.html`.

---

## Part 3: Buy your domain on Namecheap

1. Go to **namecheap.com** and search for a domain (e.g. `wellesleyconsulting.org`).
2. Add it to your cart. **Skip the add-ons**: you don't need Namecheap hosting, a website builder, or an SSL certificate, because GitHub provides hosting and HTTPS for free. Free domain privacy is fine to keep.
3. Turn on **auto-renew** so the club doesn't lose the domain when officers change.

> Some colleges have rules about using the school's name in a student group's domain. A quick check with student activities is worth it.

---

## Part 4: Connect the domain

### In GitHub
1. In your repository, go to **Settings → Pages**.
2. Under **Custom domain**, type your domain (e.g. `wellesleyconsulting.org`) and click **Save**. GitHub adds a small file called `CNAME` to your repository. Don't delete it.

### In Namecheap
1. Go to **Domain List** → click **Manage** next to your domain.
2. On the **Domain** tab, check that **Nameservers** is set to **Namecheap BasicDNS**.
3. Open the **Advanced DNS** tab and **delete** the default parking records (usually a `CNAME www → parkingpage.namecheap.com` and a `URL Redirect @`).
4. Click **Add New Record** and add these five:

| Type | Host | Value | TTL |
|---|---|---|---|
| A Record | `@` | `185.199.108.153` | Automatic |
| A Record | `@` | `185.199.109.153` | Automatic |
| A Record | `@` | `185.199.110.153` | Automatic |
| A Record | `@` | `185.199.111.153` | Automatic |
| CNAME Record | `www` | `yourusername.github.io` | Automatic |

Replace `yourusername` with your GitHub username (no repository name, no `https://`).

5. Save all records.

### Wait, then turn on HTTPS
- DNS usually updates within an hour, but can take up to 48 hours.
- Go back to **Settings → Pages** in GitHub. When the DNS check passes, tick **Enforce HTTPS**. (If the box is greyed out, GitHub is still setting up the certificate. Check back later.)
- Both `yourdomain.org` and `www.yourdomain.org` will work.

### Last step
Edit `sitemap.xml` and `robots.txt` on GitHub and replace `yourdomain.com` with your real domain.

---

## Updating the site

**Edit text:** open the file on GitHub, click the pencil icon, make your change, and click **Commit changes**. The live site updates in a minute or two.

**Add photos:** click into the `images` folder on GitHub → **Add file → Upload files** → drag your photos in → **Commit changes**. Then reference them in your pages, e.g. `<img src="images/group.jpg" alt="WCC members">`. Keep photos under about 1 MB each so pages load quickly (you can shrink them at squoosh.app).

**Prefer working on your computer?** Install **GitHub Desktop** (desktop.github.com), clone the repository, edit files locally (preview with VS Code Live Server), then click **Commit** and **Push**.

**Handing off to next year's board:** add new officers under **Settings → Collaborators**, and share the Namecheap and Formspree logins through a club password manager.

---

## Optional extras

**A club email at your domain (free):** in Namecheap, go to **Domain → Redirect Email** and forward an address like `hello@yourdomain.org` to your club Gmail. Then put that address in `site.js`.

**Protect your domain:** in your GitHub account (not the repository), go to **Settings → Pages → Add a domain** to verify you own it. This stops anyone else from using it on GitHub.

---

## Troubleshooting
| Problem | Fix |
|---|---|
| Live link shows a 404 | Make sure `index.html` is at the top level of the repository, not inside a `wcc` folder. |
| Domain shows a Namecheap parking page | Delete the parking records in Advanced DNS, or wait for DNS to update. |
| "Not secure" warning | Wait for DNS, then tick **Enforce HTTPS** in Settings → Pages. |
| Custom domain keeps disappearing | The `CNAME` file was deleted or overwritten. Re-enter the domain in Settings → Pages. |
| Forms open an email instead of sending | The Formspree IDs in `site.js` are empty or mistyped. |
| Changes not showing | Wait two minutes, then hard-refresh (Ctrl+Shift+R / Cmd+Shift+R). Check the **Actions** tab for a failed deploy. |
