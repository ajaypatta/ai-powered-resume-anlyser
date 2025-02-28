async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('resume', file);

    const response = await fetch('http://localhost:5000/api/resumes/upload', {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    document.getElementById('analysisResult').innerText = `Analysis: ${data.analysis}`;
}
