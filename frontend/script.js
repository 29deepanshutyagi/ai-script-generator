const form = document.getElementById('scriptForm');
        const resultDiv = document.getElementById('result');
        const output = document.getElementById('output');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const prompt = document.getElementById('prompt').value;
            const files = document.getElementById('files').files;

            const formData = new FormData();
            formData.append('prompt', prompt);
            for (let file of files) {
                formData.append('files', file);
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/api/generate-script/', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    const script = data.choices[0].message.content.split("\n").filter(line => line.trim()); // Split into lines and remove empty ones
                    
                    // Display formatted sections
                    output.innerHTML = ""; // Clear existing content
                    
                    let sectionCounter = 1; // For better structure

                    script.forEach((line, index) => {
                        if (line.toLowerCase().includes("morning")) {
                            output.innerHTML += `<div class="section-heading">Morning</div><div class="section-content">${line}</div>`;
                        } else if (line.toLowerCase().includes("afternoon")) {
                            output.innerHTML += `<div class="section-heading">Afternoon</div><div class="section-content">${line}</div>`;
                        } else if (line.toLowerCase().includes("evening")) {
                            output.innerHTML += `<div class="section-heading">Evening</div><div class="section-content">${line}</div>`;
                        } else {
                            // If it's a regular point, categorize under a generic section
                            output.innerHTML += `<div class="section-heading">Part ${sectionCounter}</div><div class="section-content">${line}</div>`;
                            sectionCounter++;
                        }
                    });
                    resultDiv.classList.remove("hidden");
                } else {
                    output.innerHTML = `<div class="text-red-500">Error: ${response.statusText}</div>`;
                    resultDiv.classList.remove("hidden");
                }
            } catch (error) {
                output.innerHTML = `<div class="text-red-500">An error occurred: ${error.message}</div>`;
                resultDiv.classList.remove("hidden");
            }
        });