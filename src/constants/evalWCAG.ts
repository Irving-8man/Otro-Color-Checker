import { TestNivel } from "@/types/tpyes";

export const NIVELES_WCAG: TestNivel[] = [
    { nombre: 'Nivel AA - Texto grande', nivel: "ratio >= 3" },
    { nombre: 'Nivel AA - Texto normal', nivel: "ratio >= 4.5" },
    { nombre: 'Nivel AAA - Texto grande', nivel: "ratio >= 4.5" },
    { nombre: 'Nivel AAA - Texto normal', nivel: "ratio >= 7" },
]