import '@styles/normalize.css';
import '@styles/globals.css';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root')!);

root.render(<App />);
