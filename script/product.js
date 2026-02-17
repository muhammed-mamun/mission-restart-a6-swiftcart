const loadProducts = async () => {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => displayProducts(json))
}
// const loadProductsConsole = async () => {
//     fetch('https://fakestoreapi.com/products')
//     .then(res => res.json())
//     .then(json => console.log(json))
// }
// loadProductsConsole()
const loadProductsCategory = async () => {
    fetch(`https://fakestoreapi.com/products/categories`)
        .then(res => res.json())
        .then(json => displayProductsCategory(json))
}

const loadProductsByCategory = async (category) => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .then(json => displayProducts(json))
}

const loadProductDetail = async (id) => {
    const url = `https://fakestoreapi.com/products/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayProductDetail(details);
}

const displayProductDetail = async (details) => {

    const detailBox = document.getElementById('details-container');

    detailBox.innerHTML = `
        <div class="flex flex-col gap-4">

            <div class="flex justify-center">
                <img
                    src="${details.image}"
                    class="h-42 object-contain"
                />
            </div>

            <span class="badge badge-outline w-fit">
                ${details.category}
            </span>

            <h3 class="text-lg font-semibold leading-snug">
                ${details.title}
            </h3>

            <div class="flex items-center gap-2 text-sm">
                <i class="fa-solid fa-star text-yellow-400"></i>
                ${details.rating.rate}
                <span class="text-gray-400">
                    (${details.rating.count})
                </span>
            </div>

            <p class="text-sm text-gray-600">
                ${details.description}
            </p>

            <div class="text-xl font-bold">
                $${details.price}
            </div>

            <button class="btn btn-primary w-full">
                <i class="fa-solid fa-cart-shopping"></i>
                Add to cart
            </button>

        </div>
    `;

    document.getElementById("product_modal").showModal();
};


const displayProductsCategory = async (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = '';

    if (!categories || categories.length === 0) {
        categoryContainer.innerHTML = `
        <p class="text-center text-gray-500">No categories found.</p>
        `;
        return;
    }

    const removeActive = () => {
        categoryContainer.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('active');
            btn.classList.add('btn-outline');
            btn.classList.add('border-black');
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
        btn.className = 'btn capitalize rounded-full ';
        // safe click handler
        btn.addEventListener('click', () => {
            loadProductsByCategory(c);
            removeActive();
            btn.classList.add('btn-primary'),
                btn.classList.remove('btn-outline');
        });
        categoryContainer.appendChild(btn);
    });
    loadProducts();

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
            <div class="card w-60 mx-auto bg-white shadow-md rounded-lg overflow-hidden transition duration-300">
                <figure class="relative">
                    <img src="${p.image}" alt="Backpack"
                        class="w-full h-64 object-cover" />
                </figure>
                <div class="p-4 flex flex-col gap-2">
                    <div class="flex justify-between items-center">
                        <p class="text-sm text-[#4F39F6] border border-[#4F39F6] px-1 py-1 rounded-xl">${p.category}<p>
                        <p class="text-sm flex gap-1 text-center items-center">
                            <i class="fa-solid fa-star text-yellow-400"></i> ${p.rating.rate} (${p.rating.count})
                        </p>
                    </div>
                    <h3 class="font-base text-sm">${p.title}</h3>
                    <p class="text-xl font-bold mt-1">$${p.price}</p>
                    <div class="flex justify-between mt-4">
                        <button onclick=loadProductDetail(${p.id}) class="btn btn-outline btn-sm flex-1 mr-2 gap-2">
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

const openProductModal = () => {
    const modal = document.getElementById("product_modal");
    modal.showModal();

    // stop background scrolling
    document.body.style.overflow = "hidden";
}

const closeProductModal = () => {
    const modal = document.getElementById("product_modal");
    modal.close();

    // enable scroll again
    document.body.style.overflow = "";
}
