import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
console.log("Loading server from:", import.meta.url);
dotenv.config();
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);
console.log("SUPABASE_URL =", process.env.SUPABASE_URL);
console.log("SUPABASE_KEY exists =", !!process.env.SUPABASE_KEY);
const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

app.get("/", (req, res) => {
    res.send("AI University Recommendation Server Running");
});
console.log("Registering /api/recommend route...");
app.post("/api/recommend", async (req, res) => {

    console.log("✅ /api/recommend called");
    console.log(req.body);

    try {

        const student = req.body;
        //1
        const { data, error } = await supabase
    .from("Universities")
    .select("*");

if (error) {
    return res.status(500).json(error);
}

console.log("Total Universities:", data.length);
//2
const countryUniversities = data.filter(uni =>
    uni.Country &&
    uni.Country.toLowerCase() === student.country.toLowerCase()
);

console.log("Country Filter:", countryUniversities.length);
//3
const cgpaUniversities = countryUniversities.filter(uni => {

    const requiredCgpa =
    parseFloat(uni.Minimum_CGPA) || 0;

    const studentCgpa = parseFloat(student.degree);

    return studentCgpa >= requiredCgpa;

});

console.log("CGPA Filter:", cgpaUniversities.length);
//4
let ieltsUniversities = cgpaUniversities;

if (student.ielts) {

    const studentIelts = parseFloat(student.ielts);

    ieltsUniversities = cgpaUniversities.filter(uni => {

        const match =
            uni["IELTS BAND"]?.match(/(\d+(\.\d+)?)/);

        if (!match) return true;

        const required = parseFloat(match[1]);

        return studentIelts >= required;

    });

}

console.log("IELTS Filter:", ieltsUniversities.length);
//5
// STEP 4 - Course Matching

const courseKeywords = {
    MSC: [
        "Computer Science",
        "Information Technology",
        "Data Science",
        "Artificial Intelligence",
        "AI",
        "Cyber Security",
        "Software",
        "Engineering"
    ],

    MBA: [
        "MBA",
        "Business",
        "Management"
    ]
};

const keywords =
    courseKeywords[(student.preferredCourse || "").toUpperCase()] || [];

const matchedUniversities = ieltsUniversities.filter(uni => {

    if (!uni["Popular Courses"]) return false;

    const courses = uni["Popular Courses"].toLowerCase();

    return keywords.some(keyword =>
        courses.includes(keyword.toLowerCase())
    );

});

console.log("Course Match:", matchedUniversities.length);
const finalUniversities =
    matchedUniversities.length
        ? matchedUniversities
        : ieltsUniversities;

        
        
    //6
   const scoredUniversities =
    finalUniversities.map(uni => {
          const studentCgpa = parseFloat(student.degree);
      const requiredCgpa =
    parseFloat(uni.Minimum_CGPA) || 0;

    let matchScore = 0;
    let reason = "";
       // CGPA Score

const difference = studentCgpa - requiredCgpa;

if (difference >= 2) {

    matchScore += 35;
    reason += "Excellent academic profile. ";

}

else if (difference >= 1) {

    matchScore += 30;
    reason += "Strong academic profile. ";

}

else if (difference >= 0) {

    matchScore += 25;
    reason += "Meets minimum CGPA requirement. ";

}
        // IELTS Score (20)

if (!student.ielts) {

    matchScore += 15;
   reason += " IELTS requirement can be completed later.";

} else {

    const studentIelts = parseFloat(student.ielts);

    const match = uni["IELTS BAND"]?.match(/(\d+(\.\d+)?)/);

    if (match) {

        const requiredIelts = parseFloat(match[1]);

        if (studentIelts > requiredIelts) {

            matchScore += 20;
            reason += " Excellent IELTS score.";

        }

        else if (studentIelts === requiredIelts) {

            matchScore += 18;
            reason += " IELTS requirement satisfied.";

        }

        else {

            matchScore += 10;
            reason += " IELTS slightly below requirement.";

        }

    }

}       
        // Course Match (25)

matchScore += 25;

reason += " Preferred course is available.";
// Country Match (5)

matchScore += 5;

reason += " Preferred study country selected.";
        // Scholarship (5)

if (student.scholarship === "Yes") {

   if (uni.Scholarship && uni.Scholarship.trim() !== "") {

        matchScore += 5;

        reason += " Scholarship available.";

    }

    else {

        matchScore += 2;

    }

}

else {

    matchScore += 5;

}
        // Budget Score (10)

const feeText =
    String(uni["tuition fee"] || "");

const feeMatch = feeText.match(/(\d[\d,]*)/);

let universityFee = 0;

if (feeMatch) {
    universityFee = parseInt(feeMatch[1].replace(/,/g, ""));
}

const budgetMap = {
    "₹20 - ₹30 Lakhs": 30000,
    "₹30 - ₹40 Lakhs": 40000,
    "₹40 - ₹50 Lakhs": 50000,
    "₹50 - ₹60 Lakhs": 60000,
    "₹60 - ₹70 Lakhs": 70000,
    "₹70 - ₹80 Lakhs": 80000
};

const studentBudget = budgetMap[student.budget] || 50000;

if (universityFee <= studentBudget) {

    matchScore += 10;
    reason += " Tuition fee fits your budget.";

}
else if (universityFee <= studentBudget + 5000) {

    matchScore += 5;
    reason += " Tuition fee is slightly above your budget.";

}
else {

    reason += " Tuition fee is higher than your selected budget.";

}
        if (matchScore > 99) {

    matchScore = 99;

}
        return {

            name: uni.University,

            country: uni.Country,

            course: uni["Popular Courses"],

            duration: uni.Duration || "Refer University",

            fee: uni["tuition fee"],

            scholarship: uni.Scholarship || "Available",

            ranking: uni["QS Rank"] || "N/A",

            website: uni.Website || "#",

           match: `${matchScore}%`,
score: matchScore,
reason: reason

        };

    }); 
        
scoredUniversities.sort(
    (a, b) => b.score - a.score
);

const universities =
    scoredUniversities
        .slice(0, 5)
        .map(({ score, ...uni }) => uni);

console.log("Top 5 Universities:");

universities.forEach((uni, index) => {

    console.log(
        `${index + 1}. ${uni.name} (${uni.match})`
    );

});
     let eligibility = "Average";

if (parseFloat(student.degree) >= 8.5) {

    eligibility = "Excellent";

}
else if (parseFloat(student.degree) >= 7) {

    eligibility = "Good";

}

let visaChance = "Medium";

if (
    parseFloat(student.degree) >= 7 &&
    parseFloat(student.tenth) >= 60 &&
    parseFloat(student.inter) >= 60
) {

    visaChance = "High";

}
    //7
    return res.json({

    summary:
        "Universities selected using your academic profile.",

    eligibility,

    scholarshipChance:
        student.scholarship === "Yes"
            ? "High"
            : "Medium",

    visaChance,

    careerAdvice:
        "Continue preparing your application and language requirements.",

    universities

});
} catch (err) {

    console.error("Gemini Error:");
    console.error(err);

    if (err.stack) {
        console.error(err.stack);
    }

    res.status(500).json({
        error: "Failed to generate recommendations.",
        details: err.message
    });

}

});

const PORT = 3000;
app.get("/test-db", async (req, res) => {

    const { data, error } = await supabase
        .from("Universities")
        .select("*")
        .limit(5);

    if (error) {
        return res.status(500).json(error);
    }

    res.json(data);

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});