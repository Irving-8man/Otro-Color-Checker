import { create } from "zustand";
import { Color, ColorSimple, PaletaColor } from "@/types/tpyes";
import { nanoid } from 'nanoid'

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
            // Ajustar la cantidad de colores importados
            const coloresImportados = coloresImport.slice(0, 6); // Tomar los primeros 6 colores
            // Si hay menos de 2 colores, rellenar con negro
            while (coloresImportados.length < 2) {
                coloresImportados.push({
                    nombre: "Negro",
                    hex: "#000000",
                });
            }
            return {
                paletaGlobal: {
                    id: genId(),
                    colores: coloresImportados.map((color) => ({
                        ...color,
                        id: genId(), // Asegurar IDs únicos
                    })),
                    fechaCreado: Date.now().toString(),
                    fechadActualizado: Date.now().toString(),
                },
            };
        }),
}));
