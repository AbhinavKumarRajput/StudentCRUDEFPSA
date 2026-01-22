
    document.addEventListener("DOMContentLoaded", function () {
        loadStudents();
});

    function loadStudents() {
        fetch('/Stu/GetAll')
            .then(response => response.json())
            .then(data => {
                let rows = '';
                data.forEach(s => {
                    rows += `
                    <tr>
                        <td>${s.id}</td>
                        <td>${s.name}</td>
                        <td>${s.age}</td>
                        <td>${s.course}</td>
                        <td>
                            <button onclick="editStudent(${s.id}, '${s.name}', ${s.age}, '${s.course}')" class="btn btn-primary">Edit</button>
                            <button onclick="studentDeatils(${s.id})" class="btn btn-warning">Details</button>
                            <button onclick="deleteStudent(${s.id})" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>`;
                });
                document.querySelector('#tblStudents tbody').innerHTML = rows;
            });
}

    // Save Student
    function saveStudent() {
    const student = {
        Id: document.getElementById('studentId').value||0,
    Name: document.getElementById('name').value,
    Age: document.getElementById('age').value,
    Course: document.getElementById('course').value
    };

    const url = student.Id ? '/Stu/Update' : '/Stu/Create';

    fetch(url, {
        method: 'POST',
    headers: {
        'Content-Type': 'application/json'
        },
    body: JSON.stringify(student)
    })
    .then(() => {
        loadStudents();
    clearForm();
    });
}

    // Edit Student
    function editStudent(id, name, age, course) {
        document.getElementById('studentId').value = id;
    document.getElementById('name').value = name;
    document.getElementById('age').value = age;
    document.getElementById('course').value = course;
}

    // Delete Student
    function deleteStudent(id) {
        fetch('/Stu/Delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `id=${id}`
        })
            .then(() => loadStudents());
}

    // Student Details (Bootstrap Modal)
    function studentDeatils(id) {
        fetch(`/Stu/GetById?id=${id}`)
            .then(response => response.json())
            .then(student => {
                document.getElementById('alertName').innerText = student.name;
                document.getElementById('alertAge').innerText = student.age;
                document.getElementById('alertCourse').innerText = student.course;

                var modal = new bootstrap.Modal(
                    document.getElementById('studentAlertModal')
                );
                modal.show();
            });
}

    // Clear Form
    function clearForm() {
        document.getElementById('studentId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('course').value = '';
}

