// src/components/LuzSemaforo.tsx

import React from "react";

// Definimos la interfaz (TypeScript) de las PROPS que acepta este componente
interface LuzSemaforoProps {
    color: 'rojo' | 'amarillo' | 'verde';
    estaActiva: boolean;
    // 'number | null' significa que el tiempo puede ser un número O nulo (cuando la luz está apagada)
    tiempo: number | null;
}

// Mapeo de colores de Tailwind para la luz
const colorMap: Record<'rojo' | 'amarillo' | 'verde', { on: string; ring: string }> = {
    rojo: { on: 'bg-red-500', ring: 'ring-red-300' },
    amarillo: { on: 'bg-yellow-400', ring: 'ring-yellow-200' },
    verde: { on: 'bg-green-500', ring: 'ring-green-300' },
};

// Componente de Función que recibe las props
function LuzSemaforo({ color, estaActiva, tiempo }: LuzSemaforoProps) {
    // Clases base
    let clases = "w-18 h-18 rounded-full border-2 border-gray-700 flex items-center justify-center transition-all duration-300";

    if (estaActiva) {
        // Clases para la luz encendida (usando el mapa de colores)
        const estilo = colorMap[color];
        clases += ` ${estilo.on} ${estilo.ring} ring-4 ring-offset-2 ring-offset-gray-900`;
    } else {
        // Clases para la luz apagada
        clases += ' bg-gray-700';
    }

    return (
        <div className={clases}>
            {/* Solo mostramos el tiempo si la luz está activa y tiempo no es nulo */}
            {estaActiva && tiempo !== null && (
                <span className="text-3xl font-black text-white drop-shadow-lg">
                    {tiempo}
                </span>
            )}
        </div>
    );
}

export default LuzSemaforo;