const gradeScale = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    E: 1,
    F: 0
};

function getGrade(score) {
    if (score >= 70 && score <= 100) return "A";
    if (score >= 60 && score < 70) return "B";
    if (score >= 50 && score < 60) return "C";
    if (score >= 45 && score < 50) return "D";
    if (score >= 40 && score < 45) return "E";
    if (score < 40) return "F";
}

function addCourse() {
    const courseName = document.querySelector('.courseName').value.trim();
    const credits = parseFloat(document.querySelector('.credits').value);
    const score = parseFloat(document.querySelector('.course-score').value);

    if (!courseName || isNaN(credits) || isNaN(score)) {
        alert('Please fill out the fields correctly.');
        return;
    }

    if (score < 0 || score > 100) {
        alert('Score must be between 0 and 100.');
        return;
    }

    const grade = getGrade(score);
    const points = credits * gradeScale[grade];

    const course = {courseName, grade, credits, points};

    const savedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    savedCourses.push(course);
    localStorage.setItem("courses", JSON.stringify(savedCourses));
    localStorage.setItem("status", "saved");

    const tbody = document.querySelector('#coursesTable tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${courseName}</td>
        <td>${grade}</td>
        <td>${credits}</td>
        <td>${points}</td>`;
    tbody.appendChild(row);

    document.querySelector('.courseName').value = '';
    document.querySelector('.credits').value = '';
    document.querySelector('.course-score').value = '';
}

function calcGpa() {
    const rows = document.querySelectorAll('#coursesTable tbody tr');
    const result = document.getElementById('gpaResult');

    let totalUnits = 0;
    let totalPoints = 0;

    rows.forEach(row => {
        const units = parseFloat(row.cells[2].textContent);
        const sumOfPoints = parseFloat(row.cells[3].textContent);
        totalUnits += units;
        totalPoints += sumOfPoints;
    });

    const gpa = (totalPoints / totalUnits).toFixed(2);
    result.textContent = `Your GPA is ${gpa}`;
    result.style.fontWeight = 'bold';
    result.style.color = '#000';
}

window.onload = calcGpa;