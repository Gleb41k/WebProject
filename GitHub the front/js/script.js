const gallery = document.getElementById('gallery');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const addProductForm = document.getElementById('addProductForm');
const confirmModal = document.getElementById('confirmModal');
const confirmDeleteBtn = document.getElementById('confirmDelete');
const cancelDeleteBtn = document.getElementById('cancelDelete');

let products = JSON.parse(localStorage.getItem('products')) || [
    {
        id: 1,
        url: "product.html?id=1",
        image: "https://avatars.mds.yandex.net/get-mpic/5165418/2a00000194b103a0296c41f8c9344a2ced3e/optimize",
        name: "MacBook Pro 16″ M4 Pro",
        description: "Мощнейший ноутбук для профессионалов с дисплеем Liquid Retina XDR."
    },
    {
        id: 2,
        url: "product.html?id=2",
        image: "https://avatars.mds.yandex.net/get-mpic/1101307/2a000001919a3288fed49e1edafd2afaefca/optimize",
        name: "iPad 10.9",
        description: "Невероятно лёгкий, мощный, в титановом корпусе. Новый уровень."
    }
];

let productToDelete = null;

function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

function renderGallery() {
    gallery.innerHTML = '';

    if (products.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-message';
        emptyMessage.textContent = 'Товары отсутствуют';
        gallery.appendChild(emptyMessage);
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <div class="card-content">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <button class="delete-btn">Удалить</button>
            </div>
        `;

        card.querySelector('img').addEventListener('click', (e) => {
            e.stopPropagation();
            modalImage.src = product.image;
            modal.classList.add('show');
            document.body.classList.add('blurred');
        });

        card.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            showDeleteConfirmation(product.id);
        });

        gallery.appendChild(card);
    });
}

function showDeleteConfirmation(id) {
    productToDelete = id;
    confirmModal.classList.add('show');
    document.body.classList.add('blurred');
}

function deleteProduct() {
    if (!productToDelete) return;

    products = products.filter(product => product.id !== productToDelete);
    saveProducts();
    renderGallery();
    hideDeleteConfirmation();
}

function hideDeleteConfirmation() {
    productToDelete = null;
    confirmModal.classList.remove('show');
    document.body.classList.remove('blurred');
}

addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = Date.now();
    const newProduct = {
        id: id,
        url: `product.html?id=${id}`,
        image: document.getElementById('productImage').value,
        name: document.getElementById('productName').value,
        description: document.getElementById('productDescription').value
    };

    products.push(newProduct);
    saveProducts();
    renderGallery();
    addProductForm.reset();
});

modal.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.classList.remove('blurred');
});

confirmDeleteBtn.addEventListener('click', deleteProduct);
cancelDeleteBtn.addEventListener('click', hideDeleteConfirmation);

renderGallery();