// JavaScript to toggle the mobile menu
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// SLIDES

let currentSlide = 0;
        const slides = document.querySelectorAll('[data-slide]');
        const dots = document.querySelectorAll('[data-dot]');

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('opacity-0', i !== index);
                slide.classList.toggle('opacity-100', i === index);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('opacity-50', i !== index);
                dot.classList.toggle('opacity-100', i === index);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        // Arrow Navigation
        document.getElementById('next').addEventListener('click', nextSlide);
        document.getElementById('prev').addEventListener('click', prevSlide);

        // Dot Navigation
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentSlide = i;
                showSlide(currentSlide);
            });
        });

        // Auto Slide Change every 5 seconds
        setInterval(nextSlide, 5000);

        // Initial display
        showSlide(currentSlide);







        // JavaScript to handle modal display
        const loginButton = document.getElementById('login-button');
        const loginModal = document.getElementById('Login-modal');
        const closeModal = document.getElementById('close-modal');

        // Show modal when Sign In button is clicked
        loginButton.addEventListener('click', () => {
            loginModal.classList.remove('hidden');
        });

        // Hide modal when Close button (X) is clicked
        closeModal.addEventListener('click', () => {
            loginModal.classList.add('hidden');
        });

        // Handle form submission
        document.getElementById('signin-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username && password) {
                alert('Sign In Successful!');
                // Add further logic here (e.g., redirect or send data to a server)
            } else {
                alert('Please fill in all fields.');
            }
        });

    //  product card hover effect
    
    // Function to expand the card
    function expandCard(card) {
        card.classList.add("h-auto", "pb-4"); // Add classes to expand the card
    }

    // Function to shrink the card
    function shrinkCard(card) {
        card.classList.remove("h-auto", "pb-4"); // Remove classes to shrink the card
    }


    
    // Function to update the quantity and total price
    function updateQuantity(button, change) {
        // Find the parent product card
        let card = button.closest('.relative'); // Adjust the selector to match your card's class/structure

        // Get elements within the same card
        let quantityElement = card.querySelector('.quantity'); // Quantity element
        let totalPriceElement = card.querySelector('.totalPrice'); // Total price element
        let priceText = card.querySelector('.amount').textContent; // Price text

        // Extract the price value
        let pricePerItem = parseFloat(priceText.replace("₦", ""));

        // Update quantity
        let quantity = parseInt(quantityElement.textContent);
        quantity = Math.max(1, quantity + change); // Ensure quantity doesn't go below 1
        quantityElement.textContent = quantity;

        // Calculate and update the total price
        let totalPrice = (quantity * pricePerItem).toFixed(2);
        totalPriceElement.textContent = `₦${totalPrice}`;
    }

    //  JavaScript for Auto-Scrolling 
  
    const reviewContainer = document.getElementById('reviewContainer');
    const scrollSpeed = 2; // Adjust speed (pixels per interval)

    function autoScroll() {
      reviewContainer.scrollBy({
        left: scrollSpeed,
        behavior: 'smooth'
      });

      // Reset scroll position when reaching the end
      if (reviewContainer.scrollLeft + reviewContainer.clientWidth >= reviewContainer.scrollWidth) {
        reviewContainer.scrollTo({
          left: 0,
          behavior: 'auto'
        });
      }
    }

    setInterval(autoScroll, 50); // Adjust interval for smoother/faster scrolling
 
