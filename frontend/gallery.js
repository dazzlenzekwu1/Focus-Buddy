// This script handles fetching and displaying the fridge gallery images.

window.addEventListener('load', async () => {
    console.log('Gallery.js loaded');
    
    // Get the userId from the URL query parameter
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    console.log('User ID from URL:', userId);

    const galleryContainer = document.getElementById('fridge-magnets-grid');
    console.log('Gallery container found:', !!galleryContainer);

    if (!galleryContainer) {
        console.error('Gallery container not found.');
        return;
    }

    if (!userId) {
        console.error('User ID not found in URL.');
        galleryContainer.innerHTML = '<p class="text-red-500 text-center text-lg mt-10">Invalid URL. Please go to the home page and try again.</p>';
        return;
    }

    try {
        console.log('Fetching rewards for user:', userId);
        const response = await fetch(`/api/getRewards?userId=${userId}`);
        console.log('API response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API error response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const data = await response.json();
        console.log('API response data:', data);
        
        const rewards = data.rewards || [];
        console.log('Rewards array:', rewards);

        if (rewards.length === 0) {
            console.log('No rewards found, showing empty message');
            galleryContainer.innerHTML = '<p class="text-white text-center text-lg mt-10">Your fridge is empty! Complete a focus session to pin your first drawing.</p>';
            return;
        }

        console.log('Displaying', rewards.length, 'rewards');
        rewards.forEach((reward, index) => {
            console.log(`Creating image for reward ${index}:`, reward);
            
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('w-full', 'aspect-square', 'overflow-hidden', 'rounded-xl');
            
            const imgElement = document.createElement('img');
            imgElement.src = reward.asset_path;
            imgElement.alt = 'Completed coloring page reward';
            imgElement.classList.add('w-full', 'h-full', 'object-cover', 'transform', 'hover:scale-105', 'transition-transform', 'duration-300');

            imgContainer.appendChild(imgElement);
            galleryContainer.appendChild(imgContainer);
        });

    } catch (error) {
        console.error('Failed to fetch rewards:', error);
        galleryContainer.innerHTML = '<p class="text-red-500 text-center text-lg mt-10">Failed to load the fridge gallery. Please try again later. Error: ' + error.message + '</p>';
    }
});

