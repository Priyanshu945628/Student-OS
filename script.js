async function loadProducts() {
  const container = document.getElementById('products-wrapper');
  
  try {
    // Using global variable from products.js to avoid CORS errors on local file system
    const products = window.productsData;
    
    if (!products) throw new Error('Data not found');
    
    container.innerHTML = ''; // Clear loading message
    
    products.forEach(product => {
      const card = document.createElement('section');
      card.className = 'product-card';
      card.id = product.id;
      
      const featuresHTML = product.features.map(f => `<li>${f}</li>`).join('');
      
      card.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name} Preview">
        </div>
        <h2>${product.name}</h2>
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">${product.description}</p>
        <ul class="features-list">
          ${featuresHTML}
        </ul>
        
        <div id="${product.id}-step-1" class="step-container step-active">
          <a href="${product.youtubeLink}" target="_blank" onclick="unlockDownload('${product.id}')" class="btn btn-primary">Step 1: Subscribe & Unlock</a>
          <p style="font-size: 0.8rem; text-align: center; color: var(--text-secondary);">Subscribe to LearnByCod to unlock the download link.</p>
        </div>
        
        <div id="${product.id}-step-2" class="step-container">
          <a href="${product.downloadLink}" class="btn btn-primary" style="background: linear-gradient(135deg, #22c55e, #10b981);">Step 2: Download Now</a>
          <p style="font-size: 0.8rem; text-align: center; color: #10b981;">Link Unlocked! Thank you for subscribing.</p>
        </div>
      `;
      
      container.appendChild(card);
      
      // Setup animation for the new card
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      
      observer.observe(card);
    });
    
  } catch (error) {
    console.error('Error loading products:', error);
    container.innerHTML = '<div style="color: #ef4444;">Failed to load products. Please check products.json.</div>';
  }
}

function unlockDownload(productId) {
  const step1 = document.getElementById(`${productId}-step-1`);
  const step2 = document.getElementById(`${productId}-step-2`);
  
  if (!step1 || !step2) return;

  // We wait a moment to let the user navigate to YouTube
  setTimeout(() => {
    step1.classList.remove('step-active');
    step2.classList.add('step-active');
    step2.style.animation = 'fadeIn 0.6s ease-out forwards';
  }, 1000);
}

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});
