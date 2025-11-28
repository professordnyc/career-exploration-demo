# Career Exploration Demo App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is a lightweight, clickable prototype designed to showcase how students can:
- Upload resumes
- Receive AI-driven career insights
- Explore alumni outcomes and job postings
- Earn gamified badges
- Provide counselors with dashboard metrics
- Engage with curriculum-linked prompts (Coming in v2.0)

---

## ⚡ Quickstart for Contributors

1. **Clone the repo**
   ```bash
   git clone https://github.com/professordnyc/career-exploration-demo
   cd career-exploration-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment files**
   - Copy `.env.example` → `.env.local`
   - Add API keys if available, or leave placeholders for mock data.

4. **Follow the planning + layering workflow**
   - Review the Markdown plan before coding.
   - Add modules sequentially (UI → Resume Parsing → Alumni Outcomes → Gamification → Dashboard → Curriculum).
   - Run lightweight QA tests after each layer.

5. **Run the app locally**
   ```bash
   npm run dev
   ```
   Then open [http://localhost:3000](http://localhost:3000) to interact with the demo.

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/professordnyc/career-exploration-demo
   cd career-exploration-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   - Copy `.env.example` → `.env.local`
   - Add any required API keys or keep placeholders for mock data
   - Example:
     ```
     OPENAI_API_KEY=your_key_here
     HANDSHAKE_API_KEY=your_key_here
     ```

4. **Run the app locally**
   ```bash
   npm run dev
   ```

---

## 🧩 Planning + Layering Approach

This project uses a **two-phase workflow**:

### Phase 1: Planning
- Initial prompt generated a **Markdown plan** only (no code).
- Plan included folder structure, file names, formats, and workflow setup.
- This ensures clarity and avoids overwriting files later.

### Phase 2: Layering
- Modules were added sequentially:
  1. UI scaffold (resume upload + chat)
  2. Resume parsing (`mock_resume.json`)
  3. Alumni outcomes + job postings (`mock_alumni_outcomes.csv`, `mock_job_postings.json`)
  4. Gamification (`mock_badges.json`)
  5. Dashboard metrics (`mock_dashboard_metrics.json`)
  6. Curriculum prompt integration (planned for v2.0)
- QA agent ran lightweight tests after each layer.
- Deployment included Git setup, `.gitignore`, `env.local`, `env.example`, and logging.

This modular approach conserves credits, ensures stability, and makes the project easy to replicate or refine.

---

## 👩‍💻 Contributing

- Follow the **planning + layering approach** when adding new features.
- Always update the Markdown plan before coding.
- Add mock files for new modules before connecting real APIs.
- Run lightweight QA tests to confirm stability.
- Use pull requests for changes; keep commits clear and modular.

---

## 📊 Status

- ✅ All modules tested with mock data
- ✅ QA checks passed
- ✅ Ready for demo deployment
- ⏳ Alumni Connector badge (WIP - Coming Soon)
- ⏳ Curriculum prompt system (planned for v2.0)

---

## 📜 License

This project is licensed under the MIT License.

---

## 🙌 Credits and Contribute

Made with **Bolt**. #Bolt #AIAssistant
Reach me on Discord or here **@professordnyc**
