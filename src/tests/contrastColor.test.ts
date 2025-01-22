import { describe, it, expect } from "vitest";
import { HexToRGB } from "@/lib/utils";
import { generarCombinacionesColor } from "@/lib/utils";


// Lista de colores con sus versiones en hexadecimal y RGB
// Lista de colores con sus versiones en hexadecimal y RGB
const colorTests = [
    { hex: "#ff5733", expectedRgb: { r: 255, g: 87, b: 51 } },
    { hex: "#33cfff", expectedRgb: { r: 51, g: 207, b: 255 } },
    { hex: "#fff", expectedRgb: { r: 255, g: 255, b: 255 } },
    { hex: "#000", expectedRgb: { r: 0, g: 0, b: 0 } },
    { hex: "#a5d8ff", expectedRgb: { r: 165, g: 216, b: 255 } },
    { hex: "#f00", expectedRgb: { r: 255, g: 0, b: 0 } },
    { hex: "#cfa", expectedRgb: { r: 204, g: 255, b: 170 } },
    { hex: "#f3f", expectedRgb: { r: 255, g: 51, b: 255 } }
];


const colorPaleta = [
    { id: "1", nombre: "color1", hex: "#ff5733" },
    { id: "2", nombre: "color2", hex: "#33cfff" },
]

describe("Revision de funciones de contraste", () => {
    it('debería convertir colores Hex a RGB correctamente', () => {
        for (const { hex, expectedRgb } of colorTests) {
            const result = HexToRGB(hex);
            expect(result).toEqual(expectedRgb);
        }
    });
})



describe("Revision de función de combinatoria", () => {
    it('debería generar la matriz ', () => {
        const respuesta = generarCombinacionesColor(colorPaleta);
        console.log(respuesta[0])
    });
})