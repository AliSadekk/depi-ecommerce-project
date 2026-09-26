const API_URL = "https://dummyjson.com/products";

const categoryList = document.getElementById("category-list");
const topRatedProducts = document.getElementById("top-rated-products");
const bestSellerProducts = document.getElementById("best-seller-products");


// =========================
// Create Product Card
// =========================

function createProductCard(product) {
    return `
        <a
            href="product-details.html?id=${product.id}"
            class="product-card"
            aria-label="View ${product.title} details"
        >

            <img
                src="${product.thumbnail}"
                alt="${product.title}"
                loading="lazy"
            >

            <div class="product-info">

                <h3>${product.title}</h3>

                <p class="product-price">
                    $${Number(product.price).toFixed(2)}
                </p>

            </div>

        </a>
    `;
}


// =========================
// Load Categories
// =========================

async function loadCategories() {

    try {

        const response = await fetch(`${API_URL}/categories`);

        if (!response.ok) {
            throw new Error("Failed to load categories");
        }

        const categories = await response.json();

        categoryList.innerHTML = categories
            .slice(0, 8)
            .map(category => `
                <a
                    href="products.html?category=${encodeURIComponent(category.slug)}"
                    class="category-card"
                >
                    <h3>${category.name}</h3>
                </a>
            `)
            .join("");

    } catch (error) {

        categoryList.innerHTML = `
            <p>Unable to load categories.</p>
        `;

        console.error(error);
    }
}


// =========================
// Load Top Rated Products
// =========================

async function loadTopRatedProducts() {

    try {

        const response = await fetch(
            `${API_URL}?limit=8&sortBy=rating&order=desc`
        );

        if (!response.ok) {
            throw new Error("Failed to load top rated products");
        }

        const data = await response.json();

        topRatedProducts.innerHTML = data.products
            .map(createProductCard)
            .join("");

    } catch (error) {

        topRatedProducts.innerHTML = `
            <p>Unable to load products.</p>
        `;

        console.error(error);
    }
}


// =========================
// Load Best Sellers
// =========================

async function loadBestSellers() {

    try {

        const response = await fetch(
            `${API_URL}?limit=8&sortBy=stock&order=asc`
        );

        if (!response.ok) {
            throw new Error("Failed to load best sellers");
        }

        const data = await response.json();

        bestSellerProducts.innerHTML = data.products
            .map(createProductCard)
            .join("");

    } catch (error) {

        bestSellerProducts.innerHTML = `
            <p>Unable to load products.</p>
        `;

        console.error(error);
    }
}


// =========================
// Shop Now
// =========================

const shopNowButton = document.getElementById("shop-now");

if (shopNowButton) {

    shopNowButton.addEventListener("click", () => {
        window.location.href = "products.html";
    });

}


// =========================
// Shop Deals
// =========================

const dealsButton = document.getElementById("deals-button");

if (dealsButton) {

    dealsButton.addEventListener("click", () => {
        window.location.href = "products.html";
    });

}


// =========================
// Newsletter
// =========================

const newsletterForm = document.getElementById("newsletter-form");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", event => {

        event.preventDefault();

        const emailInput = document.getElementById("email");
        const email = emailInput.value.trim();

        if (!email) {
            return;
        }

        alert(`Thank you for subscribing: ${email}`);

        newsletterForm.reset();

    });

}


// =========================
// Start Home Page
// =========================

loadCategories();
loadTopRatedProducts();
loadBestSellers();