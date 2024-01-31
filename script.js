function addNote() {
    const noteTitle = document.getElementById('noteTitle').value;
    const noteMessage = document.getElementById('noteMessage').value;

    if (noteTitle || noteMessage) {
        const notesContainer = document.getElementById('notes-container');

        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';

        const noteCardBody = document.createElement('div');
        noteCardBody.className = 'note-card-body';

        const titleElement = document.createElement('div');
        titleElement.className = 'note-title';
        titleElement.textContent = noteTitle;

        const messageElement = document.createElement('div');
        messageElement.className = 'note-message';
        messageElement.textContent = noteMessage;
        
        const noteDeleteIconContainer = document.createElement('div');
        noteDeleteIconContainer.className = 'note-delete-icon-container';

        const noteDeleteIcon = document.createElement('div');
        noteDeleteIcon.className = 'note-delete-icon';
        noteDeleteIcon.textContent = '✖';
        
        noteDeleteIcon.addEventListener('click', function() {
            notesContainer.removeChild(noteCard);
            moveNoteToTrash(noteTitle, noteMessage);
        });

        noteDeleteIconContainer.appendChild(noteDeleteIcon);
        noteCardBody.appendChild(noteDeleteIconContainer);
        
        noteCardBody.appendChild(titleElement);
        noteCardBody.appendChild(messageElement);
        noteCard.appendChild(noteCardBody);

        notesContainer.appendChild(noteCard);
        // Clear input and textarea
        document.getElementById('noteTitle').value = '';
        document.getElementById('noteMessage').value = '';
    }
}

function moveNoteToTrash(title, message) {
    
    const trashContainer = document.getElementById('trash-container');
    // console.log('Trash container:', trashContainer);
    
    if (trashContainer) {
        const trashNote = document.createElement('div');
        trashNote.className = 'trash-note';
        
        const trashNoteBody = document.createElement('div');
        trashNoteBody.className = 'note-card-body';
        
        const titleElement = document.createElement('div');
        titleElement.className = 'note-title';
        titleElement.textContent = title;
        
        const messageElement = document.createElement('div');
        messageElement.className = 'note-message';
        messageElement.textContent = message;
        
        const trashDeleteIcon = document.createElement('div');
        trashDeleteIcon.className = 'note-delete-icon';
        trashDeleteIcon.textContent = '✖';
        
        trashNoteBody.appendChild(titleElement);
        trashNoteBody.appendChild(messageElement);
        trashNoteBody.appendChild(trashDeleteIcon);
        trashNote.appendChild(trashNoteBody);
        
        trashDeleteIcon.addEventListener('click', function() {
        trashContainer.removeChild(trashNote);
    });
    
    // Insert the new trash note at the beginning of the container
    trashContainer.insertBefore(trashNote, trashContainer.firstChild);
} 
else {
    console.error('Trash container not found.');
}
}
function deleteAllNotes() {
    const trashContainer = document.getElementById('trash-container');
    while(trashContainer.firstChild){
        trashContainer.removeChild(trashContainer.firstChild);
    }
}
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.right = sidebar.style.right === '0px' ? '-300px' : '0px';
    // If the sidebar is open, add a click event listener to close it when clicking outside
    if (sidebar.style.right === '0px') {
        const clickOutsideHandler = function(event) {
            if (!sidebar.contains(event.target) && event.target.id !== 'trash-icon') {
                sidebar.style.right = '-300px';
                document.removeEventListener('click', clickOutsideHandler);
            }
        };
        document.addEventListener('click', clickOutsideHandler);
    }
}