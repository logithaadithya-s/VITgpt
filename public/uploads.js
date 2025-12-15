document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("uploadForm");
  
    if (!form) {
      console.error("❌ Error: Form not found!");
      return;
    }
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const data = {
        subject: document.getElementById("subject").value,
        section: document.getElementById("section").value,
        year: document.getElementById("year").value,
        examType: document.getElementById("examType").value,
        fileUrl: document.getElementById("fileUrl").value,
      };
  
      console.log("📤 Sending data:", data); // ✅ Debug data being sent
  
      try {
        const response = await fetch("http://localhost:3000/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
        console.log("✅ Upload Response:", result);
  
        if (!response.ok) {
          throw new Error(result.error || "Unknown error");
        }
  
        alert("✅ File uploaded successfully!");
  
      } catch (error) {
        console.error("❌ Upload Error:", error);
        alert("❌ Upload failed: " + error.message);
      }
    });
  });
  