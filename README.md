<div align="center">

# 👋 My Developer Portfolio

### Showcasing my projects, skills, and everything I build

<br/>

[![Next.js](https://img.shields.io/badge/framework-Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](#-tech-stack)
[![React](https://img.shields.io/badge/library-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](#-tech-stack)
[![Tailwind CSS](https://img.shields.io/badge/styling-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#-tech-stack)
[![Deployed on Vercel](https://img.shields.io/badge/deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](#-deployment)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](#-license)

<br/>

**[Live Site](https://your-portfolio-url.vercel.app)** · [Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure) · [Contact](#-contact)

</div>

<br/>

---

## ✨ About

This is my personal developer portfolio — built to showcase the projects I've shipped, the skills I bring to the table, and a place for people to reach out. It's fast, responsive, themeable, and content is easy to update through an integrated blog/CMS layer.

> Built with Next.js for performance, SEO, and a smooth developer experience.

<br/>

## 🚀 Features

<table>
<tr>
<td width="50%" valign="top">

### 💼 Projects Showcase
A curated grid of my work — each project with a description, tech tags, live demo link, and source code link.

### 🛠️ Skills Section
An organized breakdown of languages, frameworks, and tools I work with, grouped by category and proficiency.

### 📬 Contact Form
A working contact form so visitors can reach out directly from the site — no need to open a separate email client.

</td>
<td width="50%" valign="top">

### 🌗 Dark Mode
Full light/dark theme support with a persistent user preference and smooth theme transitions.

### 🎬 Animations
Subtle, performant scroll and interaction animations that add polish without hurting load time.

### 📱 Responsive Design
Looks and works great from mobile to ultra-wide — every section is fully responsive.

### 📝 Blog / CMS Integration
Write and publish posts through a connected CMS, rendered as fast, SEO-friendly pages.

</td>
</tr>
</table>

<br/>

## 🛠️ Tech Stack

<div align="center">

| Layer | Technologies |
|:---|:---|
| **Framework** | Next.js (App Router) |
| **UI Library** | React |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Content / CMS** | *(e.g. MDX / Contentful / Sanity — update to match yours)* |
| **Forms** | *(e.g. Resend / Formspree / Nodemailer — update to match yours)* |
| **Deployment** | Vercel |

</div>

<br/>

## ⚙️ Getting Started

### Prerequisites
- Node.js ≥ 18
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/portfolio.git
cd portfolio

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
```

### Environment Variables

```env
# Contact form
CONTACT_EMAIL=you@example.com
EMAIL_SERVICE_API_KEY=your_email_service_key

# CMS / Blog (if applicable)
CMS_API_URL=your_cms_api_url
CMS_API_KEY=your_cms_api_key
```

### Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000` to view it in your browser.

### Build for Production

```bash
npm run build
npm start
```

<br/>

## 🚢 Deployment

Deployed on **Vercel** — every push to `main` triggers an automatic production deployment, and every pull request gets its own preview URL.

```bash
vercel --prod
```

<br/>

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── page.tsx                # Home page
│   ├── about/                  # About / skills page
│   ├── projects/                # Projects showcase
│   ├── blog/                    # Blog / CMS-driven posts
│   ├── contact/                 # Contact form page
│   └── layout.tsx
├── components/
│   ├── ui/                      # Reusable UI components
│   ├── ThemeToggle.tsx          # Dark mode toggle
│   ├── ProjectCard.tsx
│   ├── SkillBadge.tsx
│   └── ContactForm.tsx
├── content/                     # MDX posts / project data (if used)
├── lib/                         # Utilities, CMS client, helpers
├── public/                      # Images, icons, resume PDF
├── styles/
└── next.config.js
```

<br/>

## 🗺️ Roadmap

- [ ] Add project filtering by tech stack/tag
- [ ] Add case-study pages for featured projects
- [ ] Add analytics dashboard for blog views
- [ ] Improve Lighthouse/SEO scores further
- [ ] Add multi-language support

<br/>

## 📬 Contact

Feel free to reach out through the contact form on the site, or directly:

- **Email:** your.email@example.com
- **LinkedIn:** [linkedin.com/in/yourname](https://linkedin.com)
- **GitHub:** [github.com/yourusername](https://github.com)

<br/>

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

<br/>

<div align="center">

**Built with ❤️ using Next.js**

[⬆ Back to top](#-my-developer-portfolio)

</div>
