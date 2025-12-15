// uploads.js

document.addEventListener('DOMContentLoaded', function() {
  // Get all form elements
  const slotSelect = document.querySelector('select:nth-of-type(1)');
  const examSelect = document.querySelector('select:nth-of-type(2)');
  const subjectInput = document.querySelector('input[list="courses"]');
  const yearSelect = document.getElementById('year');
  const semesterSelect = document.getElementById('sem');
  const fileInput = document.getElementById('fileInput');
  const uploadButton = document.querySelector('button');
  const resetButton = document.getElementById('reset1');

  // Function to validate form inputs
  function validateForm() {
      let isValid = true;
      
      // Reset error styles
      document.querySelectorAll('select, input').forEach(element => {
          element.style.border = '';
      });

      // Validate Slot
      if (slotSelect.selectedIndex === 0) {
          slotSelect.style.border = '1px solid red';
          isValid = false;
      }

      // Validate Exam
      if (examSelect.selectedIndex === 0) {
          examSelect.style.border = '1px solid red';
          isValid = false;
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
          subjectInput.style.border = '1px solid red';
          isValid = false;
      }

      // Validate Year
      if (yearSelect.selectedIndex === 0) {
          yearSelect.style.border = '1px solid red';
          isValid = false;
      }

      // Validate Semester
      if (semesterSelect.selectedIndex === 0) {
          semesterSelect.style.border = '1px solid red';
          isValid = false;
      }

      // Validate URL
      if (!fileInput.value.trim()){
          fileInput.style.border = '1px solid red';
          isValid = false;
      } else if (!isValidUrl(fileInput.value.trim())) {
          fileInput.style.border = '1px solid red';
          alert('Please enter a valid URL');
          isValid = false;
      }

      return isValid;
  }

  // Function to validate URL
  function isValidUrl(string) {
      try {
          new URL(string);
          return true;
      } catch (_) {
          return false;
      }
  }

  // Function to upload data to server
  async function uploadData() {
    if (!validateForm()) {
      alert('Please fill in all required fields correctly.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3001/api/upload-paper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slot: document.querySelector('select[name="slot"]').value,
          exam: document.querySelector('select[name="exam"]').value,
          subject: document.querySelector('input[name="subject"]').value,
          year: document.querySelector('select[name="year"]').value,
          semester: document.querySelector('select[name="semester"]').value,
          url: document.getElementById('fileInput').value.trim()
        })
      });
  
      // Check if response is OK (status 200-299)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }
  
      const data = await response.json();
      
      // Only show success message if we actually got success:true
      if (data.success) {
        alert(data.message || 'Paper uploaded successfully!');
        document.getElementById('uploadForm').reset();
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert("Uploaded succesfully!!")
    }
  }

  // Function to update contribution count (optional)
  function updateContributionCount() {
      fetch('http://localhost:3001/api/user-contribution')
          .then(response => response.json())
          .then(data => {
              // Update your UI with the count if needed
              console.log('Total contributions:', data.count);
          })
          .catch(error => console.error('Error fetching count:', error));
  }

  // Attach event listener to upload button
  uploadButton.addEventListener('click', uploadData);

  // Reset form validation styles when user starts typing/selecting
  document.querySelectorAll('select, input').forEach(element => {
      element.addEventListener('change', function() {
          this.style.border = '';
      });
      
      if (element.tagName === 'INPUT') {
          element.addEventListener('input', function() {
              this.style.border = '';
          });
      }
  });

  // Initialize contribution count on page load
  updateContributionCount();
});