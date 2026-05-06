/**
 * Portfolio projects — aligned with https://github.com/gabrielnguyen2603?tab=repositories
 * Update descriptions or add repos here anytime.
 */
window.PORTFOLIO_PROJECTS = [
  {
    title: "Customer Segmentation & Predictive Analytics Engine",
    category: "Predictive analytics",
    language: "Python · scikit-learn · Power BI",
    featured: true,
    description:
      "An end-to-end segmentation engine built from retail transactions, translating customer behaviour into targeting decisions and KPI levers.",
    bullets: [
      "Analyzed 540k+ retail transactions to build an extended RFM framework and optimize marketing ROI",
      "Applied K-Means on a 4.3k user base to isolate a “Champion” segment responsible for 66.07M (68%) of top-line revenue",
      "Delivered strategic insights via a Power BI dashboard to reduce churn in high-value cohorts and lift frequency in mid-tier buyers",
    ],
    tags: ["segmentation", "rfm", "k-means", "power-bi", "python"],
    stars: null,
    github: "https://github.com/gabrielnguyen2603/Customer-Segmentation-Analysis",
    live: null,
    updated: "Mar 2026",
  },
  {
    title: "E-Commerce Data Warehouse & BI Dashboard",
    category: "Analytics engineering",
    language: "MySQL · Data Modeling · Power BI · ETL",
    featured: true,
    description:
      "Marketplace analytics pipeline: raw datasets → production-ready warehouse → executive KPI dashboard with leading/lagging separation.",
    bullets: [
      "Transformed 9 raw datasets into a centralized MySQL warehouse covering 100k+ orders and 32k+ products across $16M+ historical revenue",
      "Built an executive Power BI dashboard using DAX, separating leading vs. lagging indicators from diagnostic metrics (freight costs, delivery bottlenecks)",
      "Identified top categories (e.g., Bed/Bath, Health/Beauty) contributing nearly $3.4M sales to guide regional spend and reduce late-delivery churn",
    ],
    tags: ["mysql", "etl", "data-modeling", "power-bi", "dax"],
    stars: 1,
    github: "https://github.com/gabrielnguyen2603/Olist-Ecommerce-Project",
    live: null,
    updated: "Feb 2026",
  },
  {
    title: "Public Sector Spend Analytics & Cost Reduction Model",
    category: "Financial modeling",
    language: "Data Governance · Financial Modeling · BI",
    featured: true,
    description:
      "Municipal spend analysis with anomaly detection, vendor concentration tracking, and a prescriptive savings model for procurement decisions.",
    bullets: [
      "Analyzed £1.83B+ municipal spend across 300k+ transactions and engineered an executive dashboard to detect payment anomalies",
      "Built a low/base/high savings forecast identifying £5.84M+ actionable “Base Savings” via vendor consolidation and duplicate spend elimination",
      "Isolated the top 20 vendors (~30% of total spend) and analyzed historical category shifts to inform future budget allocation",
    ],
    tags: ["public-sector", "procurement", "forecasting", "cost-reduction", "governance"],
    stars: null,
    github: "https://github.com/gabrielnguyen2603/City-of-York-Council-Analysis",
    live: null,
    updated: "Mar 2026",
  },
  {
    title: "Stock-Portfolio-Optimization",
    category: "Financial analysis",
    language: "Jupyter Notebook",
    featured: false,
    description:
      "Quantitative portfolio analysis on Australian equities with risk/return framing and optimization experiments.",
    bullets: ["Portfolio metrics and visualization", "Optimization workflow in notebooks"],
    tags: ["finance", "optimization", "python"],
    stars: 1,
    github: "https://github.com/gabrielnguyen2603/Stock-Portfolio-Optimization",
    live: null,
    updated: "Nov 2025",
  },
  {
    title: "gabrielnguyen2603",
    category: "Profile",
    language: "GitHub profile",
    featured: false,
    description: "Profile README with summary, focus areas, and links to featured analytics work.",
    bullets: ["Data analyst positioning", "Portfolio entry links"],
    tags: ["readme", "github-profile"],
    stars: null,
    github: "https://github.com/gabrielnguyen2603/gabrielnguyen2603",
    live: null,
    updated: "Mar 2026",
  },
];
