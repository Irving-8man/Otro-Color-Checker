import { generarCombinacionesSinRepeticion } from "@/lib/utils";
import { useHistorialStore } from "@/store/HistorialStore";
import { Combinacion } from "@/types/tpyes";
import { useEffect, useMemo, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";



export default function VistaPrevia() {
    const { paletaGlobal } = useHistorialStore();
    const { colores } = paletaGlobal
    const combinaciones = useMemo(() => {
        return generarCombinacionesSinRepeticion(colores);
    }, [colores]);
    const [combinacionSeleccionada, setCombinacionSeleccionada] = useState<Combinacion>();
    const [intercambiado, setIntercambiado] = useState(false);

    useEffect(() => {
        setCombinacionSeleccionada(combinaciones[0]);
        setIntercambiado(false);
    }, [combinaciones]);

    const manejarIntercambio = () => {
        setIntercambiado(!intercambiado);
    };

    const coloresActuales = useMemo(() => {
        if (!combinacionSeleccionada) return null;

        return {
            fondo: intercambiado
                ? combinacionSeleccionada.color2.hex
                : combinacionSeleccionada.color1.hex,
            texto: intercambiado
                ? combinacionSeleccionada.color1.hex
                : combinacionSeleccionada.color2.hex
        };
    }, [combinacionSeleccionada, intercambiado]);

    return (
        <main>
            <div className="flex gap-4 items-center mb-6">
                <Select
                    value={combinacionSeleccionada?.id}
                    onValueChange={(id) => {
                        const seleccion = combinaciones.find(c => c.id === id);
                        setCombinacionSeleccionada(seleccion);
                        setIntercambiado(false);
                    }}
                >
                    <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Selecciona una combinación">
                            {combinacionSeleccionada && (
                                `${combinacionSeleccionada.color1.nombre} - ${combinacionSeleccionada.color2.nombre}`
                            )}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {combinaciones.map((combinacion) => (
                            <SelectItem
                                key={combinacion.id}
                                value={combinacion.id}
                            >
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-4 h-4 rounded-full border"
                                        style={{ backgroundColor: combinacion.color1.hex }}
                                    />
                                    <span>{combinacion.color1.nombre}</span> -
                                    <div
                                        className="w-4 h-4 rounded-full border"
                                        style={{ backgroundColor: combinacion.color2.hex }}
                                    />
                                    <span>{combinacion.color2.nombre}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button
                    onClick={manejarIntercambio}
                    disabled={!combinacionSeleccionada || combinacionSeleccionada.esMismoColor}
                >
                    Intercambiar Colores
                </Button>
            </div>

            {coloresActuales && combinacionSeleccionada && (
                <div className="space-y-6">
                    <div className="flex gap-4 items-center">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-12 h-12 rounded border"
                                style={{ backgroundColor: coloresActuales.fondo }}
                            />
                            <div>
                                {intercambiado
                                    ? combinacionSeleccionada.color2.nombre
                                    : combinacionSeleccionada.color1.nombre}
                                <p className="text-sm">{coloresActuales.fondo}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div
                                className="w-12 h-12 rounded border"
                                style={{ backgroundColor: coloresActuales.texto }}
                            />
                            <div>
                                <p className="font-medium">
                                    {intercambiado
                                        ? combinacionSeleccionada.color1.nombre
                                        : combinacionSeleccionada.color2.nombre}
                                </p>
                                <p className="text-sm">{coloresActuales.texto}</p>
                            </div>
                        </div>
                    </div>

                    {/* Ejemplo de implementación */}
                    <div
                        className="p-6 rounded-lg grid gap-4"
                        style={{
                            backgroundColor: coloresActuales.fondo,
                            color: coloresActuales.texto
                        }}
                    >
                        <h1 className="text-3xl font-bold">Título principal</h1>
                        <p className="text-base">Texto de ejemplo para demostrar el contraste</p>
                        <div className="flex gap-2">
                            <Button variant="default">Acción primaria</Button>
                            <Button variant="outline">Acción secundaria</Button>
                        </div>
                    </div>

                    {/* Advertencia para mismos colores */}
                    {combinacionSeleccionada.esMismoColor && (
                        <div className="bg-yellow-100 p-4 rounded-lg text-yellow-800">
                            ⚠️ Esta combinación usa el mismo color para ambos roles
                        </div>
                    )}
                </div>
            )}
        </main>
    )
}