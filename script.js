const productContainer = document.getElementById('productContainer');
const apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';

function fetchProducts() {
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => data.categories)
        .catch(error => console.error('Error fetching categories:', error));
}

function showProducts(category) {
    const lowerCaseCategory = category.toLowerCase(); // Convert to lowercase
    fetchProducts()
        .then(categories => {
            const selectedCategory = categories.find(cat => cat.category_name.toLowerCase() === lowerCaseCategory);

            if (selectedCategory) {
                const products = selectedCategory.category_products;
                renderProducts(products);
            } else {
                console.error(`No products found for category: ${category}`);
            }
        });
}

function renderProducts(products) {
    productContainer.innerHTML = ''; // Clear previous products

    products.forEach(product => {
        const discount = calculateDiscount(product.price, product.compare_at_price);
        const productCard = createProductCard(product, discount);
        productContainer.appendChild(productCard);
    });
}

function calculateDiscount(price, compareAtPrice) {
    const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
    return Math.round(discount);
}

function createProductCard(product, discount) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    const productImageContainer = document.createElement('div');
    productImageContainer.className = 'product-image-container';

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;
    productImage.className = 'product-image';

    const badgeText = product.badge_text; // Assuming badge_text is a property in the product object
   
    if (badgeText!='null') {
        const badge = document.createElement('div');
        badge.innerText = badgeText;
        badge.className = 'badge';
        productImageContainer.appendChild(badge);
    }

    productImageContainer.appendChild(productImage);

    const title = document.createElement('p');
    title.innerText = product.title;
    title.style.fontSize = '15px';
    title.className='titleName'

    const vendor = document.createElement('li');
    vendor.innerText = `${product.vendor}`;
    vendor.className = 'pName';
    vendor.style.fontSize = '14px';

    const price = document.createElement('p');
    price.innerText = `$${product.price}`;
    price.style.fontSize = '13px';
    price.style.fontWeight = 'bold';

    const compareAtPrice = document.createElement('del');
    compareAtPrice.innerText = `$${product.compare_at_price}`;
    compareAtPrice.style.fontSize = '13px';

    const discountElement = document.createElement('p');
    discountElement.innerText = `${discount}% off`;
    discountElement.style.color = 'red';
    discountElement.style.fontSize = '13px';

    const pCard = document.createElement('div');
    const pCard2 = document.createElement('div');
    pCard.appendChild(title);
    pCard.appendChild(vendor);


    pCard2.appendChild(price);
    pCard2.appendChild(compareAtPrice);
    pCard2.appendChild(discountElement)
    pCard.style.display = 'flex';
   
    pCard.className = 'pCardlist';
    pCard.style.justifyContent='space-around'
    pCard.style.justifyContent='space-around'

    pCard2.style.display='flex'
    pCard2.style.justifyContent='space-around'
   
    productCard.appendChild(productImage);
    productCard.appendChild(pCard);
    productCard.appendChild(pCard2)
   
   

    const addToCartBtn = document.createElement('button');
    addToCartBtn.innerText = 'Add to Cart';
    addToCartBtn.className = 'add-to-cart-btn';

   productCard.appendChild(addToCartBtn)
    return productCard;
}

function toggleButtonColor(button) {
    button.classList.toggle('active');
}

// Initial load
showProducts('Men');
