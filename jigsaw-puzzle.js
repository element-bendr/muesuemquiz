document.addEventListener('DOMContentLoaded', () => {
    // Initialize the jigsaw puzzle
    const jigsawPuzzle = new JigsawPuzzle();
    jigsawPuzzle.initialize();
});

class JigsawPuzzle {
    constructor() {
        this.pieces = [
            { id: 0, animal: 'peacock', connects: [1] },
            { id: 1, animal: 'snake', connects: [0, 2] },
            { id: 2, animal: 'bull', connects: [1, 3] },
            { id: 3, animal: 'elephant', connects: [2, 4] },
            { id: 4, animal: 'human-hand', connects: [3, 5, 6] },
            { id: 5, animal: 'deer', connects: [4] },
            { id: 6, animal: 'tiger', connects: [4] }
        ];
        
        this.placedPieces = [];
        this.connections = [];
        this.hintsRemaining = 2;
        this.puzzleScore = 0;
        this.timeLeft = 50; // Increased from 25 to 50 seconds
        this.timerInterval = null;
        
        // DOM elements
        this.piecesContainer = document.querySelector('.jigsaw-pieces');
        this.puzzleBoard = document.querySelector('.jigsaw-board');
        this.puzzleTimer = document.getElementById('puzzle-time');
        this.resetButton = document.getElementById('reset-puzzle');
        this.hintButton = document.getElementById('hint-btn');
    }
    
    initialize() {
        // Generate puzzle pieces
        this.generatePieces();
        
        // Start the timer
        this.startTimer();
        
        // Add event listeners
        this.resetButton.addEventListener('click', () => this.resetPuzzle());
        this.hintButton.addEventListener('click', () => this.provideHint());
        
        // Enable hint button after 10 seconds
        setTimeout(() => {
            this.hintButton.removeAttribute('disabled');
            this.hintButton.classList.add('available');
        }, 10000);
    }
    
    generatePieces() {
        // First shuffle the pieces (except their IDs and connections)
        this.shufflePieces();
        
        // Create DOM elements for each piece
        this.pieces.forEach(piece => {
            const pieceElement = document.createElement('div');
            pieceElement.className = 'jigsaw-piece';
            pieceElement.setAttribute('data-id', piece.id);
            pieceElement.setAttribute('data-animal', piece.animal);
            pieceElement.draggable = true;
            
            const img = document.createElement('img');
            img.src = `images/navagunjara-parts/${piece.animal}.png`;
            img.alt = `${piece.animal} part`;
            pieceElement.appendChild(img);
            
            // Add event listeners for drag and drop
            pieceElement.addEventListener('dragstart', (e) => this.handleDragStart(e, piece));
            pieceElement.addEventListener('dragend', () => this.handleDragEnd());
            
            this.piecesContainer.appendChild(pieceElement);
        });
        
        // Set up the puzzle board for dropping
        this.puzzleBoard.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.puzzleBoard.addEventListener('drop', (e) => this.handleDrop(e));
    }
    
    shufflePieces() {
        // Shuffle the pieces array
        for (let i = this.pieces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.pieces[i], this.pieces[j]] = [this.pieces[j], this.pieces[i]];
        }
    }
    
    handleDragStart(e, piece) {
        const pieceElement = e.target.closest('.jigsaw-piece');
        pieceElement.classList.add('dragging');
        e.dataTransfer.setData('text/plain', piece.id);
    }
    
    handleDragEnd() {
        document.querySelectorAll('.jigsaw-piece').forEach(piece => {
            piece.classList.remove('dragging');
        });
    }
    
    handleDragOver(e) {
        e.preventDefault(); // Allow drop
    }
    
    handleDrop(e) {
        e.preventDefault();
        const pieceId = parseInt(e.dataTransfer.getData('text/plain'));
        const piece = this.pieces.find(p => p.id === pieceId);
        const pieceElement = document.querySelector(`.jigsaw-piece[data-id="${pieceId}"]`);
        
        // If piece is already placed, do nothing
        if (pieceElement.classList.contains('placed')) return;
        
        const boardRect = this.puzzleBoard.getBoundingClientRect();
        const x = e.clientX - boardRect.left;
        const y = e.clientY - boardRect.top;
        
        // Check if piece can connect to any already placed pieces
        let canConnect = false;
        let connectedPieceId = null;
        
        if (this.placedPieces.length === 0) {
            // First piece can be placed anywhere
            canConnect = true;
        } else {
            // Check connections with already placed pieces
            for (const placedPieceId of this.placedPieces) {
                if (piece.connects.includes(placedPieceId)) {
                    canConnect = true;
                    connectedPieceId = placedPieceId;
                    break;
                }
            }
        }
        
        if (canConnect) {
            // Add to placed pieces
            this.placedPieces.push(piece.id);
            
            // Mark as placed and correct
            pieceElement.classList.add('placed', 'correct');
            
            // Position correctly based on piece id
            pieceElement.classList.add(`piece-position-${piece.id}`);
            
            // Move to board
            this.puzzleBoard.appendChild(pieceElement);
            
            // Create visual connection if connected to another piece
            if (connectedPieceId !== null) {
                this.createConnection(piece.id, connectedPieceId);
            }
            
            // Flash success
            this.flashSuccess(pieceElement);
            
            // Check if puzzle is complete
            this.checkCompletion();
        } else {
            // Return to pieces container with a shake animation
            pieceElement.classList.add('shake');
            setTimeout(() => {
                pieceElement.classList.remove('shake');
            }, 500);
        }
    }
    
    createConnection(pieceId1, pieceId2) {
        const piece1 = document.querySelector(`.jigsaw-piece[data-id="${pieceId1}"]`);
        const piece2 = document.querySelector(`.jigsaw-piece[data-id="${pieceId2}"]`);
        
        const rect1 = piece1.getBoundingClientRect();
        const rect2 = piece2.getBoundingClientRect();
        const boardRect = this.puzzleBoard.getBoundingClientRect();
        
        // Calculate center points relative to board
        const center1 = {
            x: (rect1.left + rect1.right) / 2 - boardRect.left,
            y: (rect1.top + rect1.bottom) / 2 - boardRect.top
        };
        
        const center2 = {
            x: (rect2.left + rect2.right) / 2 - boardRect.left,
            y: (rect2.top + rect2.bottom) / 2 - boardRect.top
        };
        
        // Create connection element
        const connection = document.createElement('div');
        connection.className = 'jigsaw-connection';
        
        // Set position and dimensions
        const angle = Math.atan2(center2.y - center1.y, center2.x - center1.x);
        const length = Math.sqrt(Math.pow(center2.x - center1.x, 2) + Math.pow(center2.y - center1.y, 2));
        
        connection.style.width = `${length}px`;
        connection.style.height = '6px';
        connection.style.left = `${center1.x}px`;
        connection.style.top = `${center1.y}px`;
        connection.style.transformOrigin = '0 50%';
        connection.style.transform = `rotate(${angle}rad)`;
        
        this.puzzleBoard.appendChild(connection);
        this.connections.push(connection);
    }
    
    checkCompletion() {
        // Check if all pieces are placed
        if (this.placedPieces.length === this.pieces.length) {
            // Stop timer
            this.stopTimer();
            
            // Calculate score based on time left
            const timeBonus = Math.min(2, Math.floor(this.timeLeft / 10));
            this.puzzleScore = 1 + timeBonus;
            
            // Show success message
            this.showSuccessMessage();
        }
    }
    
    flashSuccess(element) {
        element.style.boxShadow = '0 0 15px #4caf50';
        setTimeout(() => {
            element.style.boxShadow = '';
        }, 500);
    }
    
    showSuccessMessage() {
        // Hide the outline
        const outlineElement = document.querySelector('.puzzle-outline');
        if (outlineElement) {
            outlineElement.classList.add('hidden');
        }
        
        // Show only the complete image without popup message
        const completeImage = document.createElement('div');
        completeImage.className = 'complete-navagunjara';
        this.puzzleBoard.appendChild(completeImage);
        
        // Calculate score based on time left
        const timeBonus = Math.min(2, Math.floor(this.timeLeft / 10));
        this.puzzleScore = 1 + timeBonus;
        
        console.log(`Puzzle completed with ${this.timeLeft}s left. Score: ${this.puzzleScore}`);
        
        // Automatically proceed after 5 seconds
        setTimeout(() => {
            // If this was being called from a parent quiz game, we would trigger next question here
            console.log("Puzzle complete - would proceed to next question");
        }, 5000);
    }
    
    resetPuzzle() {
        // Remove all placed pieces and connections
        const placedPieces = document.querySelectorAll('.jigsaw-piece.placed');
        placedPieces.forEach(piece => {
            piece.classList.remove('placed', 'correct');
            piece.classList.remove('piece-position-0', 'piece-position-1', 'piece-position-2', 
                                  'piece-position-3', 'piece-position-4', 'piece-position-5', 
                                  'piece-position-6');
            this.piecesContainer.appendChild(piece);
        });
        
        // Remove connections
        this.connections.forEach(connection => connection.remove());
        this.connections = [];
        
        // Remove complete image if it exists
        const completeImage = document.querySelector('.complete-navagunjara');
        if (completeImage) completeImage.remove();
        
        // Make the outline visible again
        const outlineElement = document.querySelector('.puzzle-outline');
        if (outlineElement) {
            outlineElement.classList.remove('hidden');
        }
        
        // Reset placed pieces array
        this.placedPieces = [];
        
        // Reset and restart timer
        this.resetTimer();
        
        // Remove any success message
        const successMessage = document.querySelector('.puzzle-success');
        if (successMessage) successMessage.remove();
    }
    
    provideHint() {
        if (this.hintsRemaining <= 0) return;
        
        this.hintsRemaining--;
        this.hintButton.textContent = `Hint (${this.hintsRemaining})`;
        
        if (this.hintsRemaining <= 0) {
            this.hintButton.setAttribute('disabled', 'disabled');
            this.hintButton.classList.remove('available');
        }
        
        // Find an unplaced piece that can connect to a placed piece
        const unplacedPieces = this.pieces.filter(p => !this.placedPieces.includes(p.id));
        
        if (unplacedPieces.length === 0) return;
        
        let hintPiece = null;
        let connectingPiece = null;
        
        if (this.placedPieces.length === 0) {
            // If no pieces placed, highlight the peacock (starting piece)
            hintPiece = this.pieces.find(p => p.animal === 'peacock');
        } else {
            // Find a piece that connects to an already placed piece
            for (const unplaced of unplacedPieces) {
                for (const placedId of this.placedPieces) {
                    if (unplaced.connects.includes(placedId)) {
                        hintPiece = unplaced;
                        connectingPiece = this.pieces.find(p => p.id === placedId);
                        break;
                    }
                }
                if (hintPiece) break;
            }
            
            // If no connections found, just highlight any unplaced piece
            if (!hintPiece) {
                hintPiece = unplacedPieces[0];
            }
        }
        
        // Highlight the hint piece
        const hintElement = document.querySelector(`.jigsaw-piece[data-id="${hintPiece.id}"]`);
        hintElement.classList.add('hint-highlight');
        
        // If there's a connecting piece, highlight it too and show a connection
        if (connectingPiece) {
            const connectingElement = document.querySelector(`.jigsaw-piece[data-id="${connectingPiece.id}"]`);
            connectingElement.classList.add('hint-highlight');
            
            // Show a visual hint connection
            if (connectingElement.classList.contains('placed')) {
                this.showHintConnection(hintPiece.id, connectingPiece.id);
            }
        }
        
        // Remove hint highlights after 2 seconds
        setTimeout(() => {
            document.querySelectorAll('.hint-highlight').forEach(el => {
                el.classList.remove('hint-highlight');
            });
            
            document.querySelectorAll('.hint-connection').forEach(el => {
                el.remove();
            });
        }, 2000);
    }
    
    showHintConnection(pieceId1, pieceId2) {
        const piece1 = document.querySelector(`.jigsaw-piece[data-id="${pieceId1}"]`);
        const piece2 = document.querySelector(`.jigsaw-piece[data-id="${pieceId2}"]`);
        
        if (!piece1 || !piece2) return;
        
        const rect1 = piece1.getBoundingClientRect();
        const boardRect = this.puzzleBoard.getBoundingClientRect();
        
        // For unplaced pieces, use the piecesContainer
        const piecesContainerRect = this.piecesContainer.getBoundingClientRect();
        
        // Calculate center points
        const center1 = {
            x: (rect1.left + rect1.right) / 2 - piecesContainerRect.left,
            y: (rect1.top + rect1.bottom) / 2 - piecesContainerRect.top
        };
        
        // Use position class to find where piece2 should be
        const targetPos = document.querySelector(`.piece-position-${pieceId2}`);
        const targetRect = targetPos ? targetPos.getBoundingClientRect() : 
                                     document.querySelector(`.piece-position-0`).getBoundingClientRect();
        
        const center2 = {
            x: (targetRect.left + targetRect.right) / 2 - boardRect.left,
            y: (targetRect.top + targetRect.bottom) / 2 - boardRect.top
        };
        
        // Create hint connection
        const connection = document.createElement('div');
        connection.className = 'hint-connection';
        
        // Position between piece and board
        const startX = center1.x;
        const startY = center1.y;
        const endX = center2.x + boardRect.left - piecesContainerRect.left;
        const endY = center2.y + boardRect.top - piecesContainerRect.top;
        
        connection.style.position = 'absolute';
        connection.style.width = '8px';
        connection.style.height = `${Math.sqrt(Math.pow(endY - startY, 2) + Math.pow(endX - startX, 2))}px`;
        connection.style.left = `${startX}px`;
        connection.style.top = `${startY}px`;
        connection.style.transformOrigin = 'top left';
        connection.style.transform = `rotate(${Math.atan2(endY - startY, endX - startX)}rad)`;
        
        this.piecesContainer.appendChild(connection);
    }
    
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 5) {
                this.puzzleTimer.style.color = '#d32f2f';
            }
            
            if (this.timeLeft <= 0) {
                this.stopTimer();
                this.handleTimeout();
            }
        }, 1000);
    }
    
    stopTimer() {
        clearInterval(this.timerInterval);
    }
    
    resetTimer() {
        this.stopTimer();
        this.timeLeft = 50; // Increased from 25 to 50 seconds
        this.updateTimerDisplay();
        this.puzzleTimer.style.color = '';
        this.startTimer();
    }
    
    updateTimerDisplay() {
        this.puzzleTimer.textContent = this.timeLeft;
    }
    
    handleTimeout() {
        // Calculate partial score based on placed pieces
        this.puzzleScore = Math.floor(this.placedPieces.length / this.pieces.length);
        
        // Show timeout message
        const timeoutMessage = document.createElement('div');
        timeoutMessage.className = 'puzzle-timeout';
        timeoutMessage.innerHTML = `
            <h3>Time's Up!</h3>
            <p>You placed ${this.placedPieces.length} out of ${this.pieces.length} parts correctly</p>
        `;
        document.querySelector('.puzzle-container').appendChild(timeoutMessage);
    }
}
