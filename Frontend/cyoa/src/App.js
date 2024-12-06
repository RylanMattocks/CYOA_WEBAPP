import './App.css';
import AppRoutes from './Routes/AppRoutes'
import { trackActivity } from './Storage/LocalStorage';

function App() {
  trackActivity();
  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;
