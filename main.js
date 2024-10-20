// Get the textbox and output elements
const textbox = document.getElementById('myTextbox');
const textContainer = document.getElementById('textContainer');

// Function to add the text below the textbox
function addText() {
    const newText = textbox.value;
    if (newText) { // Check if there's any input
        const responseText = handleCommand(newText); // Get response from controller
        const textElement = document.createElement('p'); // Create a new paragraph element
        textElement.textContent = responseText; // Set the text content
        textContainer.append(textElement); // Add the text at the bottom
        textbox.value = ''; // Clear the textbox
    }
}

// Add event listener for keypress events
textbox.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addText(); // Call the function when Enter is pressed
    }
});
