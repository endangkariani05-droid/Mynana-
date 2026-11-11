const cakes = [
    {
        id: 1,
        name: "Strawberry Cake",
        category: "Cake",
        price: 85000,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Chocolate Cake",
        category: "Cake",
        price: 80000,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Brownies",
        category: "Brownies",
        price: 25000,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Donat",
        category: "Donat",
        price: 15000,
        image: "https://images.unsplash.com/photo-1551024506-0etu2a7a4c8?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Cupcake",
        category: "Cupcake",
        price: 18000,
        image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=500&q=80"
    }
];

let cart = [];

function rupiah(number) {
    return "Rp " + number.toLocaleString("id-ID");
}

// MENAMPILKAN MENU
function displayCakes(data = cakes) {
    const products = document.getElementById("products");

    products.innerHTML = data.map(cake => `
        <div class="product">
            <img src="${cake.image}" alt="${cake.name}">
            <h3>${cake.name}</h3>
            <div class="price">${rupiah(cake.price)}</div>
            <button class="btn" onclick="addCart(${cake.id})">
                🛒 Tambah
            </button>
        </div>
    `).join("");
}

// TAMBAH KERANJANG
function addCart(id) {
    const cake = cakes.find(item => item.id === id);
    const item = cart.find(item => item.id === id);

    if (item) {
        item.qty++;
    } else {
        cart.push({
            ...cake,
            qty: 1
        });
    }

    displayCart();
}

// MENAMPILKAN KERANJANG
function displayCart() {
    const cartItems = document.getElementById("cartItems");

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Keranjang masih kosong 🍰</p>";
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <b>${item.name}</b><br>
                    ${rupiah(item.price)} × ${item.qty}
                </div>

                <div>
                    <button onclick="changeQty(${item.id},-1)">−</button>
                    ${item.qty}
                    <button onclick="changeQty(${item.id},1)">+</button>
                    <button onclick="removeCart(${item.id})">🗑</button>
                </div>
            </div>
        `).join("");
    }

    calculateTotal();
}

// UBAH JUMLAH
function changeQty(id, value) {
    const item = cart.find(item => item.id === id);

    if (item) {
        item.qty += value;

        if (item.qty <= 0) {
            removeCart(id);
        }
    }

    displayCart();
}

// HAPUS KERANJANG
function removeCart(id) {
    cart = cart.filter(item => item.id !== id);
    displayCart();
}

// HITUNG TOTAL
function calculateTotal() {
    let subtotal = cart.reduce(
        (total, item) => total + item.price * item.qty, 0
    );

    let ongkir = cart.length > 0 ? 10000 : 0;
    let total = subtotal + ongkir;

    document.getElementById("subtotal").innerText = rupiah(subtotal);
    document.getElementById("total").innerText = rupiah(total);
}

// FILTER MENU
function filterCake(category) {
    if (category === "Semua") {
        displayCakes(cakes);
    } else {
        const filtered = cakes.filter(
            cake => cake.category === category
        );

        displayCakes(filtered);
    }
}

// PENCARIAN
document.getElementById("search").addEventListener("input", function() {
    const keyword = this.value.toLowerCase();

    const filtered = cakes.filter(cake =>
        cake.name.toLowerCase().includes(keyword)
    );

    displayCakes(filtered);
});

// PEMESANAN
document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert("Keranjang masih kosong! Silakan pilih kue.");
        return;
    }

    alert("Pesanan berhasil dibuat! Terima kasih telah memesan di CakeShop 🍰");

    cart = [];
    displayCart();
    this.reset();
});

// MENJALANKAN WEBSITE
displayCakes();
displayCart();
