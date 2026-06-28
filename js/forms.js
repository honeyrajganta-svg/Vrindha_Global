// ===============================
// OPEN / CLOSE MODAL
// ===============================

function openAssessment() {

    document.getElementById("assessmentModal").style.display = "flex";

    document.getElementById("step1").style.display = "block";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "none";

    document.querySelector(".modal-content").scrollTop = 0;
}

function closeAssessment() {

    document.getElementById("assessmentModal").style.display = "none";

}

// ===============================
// STEP 1
// ===============================

function nextStep() {

    const name = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const dob = document.getElementById("dob").value;

    let valid = true;

    document.getElementById("nameError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("dobError").textContent = "";

    // Name

    if(name===""){

        document.getElementById("nameError").textContent="Please enter your full name.";

        valid=false;

    }

    else if(!/^[A-Za-z ]+$/.test(name)){

        document.getElementById("nameError").textContent="Only alphabets are allowed.";

        valid=false;

    }

    // Phone

    if(phone===""){

        document.getElementById("phoneError").textContent="Please enter mobile number.";

        valid=false;

    }

    else if(!/^[0-9]{10}$/.test(phone)){

        document.getElementById("phoneError").textContent="Enter valid 10-digit mobile number.";

        valid=false;

    }

    // Email

    const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email===""){

        document.getElementById("emailError").textContent="Please enter email.";

        valid=false;

    }

    else if(!emailPattern.test(email)){

        document.getElementById("emailError").textContent="Enter valid email address.";

        valid=false;

    }

    // DOB

    if(dob===""){

        document.getElementById("dobError").textContent="Please select Date of Birth.";

        valid=false;

    }

    if(!valid) return;

    document.getElementById("step1").style.display="none";
    document.getElementById("step2").style.display="block";

    document.querySelector(".modal-content").scrollTop=0;

}

// ===============================
// BACK TO STEP1
// ===============================

function previousStep(){

    document.getElementById("step2").style.display="none";
    document.getElementById("step1").style.display="block";

    document.querySelector(".modal-content").scrollTop=0;

}

// ===============================
// STEP 2
// ===============================

function step3(){

    let valid=true;

    const tenth=document.getElementById("tenth").value.trim();
    const tenthYear=document.getElementById("tenthYear").value.trim();

    const inter=document.getElementById("inter").value.trim();
    const interYear=document.getElementById("interYear").value.trim();

    const degree=document.getElementById("degree").value.trim();
    const degreeYear=document.getElementById("degreeYear").value.trim();
    const currentCourse = document.getElementById("currentCourse").value.trim();
    const scholarship=document.getElementById("scholarship").value;
    const loan=document.getElementById("loan").value;

    document.getElementById("tenthError").textContent="";
    document.getElementById("interError").textContent="";
    document.getElementById("degreeError").textContent="";
    document.getElementById("scholarshipError").textContent="";
    document.getElementById("loanError").textContent="";

    // 10th

    if(tenth===""){

        document.getElementById("tenthError").textContent="Enter 10th Percentage.";

        valid=false;

    }

    else if(Number(tenth)<0 || Number(tenth)>100){

        document.getElementById("tenthError").textContent="Percentage should be between 0-100.";

        valid=false;

    }

    if(tenthYear===""){

        alert("Please enter 10th Year Passed.");

        valid=false;

    }

    // Intermediate

    if(inter===""){

        document.getElementById("interError").textContent="Enter Intermediate Percentage.";

        valid=false;

    }

    else if(Number(inter)<0 || Number(inter)>100){

        document.getElementById("interError").textContent="Percentage should be between 0-100.";

        valid=false;

    }

    if(interYear===""){

        alert("Please enter Intermediate Year Passed.");

        valid=false;

    }

    // Degree

    if(degree===""){

        document.getElementById("degreeError").textContent="Enter Degree CGPA / Percentage.";

        valid=false;

    }
     if(currentCourse===""){

    document.getElementById("courseError").textContent =
    "Enter your current course.";

    valid=false;

}
    if(degreeYear===""){

        alert("Please enter Degree Year Passed.");

        valid=false;

    }

    // Scholarship

    if(scholarship===""){

        document.getElementById("scholarshipError").textContent="Please select an option.";

        valid=false;

    }

    // Loan

    if(loan===""){

        document.getElementById("loanError").textContent="Please select an option.";

        valid=false;

    }

    if(!valid) return;

    document.getElementById("step2").style.display="none";
    document.getElementById("step3").style.display="block";

    document.querySelector(".modal-content").scrollTop=0;

}

// ===============================
// BACK TO STEP2
// ===============================

function backToStep2(){

    document.getElementById("step3").style.display="none";
    document.getElementById("step2").style.display="block";

    document.querySelector(".modal-content").scrollTop=0;

}

// ===============================
// SUBMIT
// ===============================
function submitAssessment() {

    let valid = true;

    const country = document.getElementById("country").value;
   const course =
document.getElementById("preferredCourseAbroad").value.trim();

const duration =
document.getElementById("duration").value;

const budget =
document.getElementById("budget").value;
document.getElementById("countryError").textContent = "";
document.getElementById("courseError").textContent = "";
document.getElementById("durationError").textContent = "";
document.getElementById("budgetError").textContent = "";   

    if (country === "") {
        document.getElementById("countryError").textContent = "Please select a country.";
        valid = false;
    }
    if(course===""){

    document.getElementById("courseError").textContent =
    "Please enter preferred course.";

    valid=false;

}

if(duration===""){

    document.getElementById("durationError").textContent =
    "Please select duration.";

    valid=false;

}

if(budget===""){

    document.getElementById("budgetError").textContent =
    "Please select budget.";

    valid=false;

}

   if (!valid) return;

   localStorage.setItem("studentData", JSON.stringify({

    fullName: document.getElementById("fullName").value,

    phone: document.getElementById("phone").value,

    email: document.getElementById("email").value,

    dob: document.getElementById("dob").value,

    tenth: document.getElementById("tenth").value,

    inter: document.getElementById("inter").value,

    degree: document.getElementById("degree").value,

    currentCourse: document.getElementById("currentCourse").value,

    country: country,

    preferredCourse: course,

    duration: duration,

    budget: budget,

    scholarship: document.getElementById("scholarship").value,

    loan: document.getElementById("loan").value,

    ielts: document.getElementById("ielts").value

}));
window.location.href = "processing.html";

    closeAssessment();
}

// ===============================
// CLOSE WHEN CLICK OUTSIDE
// ===============================

window.onclick=function(event){

    const modal=document.getElementById("assessmentModal");

    if(event.target===modal){

        closeAssessment();

    }

}