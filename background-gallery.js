class BackgroundGallery {
    constructor() {
        this.images = [];
        this.container = null;
        this.currentIndex = 0;
        this.transitionTime = 8000; // 8 seconds per image
        this.fadeTime = 2000; // 2 second fade transition
        this.animationActive = true;
    }

    initialize() {
        // Create background container
        this.container = document.createElement('div');
        this.container.className = 'gallery-background';
        document.body.insertBefore(this.container, document.body.firstChild);

        // Collect all images from quiz questions
        this.collectImages();

        // Start the animation once images are loaded
        if (this.images.length > 0) {
            this.preloadImages().then(() => {
                this.startAnimation();
            });
        }
    }

    collectImages() {
        // Manually add all quiz artifact images
        const imageURLs = [
            'images/Darshan Dwar Phulkari.jpg',
            'images/Depiction of Ramayana.jpg',
            'images/Navagunjara Patachitra.jpg',
            'images/Hanuman Dancing Mask.png',
            'images/Mumbai Lifestyle.png',
            'images/Jumadi Bhuta Mask.png',
            'images/Tree of Life.png'
        ];
        
        this.images = imageURLs;
        
        // Log images to console for debugging
        console.log("Background gallery images:", this.images);
    }

    preloadImages() {
        const promises = this.images.map(src => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });
        });
        
        return Promise.all(promises);
    }

    startAnimation() {
        // Create the first two image elements (current and next)
        this.createImageElement(0);
        this.createImageElement(1, true);
        
        // Set interval for transitions
        this.interval = setInterval(() => {
            if (!this.animationActive) return;
            
            // Update indexes
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
            const nextIndex = (this.currentIndex + 1) % this.images.length;
            
            // Get elements
            const currentImg = document.querySelector('.gallery-img.active');
            const nextImg = document.querySelector('.gallery-img.next');
            
            // Start transition
            currentImg.classList.remove('active');
            currentImg.classList.add('fade-out');
            nextImg.classList.remove('next');
            nextImg.classList.add('active');
            
            // Create new next image
            this.createImageElement(nextIndex, true);
            
            // Clean up old image after transition
            setTimeout(() => {
                if (currentImg.parentNode) {
                    currentImg.parentNode.removeChild(currentImg);
                }
            }, this.fadeTime);
            
        }, this.transitionTime);
    }

    createImageElement(index, isNext = false) {
        const img = document.createElement('div');
        img.className = isNext ? 'gallery-img next' : 'gallery-img active';
        img.style.backgroundImage = `url('${this.images[index]}')`;
        
        // Add visible border for debugging if needed
        // img.style.border = '2px solid red';
        
        // Random position/scale for subtle variety
        const scale = 1.1 + (Math.random() * 0.2);
        const posX = Math.random() * 10 - 5;
        const posY = Math.random() * 10 - 5;
        
        img.style.transform = `scale(${scale}) translate(${posX}%, ${posY}%)`;
        
        // Log element creation to console
        console.log(`Creating gallery image: ${this.images[index]}`);
        
        this.container.appendChild(img);
        return img;
    }

    pause() {
        this.animationActive = false;
    }

    resume() {
        this.animationActive = true;
    }

    stop() {
        clearInterval(this.interval);
        this.container.innerHTML = '';
    }
}

// Initialize the gallery when document is ready
document.addEventListener('DOMContentLoaded', () => {
    const gallery = new BackgroundGallery();
    gallery.initialize();
    
    // Remove the pause functionality to keep animation running throughout the quiz
    // The animation will now continue during the entire experience
});
