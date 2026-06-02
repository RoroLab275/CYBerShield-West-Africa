const scamRules = [
  {
    type: "Mobile Money Fraud",
    riskWeight: 3,
    keywords: [
      "momo pin",
      "mobile money pin",
      "send your pin",
      "otp",
      "one time password",
      "reverse transaction",
      "wrong transfer",
      "merchant code",
      "cash out"
    ],
    advice:
      "Do not share your mobile money PIN or OTP. Contact your provider directly using official customer care numbers."
  },
  {
    type: "WhatsApp Code Takeover",
    riskWeight: 3,
    keywords: [
      "whatsapp code",
      "verification code",
      "six digit code",
      "send me the code",
      "group code",
      "otp"
    ],
    advice:
      "Never share your WhatsApp verification code. Enable two-step verification in WhatsApp settings."
  },
  {
    type: "Phishing Link",
    riskWeight: 2,
    keywords: [
      "click this link",
      "verify your account",
      "account will be blocked",
      "login now",
      "update your details",
      "http://",
      "https://",
      "bit.ly",
      "tinyurl"
    ],
    advice:
      "Do not click suspicious links. Visit the official website or app directly instead."
  },
  {
    type: "Fake Job Offer",
    riskWeight: 2,
    keywords: [
      "recruitment fee",
      "processing fee",
      "training fee",
      "job slot",
      "pay before interview",
      "application fee"
    ],
    advice:
      "Be careful with jobs asking for payment before interviews or appointment letters."
  },
  {
    type: "Fake Investment or Crypto Scam",
    riskWeight: 3,
    keywords: [
      "guaranteed returns",
      "double your money",
      "investment",
      "crypto",
      "binance",
      "forex",
      "daily profit",
      "risk free"
    ],
    advice:
      "Avoid investment offers promising guaranteed or unusually high returns. Verify the company first."
  },
  {
    type: "Prize or Lottery Scam",
    riskWeight: 2,
    keywords: [
      "you have won",
      "congratulations",
      "lottery",
      "claim your prize",
      "winner",
      "free data",
      "free gift"
    ],
    advice:
      "Do not pay fees or share personal details to claim unexpected prizes."
  },
  {
    type: "Urgency or Pressure Tactic",
    riskWeight: 1,
    keywords: [
      "urgent",
      "immediately",
      "now",
      "limited time",
      "before midnight",
      "final warning",
      "last chance"
    ],
    advice:
      "Scammers often pressure people to act quickly. Pause and verify before responding."
  }
];

const sampleMessages = {
  momo:
    "Dear customer, a wrong transfer has been sent to your account. Send your MOMO PIN and OTP now to reverse transaction immediately.",
  job:
    "Congratulations, you have been shortlisted for an airport job. Pay a processing fee of GHS 150 before midnight to secure your job slot.",
  crypto:
    "Join our Binance investment group. Double your money in 24 hours with guaranteed returns and daily profit. Limited time only.",
  whatsapp:
    "I mistakenly sent my WhatsApp verification code to your phone. Please send me the six digit code urgently."
};

function useSampleMessage(type) {
  document.getElementById("messageInput").value = sampleMessages[type];
  checkMessage();
}

function checkMessage() {
  const message = document.getElementById("messageInput").value.toLowerCase();
  const resultBox = document.getElementById("resultBox");
  const riskBadge = document.getElementById("riskBadge");
  const likelyType = document.getElementById("likelyType");
  const warningSigns = document.getElementById("warningSigns");
  const safetyAdvice = document.getElementById("safetyAdvice");
  const confidenceScore = document.getElementById("confidenceScore");
const confidenceFill = document.getElementById("confidenceFill");

  if (!message.trim()) {
    alert("Please paste a suspicious message first.");
    return;
  }

  let totalScore = 0;
  let matchedKeywords = [];
  let matchedRules = [];

  scamRules.forEach((rule) => {
    const found = rule.keywords.filter((keyword) => message.includes(keyword));

    if (found.length > 0) {
      totalScore += found.length * rule.riskWeight;
      matchedKeywords.push(...found);
      matchedRules.push({
        type: rule.type,
        advice: rule.advice,
        score: found.length * rule.riskWeight
      });
    }
  });

  matchedRules.sort((a, b) => b.score - a.score);

 let risk = "Low Risk";
let riskClass = "risk-low";
let confidence = 20;
let confidenceClass = "low-confidence";

if (totalScore >= 8 || matchedRules.length >= 3) {
  risk = "High Risk";
  riskClass = "risk-high";
  confidence = 92;
  confidenceClass = "high-confidence";
} else if (totalScore >= 2) {
  risk = "Medium Risk";
  riskClass = "risk-medium";
  confidence = 60;
  confidenceClass = "medium-confidence";
} else {
  confidence = 20;
  confidenceClass = "low-confidence";
}

  riskBadge.textContent = risk;
  riskBadge.className = `risk-badge-result ${riskClass}`;
confidenceScore.textContent = `${confidence}%`;
confidenceFill.style.width = `${confidence}%`;
confidenceFill.className = `confidence-fill ${confidenceClass}`;
  likelyType.textContent =
    matchedRules.length > 0 ? matchedRules[0].type : "No obvious scam pattern";

  warningSigns.textContent =
    matchedKeywords.length > 0
      ? `Warning signs found: ${[...new Set(matchedKeywords)].join(", ")}`
      : "No obvious warning signs were found. Still verify unknown messages, links, numbers, and offers before responding.";

  safetyAdvice.textContent =
    matchedRules.length > 0
      ? matchedRules[0].advice
      : "Stay cautious. Do not share passwords, PINs, OTPs, or financial information with unknown people.";

  resultBox.classList.remove("hidden");
}

function clearMessage() {
  document.getElementById("messageInput").value = "";
  document.getElementById("resultBox").classList.add("hidden");
}let demoReports = JSON.parse(localStorage.getItem("cybershieldReports")) || [
  {
    country: "Ghana",
    city: "Accra",
    scamType: "Mobile Money Fraud",
    platform: "SMS",
    risk: "High Risk"
  },
  {
    country: "Nigeria",
    city: "Lagos",
    scamType: "Fake Investment or Crypto Scam",
    platform: "WhatsApp",
    risk: "High Risk"
  },
  {
    country: "Ghana",
    city: "Kumasi",
    scamType: "Fake Job Offer",
    platform: "Facebook",
    risk: "Medium Risk"
  }
];
function submitReport(event) {
  event.preventDefault();

  const country = document.getElementById("country").value;
  const city = document.getElementById("city").value;
  const scamType = document.getElementById("scamType").value;
  const platform = document.getElementById("platform").value;
  const evidence = document.getElementById("evidence").value;

  let risk = "Medium Risk";

  const highRiskWords = [
    "otp",
    "pin",
    "password",
    "verification code",
    "guaranteed returns",
    "double your money",
    "account will be blocked",
    "send money",
    "urgent"
  ];

  const evidenceLower = evidence.toLowerCase();

  if (highRiskWords.some((word) => evidenceLower.includes(word))) {
    risk = "High Risk";
  }

  const newReport = {
    country,
    city,
    scamType,
    platform,
    risk
  };

 demoReports.unshift(newReport);
localStorage.setItem("cybershieldReports", JSON.stringify(demoReports));
renderDashboard();

  document.getElementById("reportSuccess").classList.remove("hidden");

  document.querySelector(".report-form").reset();
removeScreenshot();

  setTimeout(() => {
    document.getElementById("reportSuccess").classList.add("hidden");
  }, 4000);
}function renderDashboard() {
  const totalReports = document.getElementById("totalReports");
  const highRiskReports = document.getElementById("highRiskReports");
  const countriesCount = document.getElementById("countriesCount");
  const topPlatform = document.getElementById("topPlatform");
  const reportsTableBody = document.getElementById("reportsTableBody");
  const threatList = document.getElementById("threatList");
  if (!totalReports || !reportsTableBody || !threatList) return;
  const dashboardSearch = document.getElementById("dashboardSearch");
const riskFilter = document.getElementById("riskFilter");

const searchValue = dashboardSearch ? dashboardSearch.value.toLowerCase() : "";
const selectedRisk = riskFilter ? riskFilter.value : "All";

const filteredReports = demoReports.filter((report) => {
  const searchableText = `
    ${report.country}
    ${report.city}
    ${report.scamType}
    ${report.platform}
    ${report.risk}
  `.toLowerCase();

  const matchesSearch = searchableText.includes(searchValue);
  const matchesRisk =
    selectedRisk === "All" || report.risk === selectedRisk;

  return matchesSearch && matchesRisk;
});
const highRiskCount = filteredReports.filter(
  (report) => report.risk === "High Risk"
).length;

const uniqueCountries = new Set(filteredReports.map((report) => report.country));

  const platformCounts = {};
filteredReports.forEach((report) => {
    platformCounts[report.platform] = (platformCounts[report.platform] || 0) + 1;
  });

  const topPlatformName =
    Object.entries(platformCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";

  totalReports.textContent = demoReports.length;
  highRiskReports.textContent = highRiskCount;
  countriesCount.textContent = uniqueCountries.size;
  topPlatform.textContent = topPlatformName;

  reportsTableBody.innerHTML = "";
  if (filteredReports.length === 0) {
  reportsTableBody.innerHTML = `
    <tr>
      <td colspan="5">No reports match your search or filter.</td>
    </tr>
  `;
  threatList.innerHTML = `
    <div class="threat-item">
      <div class="threat-item-top">
        <span>No matching threat categories</span>
        <span>0</span>
      </div>
    </div>
  `;
  return;
}

  filteredReports.forEach((report) => {
    const row = document.createElement("tr");

    const riskClass = report.risk.includes("High")
      ? "high"
      : report.risk.includes("Medium")
      ? "medium"
      : "low";

    row.innerHTML = `
      <td>${report.country}</td>
      <td>${report.city}</td>
      <td>${report.scamType}</td>
      <td>${report.platform}</td>
      <td><span class="table-risk ${riskClass}">${report.risk}</span></td>
    `;

    reportsTableBody.appendChild(row);
  });

  const threatCounts = {};
  filteredReports.forEach((report) => {
    threatCounts[report.scamType] = (threatCounts[report.scamType] || 0) + 1;
  });

  threatList.innerHTML = "";

  Object.entries(threatCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      const percent = (count / demoReports.length) * 100;

      const item = document.createElement("div");
      item.className = "threat-item";

      item.innerHTML = `
        <div class="threat-item-top">
          <span>${type}</span>
          <span>${count}</span>
        </div>
        <div class="threat-bar">
          <div class="threat-bar-fill" style="width: ${percent}%"></div>
        </div>
      `;

      threatList.appendChild(item);
    });
}

renderDashboard();
function toggleMobileMenu() {
  document.getElementById("mobileMenu").classList.toggle("show");
}

function closeMobileMenu() {
  document.getElementById("mobileMenu").classList.remove("show");
}const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}function reportCheckedMessage() {
  const messageInput = document.getElementById("messageInput");
  const evidenceInput = document.getElementById("evidence");
  const scamTypeInput = document.getElementById("scamType");
  const platformInput = document.getElementById("platform");
  const likelyType = document.getElementById("likelyType");

  if (!messageInput.value.trim()) {
    alert("Please check a message first.");
    return;
  }

  evidenceInput.value = messageInput.value;

  const detectedType = likelyType.textContent.trim();

  const scamTypeOptions = Array.from(scamTypeInput.options).map(
    (option) => option.text
  );

  if (scamTypeOptions.includes(detectedType)) {
    scamTypeInput.value = detectedType;
  }

  platformInput.value = "WhatsApp";

  document.getElementById("report").scrollIntoView({
    behavior: "smooth"
  });
}function resetDemoReports() {
  localStorage.removeItem("cybershieldReports");

  demoReports = [
    {
      country: "Ghana",
      city: "Accra",
      scamType: "Mobile Money Fraud",
      platform: "SMS",
      risk: "High Risk"
    },
    {
      country: "Nigeria",
      city: "Lagos",
      scamType: "Fake Investment or Crypto Scam",
      platform: "WhatsApp",
      risk: "High Risk"
    },
    {
      country: "Ghana",
      city: "Kumasi",
      scamType: "Fake Job Offer",
      platform: "Facebook",
      risk: "Medium Risk"
    }
  ];

  renderDashboard();
}function resetDemoReports() {
  demoReports = [
    {
      country: "Ghana",
      city: "Accra",
      scamType: "Mobile Money Fraud",
      platform: "SMS",
      risk: "High Risk"
    },
    {
      country: "Nigeria",
      city: "Lagos",
      scamType: "Fake Investment or Crypto Scam",
      platform: "WhatsApp",
      risk: "High Risk"
    },
    {
      country: "Ghana",
      city: "Kumasi",
      scamType: "Fake Job Offer",
      platform: "Facebook",
      risk: "Medium Risk"
    }
  ];

  localStorage.setItem("cybershieldReports", JSON.stringify(demoReports));

  const dashboardSearch = document.getElementById("dashboardSearch");
  const riskFilter = document.getElementById("riskFilter");

  if (dashboardSearch) dashboardSearch.value = "";
  if (riskFilter) riskFilter.value = "All";

  renderDashboard();

  alert("Demo reports have been reset.");
}function downloadReportsCSV() {
  if (!demoReports || demoReports.length === 0) {
    alert("No reports available to download.");
    return;
  }

  const headers = ["Country", "City", "Scam Type", "Platform", "Risk"];

  const rows = demoReports.map((report) => [
    report.country,
    report.city,
    report.scamType,
    report.platform,
    report.risk
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    )
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;"
  });

  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", "cybershield-reports.csv");
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}function previewScreenshot(event) {
  const file = event.target.files[0];
  const previewBox = document.getElementById("screenshotPreviewBox");
  const previewImage = document.getElementById("screenshotPreview");

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please upload an image file.");
    event.target.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    previewImage.src = e.target.result;
    previewBox.classList.remove("hidden");
  };

  reader.readAsDataURL(file);
}

function removeScreenshot() {
  const uploadInput = document.getElementById("screenshotUpload");
  const previewBox = document.getElementById("screenshotPreviewBox");
  const previewImage = document.getElementById("screenshotPreview");

  uploadInput.value = "";
  previewImage.src = "";
  previewBox.classList.add("hidden");
}function clearReportForm() {
  const reportForm = document.querySelector(".report-form");

  if (reportForm) {
    reportForm.reset();
  }

  removeScreenshot();

  const reportSuccess = document.getElementById("reportSuccess");
  if (reportSuccess) {
    reportSuccess.classList.add("hidden");
  }
}