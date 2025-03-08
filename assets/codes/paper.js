function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the subject from the URL
const subject = getQueryParam("subject");
// Update page content dynamically
if (subject) {
    document.getElementById("subjecthead").innerHTML = subject + " Papers";
    let subL=document.querySelectorAll(".subjectpaper");
    for(let i=0;i<subL.length;i++){
        document.querySelectorAll(".subjectpaper")[i].textContent = subject;

    }
} else {
    document.getElementById("subjecthead").innerHTML = "No Subject Selected";
}
