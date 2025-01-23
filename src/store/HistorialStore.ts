import { create } from "zustand";
import { Color, ColorSimple, PaletaColor } from "@/types/tpyes";
import { nanoid } from 'nanoid'
import { completarHex } from "@/lib/utils";

type PaletaState = {
    paletaGlobal: PaletaColor;
    agregarColor: (nuevoColor: Color) => void;
    actualizarColor: (updatedColor: Color) => void;
    eliminarColor: (id: string) => void;
    importarColores: (coloresImport: ColorSimple[]) => void;
};

export const genId = () => nanoid();

export const useHistorialStore = create<PaletaState>((set) => ({
    paletaGlobal: {
        id: genId(),
        colores: [
            { id: genId(), nombre: "color1", hex: "#ff5733" },
            { id: genId(), nombre: "color2", hex: "#33cfff" },
        ],
        fechaCreado: Date.now().toString(),
        fechadActualizado: Date.now().toString(),
    },

    agregarColor: (nuevoColor) =>
        set((state) => {
            if (state.paletaGlobal.colores.length >= 6) {
                alert("La paleta solo puede contener hasta 6 colores.");
                return state; // No se modifica el estado si ya hay 6 colores
            }
            return {
                paletaGlobal: {
                    ...state.paletaGlobal,
                    colores: [...state.paletaGlobal.colores, nuevoColor],
                    fechadActualizado: Date.now().toString(),
                },
            };
        }),

    actualizarColor: (updatedColor) =>
        set((state) => ({
            paletaGlobal: {
                ...state.paletaGlobal,
                colores: state.paletaGlobal.colores.map((color) =>
                    color.id === updatedColor.id ? updatedColor : color
                ),
                fechadActualizado: Date.now().toString(),
            },
        })),

    eliminarColor: (id) =>
        set((state) => {
            if (state.paletaGlobal.colores.length <= 2) {
                alert("La paleta debe tener al menos 2 colores.");
                return state; // No se modifica el estado si ya tiene 2 colores
            }
            return {
                paletaGlobal: {
                    ...state.paletaGlobal,
                    colores: state.paletaGlobal.colores.filter((color) => color.id !== id),
                    fechadActualizado: Date.now().toString(),
                },
            };
        }),
    importarColores: (coloresImport: ColorSimple[]) =>
        set(() => {
            const coloresProcesados = coloresImport
                .slice(0, 6)
                .map((color) => {
                    const hexCompleto = completarHex(color.hex);
                    return hexCompleto
                        ? { ...color, hex: `#${hexCompleto}` }
                        : null;
                })
                .filter(Boolean) as ColorSimple[];

            while (coloresProcesados.length < 2) {
                coloresProcesados.push({ nombre: "colorMas", hex: "#000000" });
            }

            const coloresConId: Color[] = coloresProcesados.map((color) => ({
                ...color,
                id: genId()
            }));

            return {
                paletaGlobal: {
                    id: genId(),
                    colores: coloresConId,
                    fechaCreado: Date.now().toString(),
                    fechadActualizado: Date.now().toString(),
                },
            };
        }),
}));
