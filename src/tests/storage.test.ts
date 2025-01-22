import { describe, it, expect, beforeEach } from "vitest";
import { useHistorialStore, genId } from "@/store/HistorialStore";

describe("Revision de estado de historial", () => {

    beforeEach(() => {
        // Reinicia el estado entre pruebas
        useHistorialStore.setState({
            paletaGlobal: {
                id: genId().toString(),
                nombre: "MiPaleta",
                colores: [
                    { id: "1", nombre: "color1", hex: "#ff5733" },
                    { id: "2", nombre: "color2", hex: "#33cfff" },
                ],
                fechaCreado: genId().toString(),
                fechadActualizado: genId().toString(),
            },
        });
    });

    it("deberia devolver la paleta por defaut", () => {
        const his = useHistorialStore.getState()
        expect(his.paletaGlobal.nombre).toBe("MiPaleta")
        expect(his.paletaGlobal.colores).toHaveLength(2);
    })

    it("debería agregar un nuevo color a la paleta", () => {
        const nuevoColor = { id: "3", nombre: "color3", hex: "#00ff00" };
        const { agregarColor } = useHistorialStore.getState();
        agregarColor(nuevoColor);
        const updatedState = useHistorialStore.getState();
        expect(updatedState.paletaGlobal.colores).toHaveLength(3);
        expect(updatedState.paletaGlobal.colores).toContainEqual(nuevoColor);
    });


    it("debería actualizar un color existente", () => {
        const updatedColor = { id: "1", nombre: "color1_updated", hex: "#ff0000" };
        const { actualizarColor } = useHistorialStore.getState();
        actualizarColor(updatedColor);
        const updatedState = useHistorialStore.getState();
        expect(updatedState.paletaGlobal.colores).toHaveLength(2);
        expect(updatedState.paletaGlobal.colores).toContainEqual(updatedColor);
    });


    it("debería eliminar un color de la paleta", () => {
        const { eliminarColor } = useHistorialStore.getState();
        eliminarColor("1");
        const updatedState = useHistorialStore.getState();
        expect(updatedState.paletaGlobal.colores).toHaveLength(1);
        expect(updatedState.paletaGlobal.colores.find((c) => c.id === "1")).toBeUndefined();
    });

    it("debería manejar correctamente eliminar un color que no existe", () => {
        const { eliminarColor } = useHistorialStore.getState();
        eliminarColor("nonexistent-id");
        const updatedState = useHistorialStore.getState();
        expect(updatedState.paletaGlobal.colores).toHaveLength(2);
    });

})