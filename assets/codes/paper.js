document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get("subject") || "AIML"; // Default subject
    document.getElementById("subjecthead").innerText = `${subject} Papers`;

    fetchPapers(subject);
});

// Google Sheets API URL
const GOOGLE_SHEETS_URL =
    "https://sheets.googleapis.com/v4/spreadsheets/1AVxtijmLWJLhk84zwmJ6E6wIHjZwT3GzOssSIJuyhzk/values/Sheet1?key=AIzaSyD_x0MTLG-d-cTpB4M9VNd2Ph1uet-FiWQ";

// Fetch and process Google Sheets data
async function fetchPapers(subject) {
    try {
        const response = await fetch(GOOGLE_SHEETS_URL);
        const data = await response.json();

        console.log("Fetched Data:", JSON.stringify(data, null, 2));

        const rows = data.values;
        if (!rows || rows.length < 2) {
            console.error("Error: No valid data found.");
            return;
        }

        // Extract headers
        const headers = rows[0].map(h => h.trim().toLowerCase());

        // Convert data rows into objects
        window.paperData = rows.slice(1).map(row =>
            Object.fromEntries(headers.map((h, i) => [h, row[i] || "N/A"]))
        );

        console.log("Processed Paper Data:", window.paperData);

        // Filter by subject
        window.paperData = window.paperData.filter(
            paper => paper.subject.toUpperCase() === subject.toUpperCase()
        );

        console.log("Filtered Papers:", window.paperData);

        displayPapers("CAT1"); // Default category
    } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
    }
}

// Display papers by exam type
// Display papers by exam type
function displayPapers(examType) {
    if (!window.paperData || window.paperData.length === 0) {
        console.error("Error: No paper data available.");
        return;
    }

    ["year-2024", "year-2023"].forEach(yearId => {
        const container = document.getElementById(yearId);
        if (!container) {
            console.error(`Error: Element with ID "${yearId}" not found.`);
            return;
        }

        container.innerHTML = ""; // Clear previous content

        let found = false;
        window.paperData.forEach(paper => {
            if (paper.exam.trim().toUpperCase() === examType.toUpperCase()) {
                found = true;
                const card = document.createElement("div");
                card.classList.add("paper-card");
                card.innerHTML = `
                    <h3>${paper.subject}</h3>
                    <p><strong>Exam:</strong> ${paper.exam}</p>
                    <p><strong>Year:</strong> ${paper.year}</p>
                    <p><strong>Slot:</strong> ${paper.slot}</p>
                    <a href="./paperview.html?link=${paper.link}" class="view-btn" target="_blank">View Paper</a>
                `;
                container.appendChild(card);
            }
        });

        if (!found) {
            container.innerHTML = `<p>No papers found for ${examType}.</p>`;
        }
    });
}

// Handle category filter clicks
function filterPapers(examType) {
    displayPapers(examType);
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelector(`[onclick="filterPapers('${examType}')"]`).classList.add("active");
}
