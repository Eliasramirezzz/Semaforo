// src/components/Semaforo.tsx
import React, { useState, useEffect } from 'react';
import LuzSemaforo from './LuzSemaforo';

// Definimos los tipos para las luces del semáforo
type luzSemaforo = 'rojo' | 'amarillo' | 'verde';
type Direccion = 'subiendo' | 'bajando'; // Nuevo tipo de estado

// Duraciones de cada luz
const DURACION: Record<luzSemaforo, number> = {
    rojo: 10,
    verde: 10,
    amarillo: 3,
};

function Semaforo() {
    // Aquí declaramos nuestro estado para la luz activa
    // El valor inicial del semáforo será 'rojo'
    const [LuzActiva, setLuzActiva] = useState<luzSemaforo>('rojo');
    // Estado para el contador de tiempo
    const [tiempoRestante, setTiempoRestante] = useState(DURACION[LuzActiva]);
    //  Iniciamos "subiendo" hacia el verde
    const [direccion, setDireccion] = useState<Direccion>('subiendo');

    // ======================================================
    // LOGICA DEL CICLO AUTOMÁTICO (useEffect)
    // ======================================================
    useEffect(() => {
        // 1. Lógica del Temporizador (se ejecuta cada segundo)
        const temporizador = setInterval(() => {
            // Decrementamos el tiempo restante
            setTiempoRestante(prevTiempo => prevTiempo - 1);
        }, 1000); // 1000 milisegundos = 1 segundo

        // 2. Función de "Limpieza" (Cleanup Function)
        // Esto es VITAL en useEffect con temporizadores. Se ejecuta antes de
        // que el componente se desmonte o antes de que el efecto se vuelva a ejecutar.
        return () => clearInterval(temporizador);
    }, []); // El array vacío '[]' significa que este efecto solo se ejecuta una vez (al inicio).

    useEffect(() => {
        // 3. Lógica para CAMBIAR de LUZ cuando el tiempo llega a cero
        if (tiempoRestante === 0) {
            let proximaLuz: luzSemaforo;
            let nuevaDireccion: Direccion = direccion; // Por defecto, la dirección no cambia

            switch (LuzActiva) {
                case 'rojo':
                    /// Después de Rojo, siempre viene Amarillo (para pasar a Verde)
                    proximaLuz = 'amarillo';
                    nuevaDireccion = 'subiendo'; // Aseguramos que vamos hacia Verde
                    break;

                case 'verde':
                    // Después de Verde, siempre viene Amarillo (para pasar a Rojo)
                    proximaLuz = 'amarillo';
                    nuevaDireccion = 'bajando'; // Aseguramos que vamos hacia Rojo
                    break;

                case 'amarillo':
                    // ¡Aquí es donde usamos la dirección!
                    if (direccion === 'subiendo') {
                        // Si venimos de Rojo, pasamos a Verde
                        proximaLuz = 'verde';
                    } else {
                        // Si venimos de Verde ('bajando'), pasamos a Rojo
                        proximaLuz = 'rojo';
                    }
                    // NOTA: No cambiamos la dirección aquí, solo la usamos.

                    break;

                default:
                    proximaLuz = 'rojo';
            }

            // Actualizamos la luz activa
            setLuzActiva(proximaLuz);

            // Reiniciamos el tiempo restante con la duración de la NUEVA luz
            setTiempoRestante(DURACION[proximaLuz]);
            // Solo cambiamos la dirección si se ha determinado un cambio (Rojo -> Verde o Verde -> Rojo)
            if (nuevaDireccion !== direccion) {
                setDireccion(nuevaDireccion);
            }
        }
        // Este efecto se ejecuta CADA VEZ que el tiempoRestante o LuzActiva cambian.
    }, [tiempoRestante, LuzActiva, direccion]);

    // ======================================================
    // RENDERIZADO
    // ======================================================

    return (
        <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-transparent ">

            <div className="bg-gray-900 p-3 rounded-xl shadow-2xl space-y-3">
                {/* Luz Roja */}
                <LuzSemaforo
                    color="rojo"
                    estaActiva={LuzActiva === 'rojo'}
                    tiempo={LuzActiva === 'rojo' ? tiempoRestante : null}
                />

                {/* Luz Amarilla */}
                <LuzSemaforo
                    color="amarillo"
                    estaActiva={LuzActiva === 'amarillo'}
                    tiempo={LuzActiva === 'amarillo' ? tiempoRestante : null}
                />

                {/* Luz Verde */}
                <LuzSemaforo
                    color="verde"
                    estaActiva={LuzActiva === 'verde'}
                    tiempo={LuzActiva === 'verde' ? tiempoRestante : null}
                />
            </div>
        </div>
    );
}

export default Semaforo;