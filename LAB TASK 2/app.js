// Function to fetch and display all stories
async function getStories() {
    try {
        const response = await fetch("https://usmanlive.com/wp-json/api/stories");
        if (!response.ok) throw new Error('Network response was not ok');

        const stories = await response.json();
        let output = '';
        stories.forEach(story => {
            output += `
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">${story.title}</span>
                        <p>${story.content}</p>
                        <small class="grey-text">Story ID: ${story.id}</small>
                        <div class="card-action">
                            <button class="btn orange" onclick="loadStory(${story.id})">Update</button>
                            <button class="btn red" onclick="deleteStory(${story.id})">Delete</button>
                        </div>
                    </div>
                </div>
            </div>`;
        });
        document.getElementById('storyList').innerHTML = output;
    } catch (error) {
        M.toast({html: 'Error fetching stories: ' + error.message});
    }
}

// Function to load a story's details into the form for updating
async function loadStory(storyId) {
    try {
        const response = await fetch(`https://usmanlive.com/wp-json/api/stories/${storyId}`);
        if (!response.ok) throw new Error('Error fetching story');

        const story = await response.json();
        document.getElementById('title').value = story.title;
        document.getElementById('content').value = story.content;
        document.getElementById('storyId').value = story.id;

        M.toast({html: 'Story loaded for update'});
    } catch (error) {
        M.toast({html: 'Error loading story: ' + error.message});
    }
}

// Function to create a new story
async function createStory() {
    const title = document.getElementById('title').value;
 const content = document.getElementById('content').value;

    try {
        const response = await fetch("https://usmanlive.com/wp-json/api/stories", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        if (!response.ok) throw new Error('Error adding story');
        M.toast({html: 'Story added successfully'});
        getStories(); // Refresh stories
        clearForm();
    } catch (error) {
        M.toast({html: 'Error adding story: ' + error.message});
    }
}

// Function to update a story by ID
async function updateStory() {
    const storyId = document.getElementById('storyId').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    try {
        const response = await fetch(`https://usmanlive.com/wp-json/api/stories/${storyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        if (!response.ok) throw new Error('Error updating story');
        M.toast({html: 'Story updated successfully'});
        getStories(); // Refresh stories
        clearForm();
    } catch (error) {
        M.toast({html: 'Error updating story: ' + error.message});
    }
}

// Function to delete a story by ID
async function deleteStory(storyId) {
    try {
        const response = await fetch(`https://usmanlive.com/wp-json/api/stories/${storyId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Error deleting story');
        M.toast({html: 'Story deleted successfully'});
        getStories(); // Refresh stories
    } catch (error) {
        M.toast({html: 'Error deleting story: ' + error.message});
    }
}

// Clear form fields
function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('storyId').value = '';
}

// Load all stories when the page loads
window.onload = getStories;