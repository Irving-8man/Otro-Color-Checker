import PiezaCombinacion from "@/components/components_OCC/PiezaCombina";
import { generarCombinacionesColor } from "@/lib/utils";
import { useHistorialStore } from "@/store/HistorialStore";

export default function MatrizAccesible() {
    const { paletaGlobal } = useHistorialStore();
    const { colores } = paletaGlobal
    const combinaciones = generarCombinacionesColor(colores);

    return (
        <main className="px-20 py-10">
            <table className="border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                            Background / Texto
                        </th>
                        {colores.map(({ id, hex, nombre }) => (
                            <th
                                key={id}
                                className="border border-gray-300 px-4 py-2 text-center"
                                style={{ backgroundColor: hex }}
                            >
                                <p className="text-xs font-bold text-white">{nombre}</p>
                                <p className="text-[10px] text-white">{hex}</p>
                            </th>
                        ))}
                    </tr>
                </thead>


                <tbody>
                    {combinaciones.map((fila, index) => (
                        <tr key={index}>
                            {/* Encabezado de fila - ColorBg */}
                            <th
                                className="border border-gray-300 px-4 py-2 text-center"
                                style={{ backgroundColor: fila[0].color1.hex }}
                            >
                                <p className="text-xs font-bold text-white">
                                    {fila[0].color1.nombre}
                                </p>
                                <p className="text-[10px] text-white">{fila[0].color1.hex}</p>
                            </th>

                            {/* Celdas internas - Combinaciones */}
                            {fila.map((combinacion, i) => (
                                <PiezaCombinacion combinacion={combinacion} key={i} />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}