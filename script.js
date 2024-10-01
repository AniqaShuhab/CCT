// Function to fetch and display words based on selected letter
function fetchGlossaryWords(letter) {
    const wordListContainer = document.getElementById('word-list');
    wordListContainer.innerHTML = 'Loading...'; // Show loading message
  
    // Fetch the document for the selected letter from Firebase
    db.collection('glossary').doc(letter).get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const words = data.words; // Array of words
  
        // Clear and populate the word list
        wordListContainer.innerHTML = ''; // Clear previous words
        words.forEach(word => {
          const wordElement = document.createElement('div');
          wordElement.className = 'word-item';
          wordElement.textContent = word;
          wordListContainer.appendChild(wordElement);
        });
      } else {
        wordListContainer.innerHTML = 'No words found for this letter.';
      }
    }).catch((error) => {
      console.error("Error fetching document:", error);
      wordListContainer.innerHTML = 'Error loading words. Please try again later.';
    });
  }
  
  // Event listener to switch between alphabet buttons
  document.querySelectorAll('.alphabet').forEach(btn => {
    btn.addEventListener('click', (event) => {
      const letter = event.target.getAttribute('data-letter');
      fetchGlossaryWords(letter);
    });
  });
  
  // Load words for the first letter (e.g., A) on page load
  document.addEventListener('DOMContentLoaded', () => {
    fetchGlossaryWords('A'); // Automatically load words for "A" initially
  });

  /*--------------------------------------------------------------
# Alrt
--------------------------------------------------------------*/

  // Get all the cards
// const card1 = document.getElementById('card1');
// const card2 = document.getElementById('card2');
// const card3 = document.getElementById('card3');

// // Add event listeners to each card
// card1.addEventListener('mouseover', function() {
//   alert('Aari: Aari is a handheld wood saw used for cutting wood. Aara is the machine tool used for cutting wood into panels or beams.');
// });

// card2.addEventListener('mouseover', function() {
//   alert('Andaaza: Approximation used by experienced masons by assessing quality, texture, weight, and sound.');
// });

// card3.addEventListener('mouseover', function() {
//   alert('Balay: Main beam support is known as balay. The beam is wider in width than the column beneath it.');
// });


/*--------------------------------------------------------------
# Archive service
--------------------------------------------------------------*/ 

// Fetch data from Firebase and populate the archive page dynamically
async function fetchServices() {
    try {
        // Fetch data from Firestore
        const servicesSnapshot = await db.collection('services').get();
        const servicesList = servicesSnapshot.docs.map(doc => doc.data());

        // Populate services and subcategories dynamically
        const servicesContainer = document.getElementById('services-list');
        const fileDetailsContainer = document.getElementById('file-details');
        servicesContainer.innerHTML = '';  // Clear the container before populating

        servicesList.forEach(service => {
            // Create service link
            const serviceLink = document.createElement('a');
            serviceLink.href = '#';
            serviceLink.classList.add('list-group-item', 'list-group-item-action');
            serviceLink.innerHTML = `<i class="bi bi-folder"></i> ${service.name}`;

            // Append the service link to the container
            servicesContainer.appendChild(serviceLink);

            // Create subcategories div
            const subList = document.createElement('div');
            subList.classList.add('sub-list');
            subList.style.display = 'none';  // Initially hidden

            // Add subcategories
            service.subcategories.forEach(subcategory => {
                const subLink = document.createElement('a');
                subLink.href = '#';
                subLink.innerHTML = `<i class="bi bi-file-earmark"></i> ${subcategory.name}`;
                subLink.classList.add('list-group-item');

                // On clicking a subcategory, show related files
                subLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    displayFileDetails(subcategory.files);
                });

                subList.appendChild(subLink);
            });

            // Toggle subcategories on clicking the main service link
            serviceLink.addEventListener('click', (event) => {
                event.preventDefault();
                subList.style.display = subList.style.display === 'block' ? 'none' : 'block';
            });

            // Append subcategories to the services container
            servicesContainer.appendChild(subList);
        });

    } catch (error) {
        console.error('Error fetching services:', error);
    }
}

// Display file details when a subcategory is clicked
function displayFileDetails(files) {
    const fileDetailsContainer = document.getElementById('file-details');
    fileDetailsContainer.innerHTML = '';  // Clear previous files

    files.forEach(file => {
        const fileDiv = document.createElement('div');
        fileDiv.innerHTML = `<i class="bi bi-file-earmark-text"></i> ${file.name}`;
        fileDetailsContainer.appendChild(fileDiv);
    });
}

// Fetch services and populate the page when the document is ready
document.addEventListener('DOMContentLoaded', fetchServices);




