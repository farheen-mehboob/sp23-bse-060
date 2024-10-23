// Function to show the full-page description
function showDescription(projectNumber) {
    // Hide the portfolio columns
    document.querySelector('.portfolio-container').style.display = 'none';

    // Show the corresponding project description
    if (projectNumber === 1) {
        document.getElementById('project1Page').classList.add('active');
    } else if (projectNumber === 2) {
        document.getElementById('project2Page').classList.add('active');
    }
}

// Function to close the project description and go back to the blurred images
function closeDescription() {
    // Hide both project pages
    document.getElementById('project1Page').classList.remove('active');
    document.getElementById('project2Page').classList.remove('active');

    // Show the portfolio columns
    document.querySelector('.portfolio-container').style.display = 'flex';
}
