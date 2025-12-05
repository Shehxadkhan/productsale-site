# Deploy to Netlify via GitHub

This is the easiest and most reliable way to deploy your ProductSale website.

## Step 1: Push Code to GitHub

### If you don't have Git initialized:

```bash
# Initialize Git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - ProductSale website"
```

### Create GitHub Repository:

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Name it: `productsale-site` (or any name you like)
4. **Don't** check "Initialize with README" (you already have files)
5. Click **"Create repository"**

### Push Your Code:

```bash
# Add GitHub remote
git remote add origin https://github.com/Shehxadkhan/productsale-site.git

# Rename branch to main
git branch -M main

# Push code
git push -u origin main
```

**Your repository:** [https://github.com/Shehxadkhan/productsale-site](https://github.com/Shehxadkhan/productsale-site)

---

## Step 2: Deploy to Netlify

### Connect GitHub to Netlify:

1. Go to [netlify.com](https://netlify.com)
2. Click **"Sign up"** or **"Log in"**
3. Choose **"Sign up with GitHub"** (recommended)
4. Authorize Netlify to access your GitHub account

### Import Your Site:

1. Click **"Add new site"** → **"Import an existing project"**
2. Click **"Deploy with GitHub"**
3. Select your repository (`productsale-site` or whatever you named it)
4. Netlify will auto-detect Next.js settings:
   - **Build command:** `npm run build` ✓
   - **Publish directory:** `.next` (auto-handled) ✓
5. Click **"Deploy site"**

### Wait for Build:

- Netlify will install dependencies
- Build your site
- Deploy it
- Takes 3-5 minutes
- You'll see build progress in real-time

---

## Step 3: Your Site is Live!

After build completes, you'll get a URL like:
`https://random-name-12345.netlify.app`

**Your site is now live on the internet!** 🎉

---

## Add Custom Domain (Optional)

If you have a domain (like from GoDaddy):

1. In Netlify dashboard → Your site → **"Domain settings"**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `yoursite.com`)
4. Follow the DNS instructions:
   - Update DNS records in your domain provider
   - Wait 1-24 hours for DNS propagation

---

## Automatic Deployments

**Every time you push to GitHub, Netlify automatically:**
- Detects the changes
- Rebuilds your site
- Deploys the new version
- Updates your live site

Just push to GitHub and your site updates automatically! 🚀

---

## Updating Your Site

```bash
# Make changes to your code
# Then:

git add .
git commit -m "Updated products"
git push
```

Netlify will automatically deploy the changes!

---

## Troubleshooting

### Build Fails:
- Check build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify `netlify.toml` exists

### Site Not Loading:
- Wait for build to complete
- Check build logs for errors
- Verify all files were pushed to GitHub

### Need Help?
- Netlify Docs: https://docs.netlify.com
- Next.js on Netlify: https://docs.netlify.com/integrations/frameworks/nextjs/

---

**That's it! Your site is deployed and will auto-update on every GitHub push.** 🎉

