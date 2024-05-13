import axios from 'axios';
// todo: Put axios to global scope (Window scope is not good practice)
/*
  Instead of putting it in Window scope you can create configuration file with all settings for axios
  in that file and reuse exported Axios instance where do you need it
*/
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import './echo';
