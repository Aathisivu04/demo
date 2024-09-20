const modal = document.getElementById('modal');
        const span = document.getElementsByClassName('close')[0];

        // Sample array of 30 students
        const students = [
            { name: 'John Doe', regNumber: '12345', attendance: 85, marks: 75 },
            { name: 'Jane Smith', regNumber: '12346', attendance: 90, marks: 88 },
            { name: 'Alice Johnson', regNumber: '12347', attendance: 80, marks: 92 },
        ];

        // Dynamically populate the data of 30 students
        for (let i = 4; i <= 30; i++) {
            students.push({
                name: `Student ${i}`,
                regNumber: `Reg-${10000 + i}`,
                attendance: Math.floor(Math.random() * 50) + 50,
                marks: Math.floor(Math.random() * 50) + 50
            });
        }

        document.getElementById('login-form').addEventListener('submit', function(event) {
            event.preventDefault();
            updateTable();
            modal.style.display = "block";
        });

        function updateTable() {
            let tableContent = `
                <h3>Submitted Information for 30 Students:</h3>
                <table>
                    <tr>
                        <th>Serial Number</th>
                        <th>Name</th>
                        <th>Registration Number</th>
                        <th>Attendance</th>
                        <th>Marks</th>
                        <th>Result</th>
                    </tr>
            `;

            // Loop through students and add their data to the table
            students.forEach((student, index) => {
                const result = student.marks >= 50 ? 'Pass' : 'Fail';
                const tickClass = student.attendance > 0 ? 'active' : '';
                const marksDisplay = student.attendance > 0 ? student.marks : '';
                const resultDisplay = student.attendance > 0 ? result : '';

                tableContent += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${student.name}</td>
                        <td>${student.regNumber}</td>
                        <td class="attendance-cell ${tickClass}" data-index="${index}">
                            <span class="tick">&#10003;</span> <!-- Green tick -->
                        </td>
                        <td class="marks-cell" data-index="${index}" tabindex="0">
                            ${marksDisplay}
                            <input type="number" class="edit-input" data-index="${index}" placeholder="Edit">
                        </td>
                        <td>${resultDisplay}</td>
                    </tr>
                `;
            });

            tableContent += `</table>`;
            document.getElementById('output').innerHTML = tableContent;

            // Add click event listener to attendance cells
            document.querySelectorAll('.attendance-cell').forEach(cell => {
                cell.addEventListener('click', function() {
                    const index = this.dataset.index;
                    this.classList.toggle('active'); // Toggle active class
                    
                    // Update attendance value in students array
                    if (this.classList.contains('active')) {
                        students[index].attendance = 85; // Mark as present
                    } else {
                        students[index].attendance = 0; // Mark as absent
                    }

                    // Refresh the table
                    updateTable();
                });
            });

            // Add click event listener to marks cells
            document.querySelectorAll('.marks-cell').forEach(cell => {
                cell.addEventListener('click', function() {
                    const index = this.dataset.index;
                    const input = this.querySelector('.edit-input');
                    input.style.display = 'inline-block'; // Show input
                    input.value = students[index].marks; // Set input value to current marks
                    input.focus(); // Focus on input
                });
            });

            // Add change event listener for marks input
            document.querySelectorAll('.edit-input').forEach(input => {
                input.addEventListener('blur', function() {
                    const index = this.dataset.index;
                    const newMarks = parseInt(this.value);
                    if (!isNaN(newMarks)) {
                        students[index].marks = newMarks; // Update marks
                    }
                    this.style.display = 'none'; // Hide input after editing
                    updateTable(); // Refresh the table
                });

                input.addEventListener('keydown', function(event) {
                    if (event.key === 'Enter') {
                        this.blur(); // Trigger blur to save changes
                    }
                });
            });
        }

        // Close the modal when the user clicks the close button
        span.onclick = function() {
            modal.style.display = "none";
        }

        // Close the modal when the user clicks anywhere outside the modal
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }