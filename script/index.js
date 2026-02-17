const loadProducts = async () => {
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => displayTredingProducts(json))
}
loadProducts();
const displayTredingProducts = async (products) => {
    const trendingProductsContainer = document.getElementById('trending-products-container');
    trendingProductsContainer.innerHTML = '';

    if (products.length === 0) {
        trendingProductsContainer.innerHTML = '<p class="text-center text-gray-500">No products found.</p>';
        return;
    }

    const topRatedProducts = products.sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 3);
    console.log(topRatedProducts);
    topRatedProducts.forEach(p => {
        console.log(p);
        const card = document.createElement('div');
        card.innerHTML = `
         <div class="card w-80 bg-white shadow-md rounded-lg overflow-hidden">
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
                    <h3 class="font-semibold text-sm mt-1">${p.title}</h3>
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

        trendingProductsContainer.appendChild(card);
    });
}