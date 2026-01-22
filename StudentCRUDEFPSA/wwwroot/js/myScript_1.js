$(document).ready(function () {
    loadStudents();
});

function loadStudents() {
    $.ajax({
        url: '/Student/GetAll',
        type: 'GET',
        success: function (data) {
            var rows = '';
            $.each(data, function (i, s) {
                rows += `<tr>
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
            $('#tblStudents tbody').html(rows);
        }
    });
}

function saveStudent() {
    var student = {
        Id: $('#studentId').val(),
        Name: $('#name').val(),
        Age: $('#age').val(),
        Course: $('#course').val()
    };

    var url = student.Id ? '/Student/Update' : '/Student/Create';

    $.ajax({
        url: url,
        type: 'POST',
        data: student,
        success: function () {
            loadStudents();
            clearForm();
        }
    });
}

function editStudent(id, name, age, course) {
    $('#studentId').val(id);
    $('#name').val(name);
    $('#age').val(age);
    $('#course').val(course);
}

function deleteStudent(id) {
    $.ajax({
        url: '/Student/Delete',
        type: 'POST',
        data: { id: id },
        success: function () {
            loadStudents();
        }
    });
}

/* ---------------- STUDENT DETAILS (AJAX - COMMENTED VERSIONS) ---------------- */

/*
function studentDeatils(id) {
    $.ajax({
        url: '/Student/GetAll',
        type: 'GET',
        success: function (data) {
            var student = data.find(s => s.id === id);

            if (student) {
                alert(
                    'Name: ' + student.name + '\n' +
                    'Age: ' + student.age + '\n' +
                    'Course: ' + student.course
                );
            }
        }
    });
}
*/

/*
function studentDeatils(id) {
    $.ajax({
        url: '/Student/GetById',
        type: 'GET',
        data: { id: id },
        success: function (student) {
            alert(
                'Name: ' + student.name + '\n' +
                'Age: ' + student.age + '\n' +
                'Course: ' + student.course
            );
        }
    });
}
*/

/*
function studentDeatils(id) {
    window.location.href = '/Student/Details?id=' + id;
}
*/

// ✅ ACTIVE VERSION (Bootstrap Modal)
function studentDeatils(id) {
    $.ajax({
        url: '/Student/GetById',
        type: 'GET',
        data: { id: id },
        success: function (student) {
            $('#alertName').text(student.name);
            $('#alertAge').text(student.age);
            $('#alertCourse').text(student.course);

            var modal = new bootstrap.Modal(
                document.getElementById('studentAlertModal')
            );
            modal.show();
        }
    });
}

function clearForm() {
    $('#studentId').val('');
    $('#name').val('');
    $('#age').val('');
    $('#course').val('');
}
