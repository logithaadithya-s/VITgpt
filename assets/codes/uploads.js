// Load Google API Client
function loadGoogleAPI() {
  gapi.load('client:auth2', initClient);
}

// Initialize Google API Client
function initClient() {
  gapi.client.init({
      apiKey: '',
      clientId: '',
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
      scope: 'https://www.googleapis.com/auth/drive.file'
  }).then(() => {
      console.log("Google API Initialized");
  });
}

// Validate Form before Upload
function validateForm() {
  const slot = document.querySelector("select").value;
  const exam = document.querySelectorAll("select")[1].value;
  const subject = document.querySelector("input[name='subject']").value;
  const year = document.getElementById("year").value;
  const semester = document.querySelectorAll("select")[3].value;
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (slot === "Select slot" || exam === "Select exam" || !subject || year === "Select year" || semester === "Select semester" || !file) {
      alert("Please fill all the fields and select a file before uploading.");
      return;
  }

  uploadFile(file);
}

// Handle file upload
function uploadFile(file) {
  const metadata = {
      name: file.name,
      mimeType: file.type
  };

  const formData = new FormData();
  formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
  formData.append("file", file);

  fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
      method: "POST",
      headers: new Headers({
          Authorization: `Bearer ${gapi.auth.getToken().access_token}`
      }),
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      console.log("File uploaded:", data);
      createWordDocument(file.name, data.id);
  })
  .catch(error => console.error("Upload Error:", error));
}

// Create a Word Document with file details
function createWordDocument(fileName, fileId) {
  const content = `Uploaded File: ${fileName}\nFile ID: ${fileId}\nUploaded on: ${new Date().toLocaleString()}`;
  const blob = new Blob([content], { type: "text/plain" });

  const metadata = {
      name: "UploadDetails.docx",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  };

  const formData = new FormData();
  formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
  formData.append("file", blob);

  fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
      method: "POST",
      headers: new Headers({
          Authorization: `Bearer ${gapi.auth.getToken().access_token}`
      }),
      body: formData
  })
  .then(response => response.json())
  .then(data => console.log("Word document saved:", data))
  .catch(error => console.error("Document Save Error:", error));
}

// Load Google API script
document.addEventListener("DOMContentLoaded", () => {
  const script = document.createElement("script");
  script.src = "https://apis.google.com/js/api.js";
  script.onload = loadGoogleAPI;
  document.body.appendChild(script);
});
