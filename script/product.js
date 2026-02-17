let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
    const countEl = document.getElementById("cart-count");
    if (!countEl) return;
    countEl.innerText = cart.length;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
    if (!product) return;
    cart.push(product);
    saveCart();
    updateCartCount();
}

updateCartCount();


const loadProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();
    displayProducts(products);
}

const loadProductsCategory = async () => {
    const res = await fetch(`https://fakestoreapi.com/products/categories`);
    const categories = await res.json();
    displayProductsCategory(categories);
}

const loadProductsByCategory = async (category) => {
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const products = await res.json();
    displayProducts(products);
}

const loadProductDetail = async (id) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const details = await res.json();
    displayProductDetail(details);
}


const displayProductDetail = (details) => {
    const detailBox = document.getElementById('details-container');

    detailBox.innerHTML = `
        <div class="flex flex-col gap-4 relative">

            <!-- CLOSE BUTTON -->
            <button id="modal-close-btn" class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold">
                &times;
            </button>

            <div class="flex justify-center">
                <img src="${details.image}" class="h-42 object-contain" />
            </div>

            <span class="badge badge-outline w-fit">${details.category}</span>

            <h3 class="text-lg font-semibold leading-snug">${details.title}</h3>

            <div class="flex items-center gap-2 text-sm">
                <i class="fa-solid fa-star text-yellow-400"></i>
                ${details.rating.rate}
                <span class="text-gray-400">(${details.rating.count})</span>
            </div>

            <p class="text-sm text-gray-600">${details.description}</p>

            <div class="text-xl font-bold">$${details.price}</div>

            <button id="modal-add-to-cart-btn" class="btn btn-primary w-full">
                <i class="fa-solid fa-cart-shopping"></i> Add to cart
            </button>

        </div>
    `;

    const modal = document.getElementById("product_modal");
    modal.showModal();
    document.body.style.overflow = "hidden"; 

    // Add cart from modal
    document.getElementById("modal-add-to-cart-btn").addEventListener("click", () => {
        addToCart(details);
        modal.close();
        document.body.style.overflow = "";
    });

    // Close modal on cross
    document.getElementById("modal-close-btn").addEventListener("click", () => {
        modal.close();
        document.body.style.overflow = "";
    });

    // Close modal if clicked outside
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.close();
            document.body.style.overflow = "";
        }
    });
}


const displayProductsCategory = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = '';

    if (!categories || categories.length === 0) {
        categoryContainer.innerHTML = `<p class="text-center text-gray-500">No categories found.</p>`;
        return;
    }

    const removeActive = () => {
        categoryContainer.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-outline');
        });
    };

    // "All" button
    const allBtn = document.createElement('button');
    allBtn.textContent = 'all';
    allBtn.className = 'btn capitalize rounded-full btn-primary';
    allBtn.addEventListener('click', () => {
        loadProducts();
        removeActive();
        allBtn.classList.add('btn-primary');
        allBtn.classList.remove('btn-outline');
    });
    categoryContainer.appendChild(allBtn);

    // Category buttons
    categories.forEach(c => {
        const btn = document.createElement('button');
        btn.textContent = c;
        btn.className = 'btn capitalize rounded-full btn-outline';
        btn.addEventListener('click', () => {
            loadProductsByCategory(c);
            removeActive();
            btn.classList.add('btn-primary');
            btn.classList.remove('btn-outline');
        });
        categoryContainer.appendChild(btn);
    });

    loadProducts();
}


const displayProducts = (products) => {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';

    if (!products || products.length === 0) {
        productsContainer.innerHTML = '<p class="text-center text-gray-500">No products found.</p>';
        return;
    }

    products.forEach(p => {
        const card = document.createElement('div');
        card.className = "card w-64 m-4 mx-auto bg-white shadow-md rounded-lg overflow-hidden transition duration-300";
        card.innerHTML = `
            <figure class="relative">
                <img src="${p.image}" alt="${p.title}" class="w-full h-64 object-cover" />
            </figure>
            <div class="p-4 flex flex-col gap-2">
                <div class="flex justify-between items-center">
                    <p class="text-sm text-[#4F39F6] border border-[#4F39F6] px-1 py-1 rounded-xl">${p.category}</p>
                    <p class="text-sm flex gap-1 text-center items-center">
                        <i class="fa-solid fa-star text-yellow-400"></i> ${p.rating.rate} (${p.rating.count})
                    </p>
                </div>
                <h3 class="font-base text-sm">${p.title}</h3>
                <p class="text-xl font-bold mt-1">$${p.price}</p>
                <div class="flex justify-between mt-4">
                    <button class="btn btn-outline btn-sm flex-1 mr-2 gap-2" onclick="loadProductDetail(${p.id})">
                        <i class="fa-regular fa-eye"></i> Details
                    </button>
                    <button class="btn btn-primary btn-sm flex-1 ml-2 add-cart-btn">
                        <i class="fa-solid fa-cart-shopping"></i> Add
                    </button>
                </div>
            </div>
        `;

        productsContainer.appendChild(card);

        // Add to cart from card
        card.querySelector(".add-cart-btn").addEventListener("click", () => {
            addToCart(p);
        });
    });
}


loadProductsCategory();
