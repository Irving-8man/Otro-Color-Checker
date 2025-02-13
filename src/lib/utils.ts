import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Color, colorRGB, Combinacion, ResultadoTest } from "@/types/tpyes";
import { nanoid } from "nanoid";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const generarId = () => nanoid();

export function completarHex(hex: string): string {
    hex = hex.replace(/^#/, '');
    return hex.length === 3 ? hex.split('').map((char) => char + char).join('') : hex
}


export function HexToRGB(hex: string): colorRGB | null {
    hex = hex.replace(/^#/, '');

    // Verificar si es una versión abreviada
    if (hex.length === 3) {
        hex = hex.split('').map((char) => char + char).join('');
    }

    if (hex.length !== 6) {
        return null;
    }
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}

export function calcularLuminosidad(colorRGB: colorRGB) {
    const { r, g, b } = colorRGB;
    const a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}


export function calcularRatio(color_1: string, color_2: string): number {
    const color1rgb = HexToRGB(color_1);
    const color2rgb = HexToRGB(color_2);

    if (!color1rgb || !color2rgb) {
        console.error('No se pudo calcular el contraste, uno o ambos colores no son válidos.');
        return 0;
    }

    const color1luminance = calcularLuminosidad(color1rgb);
    const color2luminance = calcularLuminosidad(color2rgb);

    // Fórmula corregida
    return color1luminance > color2luminance
        ? (color1luminance + 0.05) / (color2luminance + 0.05)
        : (color2luminance + 0.05) / (color1luminance + 0.05);
}




export function testAccesibilidad(combinacion: Combinacion): ResultadoTest[] {
    const { color1, color2, esMismoColor } = combinacion;

    // Si los colores son el mismo, el contraste es 1 y los resultados son 'false'
    if (esMismoColor) {
        return [
            { id: generarId(), nivel: 'Nivel AA - Texto grande', resultado: false, ratio: 1 },
            { id: generarId(), nivel: 'Nivel AA - Texto normal', resultado: false, ratio: 1 },
            { id: generarId(), nivel: 'Nivel AAA - Texto grande', resultado: false, ratio: 1 },
            { id: generarId(), nivel: 'Nivel AAA - Texto normal', resultado: false, ratio: 1 },
        ];
    }

    const ratio = calcularRatio(color1.hex, color2.hex);
    const ratioRedondeado = Math.round(ratio * 100) / 100;

    return [
        {
            id: generarId(),
            nivel: 'Nivel AA - Texto grande',
            resultado: ratio >= 3,
            ratio: ratioRedondeado,
        },
        {
            id: generarId(),
            nivel: 'Nivel AA - Texto normal',
            resultado: ratio >= 4.5,
            ratio: ratioRedondeado,
        },
        {
            id: generarId(),
            nivel: 'Nivel AAA - Texto grande',
            resultado: ratio >= 4.5,
            ratio: ratioRedondeado,
        },
        {
            id: generarId(),
            nivel: 'Nivel AAA - Texto normal',
            resultado: ratio >= 7,
            ratio: ratioRedondeado,
        },
    ];
}

export function encontrarTestMayor(resultadoTests: ResultadoTest[]) {
    const testsPasados = resultadoTests.filter(test => test.resultado).length;
    return {
        testsPasados,
    };
}




export function generarCombinacionesColor(
    colores: Color[],
): Combinacion[][] {

    const combinations: Combinacion[][] = [];
    for (let i = 0; i < colores.length; i++) {
        const row: Combinacion[] = [];
        for (let j = 0; j < colores.length; j++) {
            const color1 = colores[i];
            const color2 = colores[j];
            row.push({
                color1,
                color2,
                esMismoColor: color1.id === color2.id,
                id: generarId()
            });
        }
        combinations.push(row);
    }
    return combinations;
}



export function generarCombinacionesSinRepeticion(colores: Color[]): Combinacion[] {
    const combinations: Combinacion[] = [];
    for (let i = 0; i < colores.length; i++) {
        for (let j = i + 1; j < colores.length; j++) {
            const color1 = colores[i];
            const color2 = colores[j];
            combinations.push({
                color1,
                color2,
                esMismoColor: false,
                id: generarId()
            });
        }
    }
    return combinations;
}


