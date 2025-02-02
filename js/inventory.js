import { db } from './firebase.js'
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    doc 
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"

const productTable = document.getElementById('productTable')
const addProductForm = document.getElementById('addProductForm')

const products = collection(db, 'products')

// Función para cargar productos
const loadProducts = async () => {
    productTable.innerHTML = ''
    const allProducts = await getDocs(products)
    allProducts.forEach((item) => {
        const product = item.data()
        const row = document.createElement('tr')
        row.innerHTML = `
            <th>${product.name}</th>
            <th>${product.stock}</th>
            <th>
                <button class="btn btn-warning btn-sm edit-product" data-id="${item.id}">
                    <i class="fas fa-edit"></i>
                </button> 
                |
                <button class="btn btn-danger btn-sm delete-product" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </th>
        `
        productTable.appendChild(row)
    })

    // Agregar eventos a los botones
    document.querySelectorAll('.edit-product').forEach((button) => {
        button.addEventListener('click', (e) => {
            const productId = e.target.closest('.edit-product').dataset.id
            openEditDialog(productId)
        })  
    })
    
    document.querySelectorAll('.delete-product').forEach((button) => {
        button.addEventListener('click', (e) => {
            const productId = e.target.closest('.delete-product').dataset.id
            deleteProduct(productId)
        })  
    })
}

// Función para agregar productos
addProductForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = document.getElementById('productName').value
    const stock = document.getElementById('productStock').value
    
    try {
        await addDoc(products, { name, stock: parseInt(stock) })
        alert('Producto agregado satisfactoriamente')
        addProductForm.reset()
        loadProducts()
    } catch (error) {
        alert('Error al agregar el producto: ' + error.message)   
    }
})

const deleteProduct = async (id) => {
    const confirmation = confirm('¿Estás seguro?')
    if (confirmation) {
        try {
            await deleteDoc(doc(db, 'products', id))
            alert('Se ha borrado correctamente')
            loadProducts()
        } catch (error) {
            alert('Error al eliminar el producto: ' + error.message)
        }
    }
}

const openEditDialog = async (id) => {
    const producto = doc(db, 'products', id)
    const productData = (await getDoc(producto)).data()

    let newStock
    do {
        newStock = prompt(
            `Editando Producto: ${productData.name}\nCantidad Actual: ${productData.stock}\nIngresa la Nueva Cantidad:`,
            productData.stock
        )

        // Si el usuario cancela, salimos del bucle
        if (newStock === null) return

        // Validamos que sea un número entero positivo
    } while (!/^\d+$/.test(newStock))

    try {
        await updateDoc(producto, { stock: parseInt(newStock) })
        alert('Actualizado correctamente')
        loadProducts()
    } catch (error) {
        alert('Error al actualizar el producto: ' + error.message)
    }
}

loadProducts()
