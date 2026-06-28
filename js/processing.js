const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const steps = document.querySelectorAll("#analysisList li");

const messages = [
    "Reading Personal Information...",
    "Reading Academic Information...",
    "Verifying Student Profile...",
    "Finding Eligible Universities...",
    "Calculating Scholarship Chances...",
    "Preparing AI Recommendations..."
];

let progress = 0;
let currentStep = 0;

const interval = setInterval(() => {

    progress += 3;

    progressFill.style.width = progress + "%";

    if (currentStep < steps.length && progress >= (currentStep + 1) * 15) {

        steps[currentStep].innerHTML = "✅ " + messages[currentStep];

        progressText.innerHTML = messages[currentStep];

        currentStep++;
    }

    if (progress >= 100) {

        clearInterval(interval);

        progressText.innerHTML =
            "AI is generating university recommendations...";

        generateRecommendations();

    }

}, 150);

// =========================================
// GEMINI AI
// =========================================

async function generateRecommendations() {

    try {

        const student = JSON.parse(
            localStorage.getItem("studentData")
        );

        const response = await fetch(
            "http://localhost:3000/api/recommend",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(student)
            }
        );

        if (!response.ok) {
            throw new Error("Server Error");
        }

        const aiResult = await response.json();
localStorage.setItem(
    "recommendation",
    JSON.stringify(aiResult)
);

        window.location.href = "result.html";

    } catch (error) {

        console.error(error);

        alert("Unable to connect to the AI server.");

    }

}