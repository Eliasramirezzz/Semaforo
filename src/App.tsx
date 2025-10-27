import React from 'react';
import Semaforo from './components/semaforo';
import ImagenFondo from './assets/noche_calle.png'; // Importamos la imagen de fondo

function App() {
  return (

    < div className="min-h-screen flex items-center justify-end p-4 pr-10 bg-gray-900" style={{
      backgroundImage: `url(${ImagenFondo})`, // Usamos la imagen importada
      backgroundSize: 'cover', // Cubre toda la pantalla
      backgroundPosition: 'center', // Centra la imagen
      backgroundAttachment: 'fixed' // La imagen permanece fija al hacer scroll (opcional, pero queda bien)
    }
    }>
      <Semaforo />
    </div >
  )
}
export default App;
