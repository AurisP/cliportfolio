function handleCommand(command) {
    const [cmd, arg] = command.split(' ');

    switch (cmd.toLowerCase()) {
        case 'help':
            return 'Available commands: help, exit, ls, cd <directory>, about, skills, experience, projects, contact';
        case 'exit':
            return 'Goodbye!';
        case 'ls':
            return ls();
        case 'cd':
            return cd(arg);
        case 'cat':
            return cat(arg);
        default:
            return `Unknown command: "${command}". Type 'help' for a list of available commands.`;
    }
}

let currentPath = '/';

const fileSystem = {
    '/': {
        type: 'directory',
        contents: {
            'portfolio': {
                type: 'directory',
                contents: {
                    'projects': {
                        type: 'directory',
                        contents: {
                            'project1': { type: 'file', content: 'This is some project 1' },
                            'project2': { type: 'file', content: 'This is some project 2' },
                        }
                    },
                    'about.txt': { type: 'file', content: 'This is some text about me' },
                    'skills.txt': { type: 'file', content: 'Text about skills' }
                }
            },
            'resume.pdf': { type: 'file', content: 'My resume.' },
        }
    }
};

function getCurrentDirectoryName() {
    return currentPath === '/' ? 'home' : currentPath.split('/').pop();
}

function displayPrompt() {
    const promptElement = document.querySelector('.prompt');
    const displayPath = currentPath === '/' ? '/' : currentPath.replace('/', '');
    promptElement.textContent = `${displayPath}>`;
}

function ls() {
    const currentDir = getCurrentDirectory();

    if (currentDir && currentDir.type === 'directory') {
        return Object.keys(currentDir.contents).join('\n');
    } else {
        return 'Not a directory.';
    }
}

function cd(directory) {
    const currentDir = getCurrentDirectory();

    if (directory === '..') {
        const parentPath = currentPath.split('/').slice(0, -1).join('/');
        currentPath = parentPath === '' ? '/' : parentPath;
        displayPrompt();
        return `Changed directory to ${currentPath}`;
    }

    if (currentDir && currentDir.type === 'directory' && currentDir.contents[directory]) {
        if (currentDir.contents[directory].type === 'directory') {
            currentPath += (currentPath === '/' ? '' : '/') + directory;
            displayPrompt();
            return `Changed directory to ${currentPath}`;
        } else {
            return `${directory} is not a directory.`;
        }
    } else {
        return `No such directory: ${directory}`;
    }
}

function getCurrentDirectory() {
    const pathParts = currentPath.split('/').filter(part => part);
    let currentDir = fileSystem['/'];

    for (const part of pathParts) {
        if (currentDir.contents[part]) {
            currentDir = currentDir.contents[part];
        } else {
            return null;
        }
    }
    return currentDir;
}

function cat(filename) {
    const currentDir = getCurrentDirectory();

    if (currentDir && currentDir.type === 'directory') {
        if (currentDir.contents[filename]) {
            const file = currentDir.contents[filename];
            if (file.type === 'file') {
                return file.content;
            } else {
                return `${filename} is not a file.`;
            }
        } else {
            return `No such file: ${filename}`;
        }
    } else {
        return 'Not a directory.';
    }
}

displayPrompt();
