// Function to handle commands
function handleCommand(command) {
    switch (command.toLowerCase()) {
        case 'help':
            return 'Available commands: help, exit'; // Response for "help"
        case 'exit':
            return 'Goodbye!'; // Response for "exit"
        default:
            return `Unknown command: "${command}"`; // Response for unknown commands
    }
}
