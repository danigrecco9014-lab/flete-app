// // import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// // import './index.css'
// // import App from './App.jsx'

// // createRoot(document.getElementById('root')).render(
// //   <StrictMode>
// //     <App />
// //   </StrictMode>,
// // )


// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// // import { BrowserRouter } from 'react-router-dom'
// import { HashRouter } from 'react-router-dom'
// import './index.css';
// import App from './App.jsx'
// // import { registerSW } from 'virtual:pwa-register'
// // registerSW({ immediate: true })
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     {/* <BrowserRouter>
//       <App />
//     </BrowserRouter> */}
//     <HashRouter>
//   <App />
// </HashRouter>
//   </StrictMode>
// )


// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { HashRouter } from 'react-router-dom'

// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <HashRouter>
//       <App />
//     </HashRouter>
//   </StrictMode>
// )

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { HashRouter } from 'react-router-dom'

// import './index.css'
// import App from './App.jsx'

// window.onerror = function(message) {
//   console.log("ERROR GLOBAL:", message);
// };

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <HashRouter>
//       <App />
//     </HashRouter>
//   </StrictMode>
// )

// import { createRoot } from "react-dom/client";

// import { HashRouter } from "react-router-dom";

// import "./index.css";

// import App from "./App.jsx";

// window.onerror = function(message) {
//   console.log("ERROR GLOBAL:", message);
// };

// createRoot(document.getElementById("root")).render(
//   <HashRouter>
//     <App />
//   </HashRouter>
// );

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


// import { BrowserRouter } from "react-router-dom";
// import AppRoutes from "./routes/AppRoutes";

// function App() {
//   return (
//     <BrowserRouter>
//       <AppRoutes />
//     </BrowserRouter>
//   );
// }

// export default App;

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import AppRoutes from "./routes/AppRoutes";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AppRoutes />
//     </BrowserRouter>
//   </React.StrictMode>
// );


// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { registerSW } from "virtual:pwa-register";

// registerSW({ immediate: true });
// import App from "./App";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { Toaster } from "react-hot-toast";
// import { registerSW } from "virtual:pwa-register";

// registrar SW después de imports
// registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 2500,
      }}
    />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);