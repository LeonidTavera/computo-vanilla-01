import{ auth } from './firebase.js'
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Iniciar Sesion
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
e.preventDefault()
const email = document.getElementById('loginUser').value
const password = document.getElementById('loginPassword').value

try{
  await signInWithEmailAndPassword(auth, email, password)
  window.location.href = ' inventario.html'
}catch (error) {
    alert('Error al iniciar session' + error.message)
}
})

// Registrar Usuario
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = document.getElementById('registerUser').value
    const password = document.getElementById('registerPassword').value
    
    try{
      await createUserWithEmailAndPassword(auth, email, password)
      alert('Usuario Registrado Correctamente')
      window.location.href = 'index.html'
    }catch (error) {
        alert('Error al registrar usuario' + error.message)
    }
    })

    document.getElementById('logoutButton')?.addEventListener('click', async () => {
        try {
await signOut(auth)
window.location.href = 'index.html'
        } catch (error) {
alert('Error al cerrar sesion: '+ error.message)
        }
    })