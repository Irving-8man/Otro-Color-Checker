import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Color, ColorSimple, PaletaColor } from "@/types/tpyes";
import { completarHex, generarId } from "@/lib/utils";

type PaletaState = {
    paletaGlobal: PaletaColor;
    agregarColor: (nuevoColor: Color) => boolean;
    actualizarColor: (updatedColor: Color) => boolean;
    eliminarColor: (id: string) => boolean;
    importarColores: (coloresImport: ColorSimple[]) => boolean;
};

export const usePaletaStore = create<PaletaState>()(
    persist(
        (set, get) => ({
            paletaGlobal: {
                id: generarId(),
                colores: [
                    { id: generarId(), nombre: "tokenColor1", hex: "#ff5733" },
                    { id: generarId(), nombre: "tokenColor2", hex: "#33cfff" },
                ],
                fechaCreado: Date.now().toString(),
                fechadActualizado: Date.now().toString(),
            },

            agregarColor: (nuevoColor: Color) => {
                const coloresActuales = get().paletaGlobal.colores;
                if (coloresActuales.length === 6) return false;
                set((state) => ({
                    paletaGlobal: {
                        ...state.paletaGlobal,
                        colores: [...state.paletaGlobal.colores, nuevoColor],
                        fechadActualizado: Date.now().toString(),
                    },
                }));
                return true;
            },

            actualizarColor: (updatedColor: Color) => {
                const exists = get().paletaGlobal.colores.some(
                    (c) => c.id === updatedColor.id
                );
                if (!exists) return false;
                set((state) => ({
                    paletaGlobal: {
                        ...state.paletaGlobal,
                        colores: state.paletaGlobal.colores.map((color) =>
                            color.id === updatedColor.id ? updatedColor : color
                        ),
                        fechadActualizado: Date.now().toString(),
                    },
                }));
                return true;
            },

            eliminarColor: (id: string) => {
                const currentColors = get().paletaGlobal.colores;
                if (currentColors.length <= 2) return false;
                set((state) => ({
                    paletaGlobal: {
                        ...state.paletaGlobal,
                        colores: state.paletaGlobal.colores.filter(
                            (color) => color.id !== id
                        ),
                        fechadActualizado: Date.now().toString(),
                    },
                }));
                return true;
            },

            importarColores: (coloresImport: ColorSimple[]) => {
                const coloresProcesados = coloresImport
                    .slice(0, 6)
                    .map((color) => {
                        const hexCompleto = completarHex(color.hex);
                        return hexCompleto ? { ...color, hex: `#${hexCompleto}` } : null;
                    })
                    .filter(Boolean) as ColorSimple[];

                while (coloresProcesados.length < 2) {
                    coloresProcesados.push({ nombre: "colorDefault", hex: "#000000" });
                }

                const coloresConId: Color[] = coloresProcesados.map((color) => ({
                    ...color,
                    id: generarId(),
                }));

                set({
                    paletaGlobal: {
                        id: generarId(),
                        colores: coloresConId,
                        fechaCreado: Date.now().toString(),
                        fechadActualizado: Date.now().toString(),
                    },
                });
                return true;
            },
        }),
        {
            name: "paleta-storage"
        }
    )
);
