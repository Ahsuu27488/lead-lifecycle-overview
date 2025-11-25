# Lead Lifecycle Overview

A comprehensive lead management system that simulates the complete lifecycle of a lead through 5 distinct stages: Admin, Agent, Super Agent, Closer, and Final Approver (FA).

## 🚀 Features

- **Role-Based Dashboards**: Separate interfaces for Admin, Agent, Super Agent, Closer, and FA
- **Lead Workflow Management**: Track leads through their complete lifecycle
- **Split-View Interface**: Agent workflow with side-by-side old/new lead comparison
- **Status Tracking**: Real-time status updates visible across all roles
- **Modern UI**: Built with Next.js 16 and Tailwind CSS v3
- **Premium Typography**: Outfit font for enhanced readability

## 🎯 User Roles

### 1. Admin (Control Center)
- Create and manage all leads
- Assign leads to agents
- Control field visibility for agents
- Full CRUD operations

### 2. Agent (Lead Recreation)
- View assigned leads (read-only)
- Create new leads using split-view interface
- Submit processed leads for review

### 3. Super Agent (Review & Validation)
- Review pending submissions
- Edit and add missing information
- Request credit reports
- Transfer leads to Closer

### 4. Closer (Deal Finalization)
- Review leads from Super Agent
- Add program type and fees
- Transfer to FA for final approval

### 5. FA (Final Approval)
- Review lead summaries
- Accept or reject leads
- Final decision visible to all roles

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3.4.1
- **State Management**: React Context API
- **Font**: Outfit (Google Fonts)

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd lead-lifecycle-overview

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🚢 Deployment

### Netlify
This project is configured for easy deployment on Netlify:

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will automatically detect Next.js and configure build settings
4. Deploy!

Build settings are pre-configured in `netlify.toml`.

### Manual Build
```bash
npm run build
npm start
```

## 📖 Usage

1. **Select a Role**: Choose from Admin, Agent, Super Agent, Closer, or FA on the home page
2. **Navigate**: Use the navbar dropdown to switch between roles
3. **Follow the Workflow**: Each role has specific actions that move leads through the lifecycle

## 🎨 Design Features

- High contrast text for maximum readability
- Responsive design for all screen sizes
- Smooth transitions and hover effects
- Consistent color scheme throughout
- Clear visual hierarchy

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using Next.js and Tailwind CSS
