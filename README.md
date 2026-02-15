# Shello Hub

A web dashboard to monitor and connect to all your [Shello](https://github.com/ParasKoundal/Shello)-configured servers from one place.

See which servers are online, click to open a terminal — all from a single page.

## Features

- Live online/offline status for each server (polls every 30s)
- Click to open any server's terminal in a new tab
- Search across server names, groups, and descriptions
- Filter by server group (production, staging, personal, etc.)
- Dark mode by default with light mode toggle
- Responsive — works on mobile, tablet, and desktop
- Copy server URL to clipboard

## Quick Start (Local)

**Prerequisites:** Node.js 18+

```bash
git clone https://github.com/ParasKoundal/shello-dashboard.git
cd shello-dashboard
cp servers.example.json servers.json
npm install
```

Edit `servers.json` with your actual servers:

```json
{
  "servers": [
    {
      "id": "prod-web",
      "name": "Production Web Server",
      "url": "https://terminal.yourdomain.com",
      "group": "production",
      "description": "Main web server"
    },
    {
      "id": "homelab",
      "name": "Home Lab",
      "url": "https://lab.yourdomain.com",
      "group": "personal",
      "description": "Raspberry Pi cluster"
    }
  ]
}
```

Then run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## servers.json Format

| Field | Required | Description |
|---|---|---|
| `id` | Yes | Unique identifier for this server |
| `name` | Yes | Display name shown on the card |
| `url` | Yes | Full ttyd URL (the one from your Shello setup) |
| `group` | Yes | Group label — used for filtering (e.g., "production", "personal") |
| `description` | No | Short description shown below the name |

## How Status Works

The dashboard's API route sends a `HEAD` request to each server's URL every 30 seconds. Since ttyd uses basic auth, a `401 Unauthorized` response means the server is **online** (reachable, just needs credentials). A timeout or network error means **offline**.

Health checks happen server-side (in Next.js API routes), so there are no CORS issues.

## Deploy to Your Own Domain

### Step 1: Push to GitHub

```bash
git remote add origin git@github.com:YourUsername/shello-dashboard.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import your repo
2. Add environment variables before deploying:

   | Name | Value | Purpose |
   |---|---|---|
   | `SERVERS_CONFIG` | Your servers JSON (single line) | Server list — kept out of git |
   | `DASHBOARD_PASSWORD` | A password of your choice | Protects the dashboard behind a login screen |

   Example `SERVERS_CONFIG`:
   ```
   {"servers":[{"id":"prod","name":"Production","url":"https://terminal.yourdomain.com","group":"production","description":"Main server"}]}
   ```

3. Click **Deploy**

### Step 3: Custom domain

1. In Vercel → your project → **Settings** → **Domains** → add `dashboard.yourdomain.com`
2. In your domain registrar (Namecheap, GoDaddy, etc.) → DNS settings:
   - Add a **CNAME Record**: Host = `dashboard`, Value = `cname.vercel-dns.com`
3. Wait 5–15 minutes for DNS propagation — Vercel auto-provisions SSL

### Self-hosted alternative

```bash
npm run build
npm start
```

Place your `servers.json` in the project root, or set the `SERVERS_CONFIG` environment variable.

## Related

- **[Shello](https://github.com/ParasKoundal/Shello)** — the setup script that installs ttyd + Cloudflare Tunnel on each server. Run it on every server you want to appear in this dashboard.

## License

MIT
