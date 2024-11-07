function loadDescription(projectId) {
    // Create a mapping of project IDs to file names
    const projectFiles = {
        1: 'project1.txt', // File with description for Project 1
        2: 'project2.txt'  // File with description for Project 2
    };
    
    // Get the filename based on the projectId
    const fileName = projectFiles[projectId];
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', fileName, true);

    xhr.onload = function() {
        if (this.status === 200) {
            // Determine the corresponding description div based on projectId
            const descriptionDiv = document.getElementById(`project${projectId}Page`);

            descriptionDiv.innerHTML = this.responseText;
            descriptionDiv.style.display = 'block'; // Show the description after loading
        }
    };

    xhr.onerror = function() {
        console.log('Request error...');
    };

    xhr.send();
}

function showDescription(projectId) {
    loadDescription(projectId);
}

function closeDescription() {
    // Hide all project description pages
    document.querySelectorAll('.project-page').forEach(page => {
        page.style.display = 'none';
    });
}