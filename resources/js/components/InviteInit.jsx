import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../css/app.css';
import InviteModal from "./InviteModal.jsx";

if (document.getElementById('invite')) {
    const root_Url = import.meta.env.VITE_APP_URL;

    ReactDOM.createRoot(document.getElementById('invite')).render(
        <React.StrictMode>
            <InviteModal rootUrl={root_Url}/>
        </React.StrictMode>
    );
}
