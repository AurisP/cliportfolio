const textContainer = document.getElementById('textContainer');
const prompt = document.getElementById('prompt');

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const input = event.target.innerText.trim();
        if (input) {
            const inputElement = event.target;
            inputElement.innerText = '';

            const textElement = document.createElement('p');
            textElement.textContent = `${prompt.textContent} ${input}`;
            textContainer.append(textElement);

            typeOutResponse(handleCommand(input));
        }
    }
}

function typeOutResponse(responseText) {
    let index = 0;
    const typingSpeed = 5;

    function typeCharacter() {
        if (index < responseText.length) {
            const charSpan = document.createElement('span');
            charSpan.textContent = responseText[index];
            textContainer.append(charSpan);
            index++;
            setTimeout(typeCharacter, typingSpeed);
        }
    }
    
    setTimeout(typeCharacter, 10);
}

