/*
 * File: index.tsx
 * Project: deriv-assignment
 * File Created: Friday, 21st April 2023 08:20:31 pm
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:10:53 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

import { createRoot } from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />); // Add React Strict Mode if Necessary in development environment

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
