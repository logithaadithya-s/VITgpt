
function validateForm() {
    let slot = document.querySelector("select:nth-of-type(1)").value;
    let exam = document.querySelector("select:nth-of-type(2)").value;
    let subject = document.querySelector(".subject123").value;
    let year = document.getElementById("year").value;
    let semester = document.querySelector("select:nth-of-type(3)").value;
    let fileInput = document.getElementById("fileInput").files.length;
    if (
        slot === "Select slot" || 
        exam === "Select exam" || 
        subject.trim() === "" || 
        year === "Select year" || 
        semester === "Select semester" || 
        fileInput === 0
    ) {
        alert("Please fill out all the fields before uploading.");
        return false;
    }
    alert("Form submitted successfully!");
    return true;
}

document.querySelector("button").addEventListener("click", function (event) {
    if (!validateForm()) {
        event.preventDefault(); // Prevent form submission if validation fails
    }
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var sql = "SELECT * FROM customers";
  
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result[0].id);
  });
});