# Shello Dashboard

A web dashboard to monitor and connect to all your [Shello](https://github.com/prkoundal/vpnBypass)-configured servers from one place.

See which servers are online, click to open a terminal — all from a single page.

## Setup

**Prerequisites:** Node.js 18+

```bash
git clone https://github.com/prkoundal/shello-dashboard.git
cd shello-dashboard
npm install
```

Edit `servers.json` with your servers:

```json
{
  "servers": [
    {
      "id": "prod-web",
      "name": "Production Web Server",
      "url": "https://terminal.yourdomain.com",
      "group": "production",
      "description": "Main web server"
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
| `id` | Yes | Unique identifier |
| `name` | Yes | Display name |
| `url` | Yes | Full ttyd URL (the one from Shello setup) |
| `group` | Yes | Group label (used for filtering) |
| `description` | No | Short description shown on card |

## How Status Works

The dashboard sends a `HEAD` request to each server's URL every 30 seconds. Since ttyd uses basic auth, a `401` response means the server is **online** (reachable, just needs credentials). A timeout or error means **offline**.

## Deploy

**Vercel (easiest):**
1. Push to GitHub
2. Import in [Vercel](https://vercel.com/new)
3. Deploy — done

**Self-hosted:**
```bash
npm run build
npm start
```

## License

MIT
