# Will It Get a Season 2? Predicting Television Anime Sequel Production

> **Course:** ICT324 Introduction to Data Warehousing and Data Mining  
> **Institution:** Rangsit University International College (Academic Year 2026)  
> **Research Track:** Classification and Association Rule Mining (ARM)  

A clean, professional single-page academic website presenting our data mining research project: formulating anime sequel continuation as a supervised classification and association rule mining task.

---

## 📋 Project Summary & Rubric Alignment

| Milestone Requirement | Implementation in Website | Status |
| :--- | :--- | :---: |
| **Home + Problem Overview** | Section 1: Detailed background on Japanese animation production committees (*seisaku iinkai*), proprietary decision limits, and the literature gap. | ✅ Complete |
| **Research Question (1 Sentence)** | Prominently displayed callout banner with our unified, single-sentence research question + RQ1, RQ2, and RQ3 breakdown. | ✅ Complete |
| **Data Source (Real & &ge; 500 rows)** | Verified Kaggle dataset link (24,000+ entries) + Jikan REST API v4, yielding an analytical cohort of ~2,000–3,000 first-season TV anime. | ✅ Complete |
| **Clean & Professional Design** | Elegant academic styling, high readability, responsive grid, zero unnecessary bloat/animations, print-ready CSS. | ✅ Complete |

---

## 🔗 Data Sources

- **Primary Kaggle Dataset:** [Anime Dataset 2023 by dbdmobile](https://www.kaggle.com/datasets/dbdmobile/myanimelist-dataset) (24,000+ records)
- **Relational Graph API:** [Jikan REST API v4](https://docs.api.jikan.moe/) (MyAnimeList relational graph)

---

## 🚀 How to View Locally

1. Simply double-click `index.html` to open it in any web browser (Chrome, Edge, Firefox, Safari).
2. Alternatively, run a lightweight local server:
   ```bash
   python -m http.server 8000
   ```
   and visit `http://localhost:8000`.

---

## 🌐 How to Publish to GitHub & Enable GitHub Pages

Follow these simple steps to put this page live on GitHub:

### Step 1: Initialize Git and Commit
In your terminal (inside `d:\RSU\ICT324_web`):
```bash
git init
git add .
git commit -m "Initial commit: ICT324 Anime Sequel Prediction project webpage"
```

### Step 2: Create a Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (for example, `anime-sequel-prediction` or `ICT324-anime-research`).
3. Set visibility to **Public** (required for free GitHub Pages).
4. Do **not** initialize with a README (you already have one).
5. Click **Create repository**.

### Step 3: Link and Push
Run the commands GitHub gives you:
```bash
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
git push -u origin main
```

### Step 4: Turn On GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** (gear tab at the top).
3. On the left sidebar, click **Pages** (under *Code and automation*).
4. Under **Build and deployment**:
   - **Source:** select `Deploy from a branch`
   - **Branch:** select `main` and folder `/ (root)`
5. Click **Save**.
6. Wait 30–60 seconds. GitHub will provide your live URL:
   `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`

Anyone with the link can now see your research webpage!
