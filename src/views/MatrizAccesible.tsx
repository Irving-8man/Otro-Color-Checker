import PiezaCombinacion from "@/components/components_OCC/PiezaCombina";
import { generarCombinacionesColor } from "@/lib/utils";
import { usePaletaStore } from "@/store/PaletaStore";
import { useMemo } from "react";
import { NIVELES_WCAG } from "@/constants/evalWCAG";

export default function MatrizAccesible() {
    const { paletaGlobal } = usePaletaStore();
    const { colores } = paletaGlobal
    const combinaciones = useMemo(() => {
        return generarCombinacionesColor(colores);
    }, [colores]);

    return (
        <main className="px-20 py-10">
            <section className="mb-10">
                <article className="py-4 border rounded-sm">
                    <p className="text-center mb-4 font-medium">✅ Criterios de Contraste WCAG</p>
                    <ul className="grid grid-cols-4  place-items-center">
                        {
                            NIVELES_WCAG.map(({ nombre }, idx) => (
                                <li key={idx + 11}  >
                                    🔹 {nombre}
                                </li>
                            ))
                        }
                    </ul>
                </article>
            </section>

            <section className="flex justify-center">
                <table className="border-collapse border border-gray-300">

                    <thead>
                        <tr>
                            <th className="border-gray-300  px-4 py-8 w-[17ch] bg-gray-100 relative">
                                <span className="absolute inline right-3 top-0">Texto</span>
                                <span className="absolute inline bottom-0 left-3">Fondo</span>

                            </th>
                            {colores.map(({ id, hex }) => (
                                <th
                                    key={id}
                                    className="border border-gray-300 px-6 py-3 text-center w-[18ch] font-normal"
                                    style={{ backgroundColor: hex }}
                                >
                                    <div className="bg-gray-200 p-0 border">
                                        <p className="text-sm token-name font-medium">{hex}</p>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>


                    <tbody>
                        {combinaciones.map((fila, index) => (
                            <tr key={index}>
                                {/* Encabezado de fila - ColorBg */}
                                <th
                                    className="border border-gray-300  px-6 py-3 text-center w-[15ch] font-normal"
                                    style={{ backgroundColor: fila[0].color1.hex }}
                                >
                                    <div className="bg-gray-200 backdrop-opacity-100  px-2 py-1 border">
                                        <p className="text-sm token-name font-medium"> {fila[0].color1.nombre}</p>
                                    </div>
                                </th>

                                {/* Celdas internas - Combinaciones */}
                                {fila.map((combinacion) => (
                                    <PiezaCombinacion combinacion={combinacion} key={combinacion.id} />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

        </main>
    )
}