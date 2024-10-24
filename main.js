const textContainer = document.getElementById('textContainer');
const prompt = document.getElementById('prompt');


function handleKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const input = event.target.innerText.trim();
        if (input) {
            const promptElement = document.getElementById('prompt');
            const textElement = document.createElement('p');

            textElement.innerHTML = `<span class="prompt">${promptElement.textContent}</span> <span class="input">${input}</span>`;
            document.getElementById('textContainer').appendChild(textElement);

            event.target.innerText = '';

            const responseText = handleCommand(input);
            typeOutResponse(responseText);
            displayPrompt();
        }
    }
}

function typeOutResponse(responseText) {
    const textContainer = document.getElementById('textContainer');
    const typingElement = document.createElement('span'); 
    textContainer.appendChild(typingElement); 
    let index = 0;
    const typingSpeed = 5; 

    function typeCharacter() {
        if (index < responseText.length) {
            typingElement.textContent += responseText[index]; 
            index++;
            setTimeout(typeCharacter, typingSpeed); 
        }
    }

    setTimeout(typeCharacter, 10); 
}


