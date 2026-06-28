// ================= Student Details =================

const student = JSON.parse(localStorage.getItem("studentData"));

document.getElementById("studentName").textContent =
student.fullName || "-";

document.getElementById("studentCountry").textContent =
student.country || "-";

document.getElementById("studentCourse").textContent =
student.preferredCourse || "-";

document.getElementById("studentDuration").textContent =
student.duration || "-";

document.getElementById("studentCgpa").textContent =
(student.degree || "-") + " CGPA";

document.getElementById("studentIelts").textContent =
student.ielts || "Not Provided";

// ================= University Data =================

const recommendation = JSON.parse(
    localStorage.getItem("recommendation")
);

const universities = recommendation.universities;

// ================= Create Cards =================

const container = document.getElementById("universityContainer");

universities.forEach(u=>{

container.innerHTML += `

<div class="university-card">

<div class="match-score">${u.match}</div>

<h3>${u.name}</h3>

<p>🌍 <strong>Country:</strong> ${u.country}</p>

<p>🎓 <strong>Course:</strong> ${u.course}</p>

<p>📅 <strong>Duration:</strong> ${u.duration}</p>

<p>💰 <strong>Tuition Fee:</strong> ${u.fee}</p>

<p>🎁 <strong>Scholarship:</strong> ${u.scholarship}</p>

<p>🏆 <strong>QS Ranking:</strong> ${u.ranking}</p>

<button
    class="apply-btn"
    onclick="window.open('${u.website || "#"}','_blank')">

    View University

</button>

</div>

`;

}); 