const loadProducts = async () => {
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => displayProducts(json))
}
loadProducts();

const loadProductsCategory = async () => {
    fetch(`https://fakestoreapi.com/products/categories`)
    .then(res => res.json())
    .then(json => displayProductsCategory(json))
}

const displayProductsCategory = async (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = '';

    if (!categories || categories.length === 0) {
        categoryContainer.innerHTML =
        '<p class="text-center text-gray-500">No categories found.</p>';
        return;
    }

    // ✅ Add "All" button first
    const allBtn = document.createElement('button');
    allBtn.className = 'btn btn-outline capitalize rounded-full';
    allBtn.textContent = 'all';

    categoryContainer.appendChild(allBtn);

    // ✅ Category buttons
    categories.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline capitalize rounded-full';
        btn.textContent = c;

        categoryContainer.appendChild(btn);
    });
};



loadProductsCategory();
const displayProducts = async (products) => {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';

    if (products.length === 0) {
        productsContainer.innerHTML = '<p class="text-center text-gray-500">No products found.</p>';
        return;
    }

    products.forEach(p => {
        const card = document.createElement('div');
        card.innerHTML = `
            <div class="card w-60 mx-auto bg-white shadow-md rounded-lg overflow-hidden hover:border-2 border-[#4F39F6] transition duration-300">
                <figure class="relative">
                    <img src="${p.image}" alt="Backpack"
                        class="w-full h-64 object-cover" />
                </figure>
                <div class="p-4 flex flex-col gap-2">
                    <div class="flex justify-between items-center">
                        <p class="text-sm text-[#4F39F6] border border-[#4F39F6] px-3 py-1 rounded-xl">${p.category}<p>
                        <p class="text-sm flex gap-1 text-center items-center">
                            <i class="fa-solid fa-star text-yellow-400"></i> ${p.rating.rate} (${p.rating.count})
                        </p>
                    </div>
                    <h3 class="font-base text-sm">${p.title}</h3>
                    <p class="text-xl font-bold mt-1">$${p.price}</p>
                    <div class="flex justify-between mt-4">
                        <button class="btn btn-outline btn-sm flex-1 mr-2 gap-2">
                            <i class="fa-regular fa-eye"></i> Details
                        </button>
                        <button class="btn btn-primary btn-sm flex-1 ml-2"><i class="fa-solid fa-cart-shopping"></i> Add</button>
                    </div>
                </div>
            </div>
        `;

        productsContainer.appendChild(card);
    })
}