import './bootstrap';
import './components/Main.jsx';
import Alpine from 'alpinejs';

// todo: Put Alpine to global scope (Window scope is not good practice)
window.Alpine = Alpine;

Alpine.start();
