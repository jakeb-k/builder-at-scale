# Production Deployment

This repo deploys to `jakebknowles.com` as a static Next.js export.

The production flow is:

1. Push to `main`
2. GitHub Actions runs `npm ci` and `npm run build`
3. The workflow uploads the generated `out/` files to the DigitalOcean droplet
4. Nginx serves the latest release from `/var/www/jakebknowles.com/current`

## GitHub Setup

Add these repository secrets in GitHub:

- `SSH_HOST`: public IP or hostname of the droplet
- `SSH_PORT`: SSH port for the droplet, usually `22`
- `SSH_USER`: deploy user, for example `deploy`
- `SSH_KEY`: private SSH key for the deploy user
- `SSH_KNOWN_HOSTS`: output of `ssh-keyscan -H <host>`

Local git setup:

```bash
git remote set-url origin https://github.com/jakeb-k/builder-at-scale.git
git push -u origin main
```

## Droplet Setup

One-time server setup:

```bash
sudo adduser --disabled-password --gecos "" deploy
sudo mkdir -p /var/www/jakebknowles.com/releases
sudo chown -R deploy:deploy /var/www/jakebknowles.com
sudo apt-get update
sudo apt-get install -y nginx
```

Authorize the matching public key for the deploy user:

```bash
sudo -u deploy mkdir -p /home/deploy/.ssh
sudo -u deploy chmod 700 /home/deploy/.ssh
sudo -u deploy tee -a /home/deploy/.ssh/authorized_keys >/dev/null
sudo -u deploy chmod 600 /home/deploy/.ssh/authorized_keys
```

Create `/etc/nginx/sites-available/jakebknowles.com` with the config from [`ops/nginx/jakebknowles.com.conf`](../ops/nginx/jakebknowles.com.conf), then enable it:

```bash
sudo tee /etc/nginx/sites-available/jakebknowles.com >/dev/null <<'EOF'
server {
  listen 80;
  listen [::]:80;
  server_name www.jakebknowles.com;

  return 301 http://jakebknowles.com$request_uri;
}

server {
  listen 80;
  listen [::]:80;
  server_name jakebknowles.com;

  root /var/www/jakebknowles.com/current;
  index index.html;

  location / {
    try_files $uri $uri.html $uri/ =404;
  }

  error_page 404 /404.html;

  location = /404.html {
    internal;
  }
}
EOF
sudo ln -s /etc/nginx/sites-available/jakebknowles.com /etc/nginx/sites-enabled/jakebknowles.com
sudo nginx -t
sudo systemctl reload nginx
```

Point DNS for `jakebknowles.com` and `www.jakebknowles.com` at the droplet, then issue TLS:

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d jakebknowles.com -d www.jakebknowles.com
```

## Verification

Run these checks after the first deployment:

```bash
npm run build
```

Then confirm:

- GitHub Actions finishes successfully
- `/var/www/jakebknowles.com/current/index.html` exists on the droplet
- `https://jakebknowles.com` loads
- `https://www.jakebknowles.com` redirects to the apex domain

## Future Node Migration

If the portfolio later needs database-backed content or other request-time Next.js features:

1. Remove `output: "export"` from [`next.config.ts`](../next.config.ts)
2. Replace the static artifact upload workflow with a Node-hosted deploy
3. Add a process manager such as `systemd` or `pm2`
4. Change Nginx from static file serving to reverse proxying `next start`
