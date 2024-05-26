import { createApp } from 'vue'
// import "bootstrap/dist/css/bootstrap.css"
import 'bootswatch/dist/slate/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.js"
import './style.css'
import App from './App.vue'
import store from './store'

const app = createApp(App)
app.use(store)
app.mount('#app')