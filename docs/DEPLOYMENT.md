# Deployment Guide

This document provides instructions for setting up, building, and deploying the ARC, Tone Scale & EQ Learning Project.

---

## Prerequisites

### Required Software

- **Node.js** v18 or higher
- **npm** or **yarn** package manager
- **Git** for version control

### Recommended Tools

- **VS Code** or similar IDE with TypeScript support
- **ESLint** and **Prettier** for code quality
- **Docker** (optional, for containerised deployment)

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd LEARN
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment

Create a `.env` file in the root directory:

```env
# Environment configuration
VITE_APP_NAME=ARC Tone Scale EQ Learning
VITE_APP_VERSION=1.0.0
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

The application should now be available at `http://localhost:5173` (default Vite port).

---

## Building for Production

### 1. Run Build

```bash
npm run build
# or
yarn build
```

This creates an optimised build in the `dist/` directory.

### 2. Preview Production Build

```bash
npm run preview
# or
yarn preview
```

---

## Deployment Options

### Option 1: Static Hosting (Recommended)

Deploy the `dist/` folder to any static hosting service:

- **Vercel** - Automatic deployments from Git
- **Netlify** - Simple drag-and-drop or Git integration
- **GitHub Pages** - Free hosting for GitHub repositories
- **Cloudflare Pages** - Fast global CDN

### Option 2: Docker Container

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:

```bash
docker build -t arc-learning-app .
docker run -p 8080:80 arc-learning-app
```

### Option 3: VPS/Server

1. Install Node.js and Nginx on your server
2. Clone repository
3. Install dependencies and build
4. Configure Nginx to serve the `dist/` directory
5. Set up SSL certificates (Let's Encrypt recommended)

---

## Environment Variables

| Variable           | Description                      | Default                    |
| ------------------ | -------------------------------- | -------------------------- |
| `VITE_APP_NAME`    | Application name displayed in UI | ARC Tone Scale EQ Learning |
| `VITE_APP_VERSION` | Application version              | 1.0.0                      |
| `VITE_API_URL`     | API endpoint (if applicable)     | N/A                        |

---

## CI/CD Pipeline (Optional)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## Troubleshooting

### Build Fails

- Check Node.js version: `node --version`
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check for TypeScript errors: `npm run type-check`

### Application Not Starting

- Check port availability: `lsof -i :5173`
- Verify `.env` file exists and is correctly formatted
- Check console for error messages

### Deployment Issues

- Verify all environment variables are set
- Check build output for errors
- Review hosting service documentation for specific requirements

---

## Security Considerations

1. **Never commit** sensitive data (API keys, secrets) to version control
2. **Use environment variables** for configuration
3. **Enable HTTPS** on all production deployments
4. **Set up Content Security Policy** headers
5. **Regularly update** dependencies to patch security vulnerabilities

---

## Maintenance

### Regular Tasks

- **Weekly**: Review and update project backlog
- **Monthly**: Update dependencies and review security advisories
- **Quarterly**: Review and update documentation

### Version Updates

When updating versions:

1. Update `CHANGELOG.md` with new changes
2. Increment version number following semantic versioning
3. Update `VITE_APP_VERSION` in `.env`
4. Commit changes with clear message

---

_Last updated: 2026-02-25_
