import { create } from "zustand";
import { Color, PaletaColor } from "@/types/tpyes";

type PaletaState = {
    paletaGlobal: PaletaColor;
    agregarColor: (nuevoColor: Color) => void;
    actualizarColor: (updatedColor: Color) => void;
    eliminarColor: (id: string) => void;
};

export const genId = () => Date.now().toString();

export const useHistorialStore = create<PaletaState>((set) => ({
    paletaGlobal: {
        id: genId(),
        nombre: "MiPaleta",
        colores: [
            { id: "1", nombre: "color1", hex: "#ff5733" },
            { id: "2", nombre: "color2", hex: "#33cfff" },
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
}));
