import PiezaCombinacion from "@/components/components_OCC/PiezaCombina";
import { generarCombinacionesColor } from "@/lib/utils";
import { usePaletaStore } from "@/store/PaletaStore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NIVELES_WCAG } from "@/constants/evalWCAG";
import { toJpeg } from 'html-to-image';
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

export default function MatrizAccesible() {
    const { paletaGlobal } = usePaletaStore();
    const { colores } = paletaGlobal
    const combinaciones = useMemo(() => {
        return generarCombinacionesColor(colores);
    }, [colores]);
    const [esMovil, setEsMovil] = useState(false);

    useEffect(() => {
        const manejarResize = () => {
            setEsMovil(window.innerWidth < 1024);
        };
        manejarResize();
        window.addEventListener("resize", manejarResize);
        return () => window.removeEventListener("resize", manejarResize);
    }, []);

    const ref = useRef<HTMLDivElement>(null)

    const onButtonClickMatrix = useCallback(() => {
        if (ref.current === null) {
            return
        }
        toJpeg(ref.current, { cacheBust: true, })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'matriz-accesibilidad.png'
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref])


    return (
        <main>
            <section className="mb-5 md:mb-10 px-3 md:px-10 lg:px-20 mt-3">
                <article className="py-4 border rounded-sm">
                    <div className="grid place-content-center mb-6">
                        <a href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html" referrerPolicy="no-referrer"
                            target="_blank" className="underline text-xl"><p className="text-center font-medium inline">✅ Criterios de Contraste WCAG</p></a>
                    </div>
                    <ul className="grid px-10 md:px-5 grid-cols-1 gap-1 place-content-start  md:grid-cols-2 lg:grid-cols-4 md:gap-3 lg:gap-0   md:place-items-center">
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
            {
                esMovil ? (
                    <div>
                        <ul className="space-y-4">
                            {combinaciones.map((fila, index) => (
                                <li key={index} className="border p-4 rounded-md bg-gray-100">

                                    <p className="font-semibold text-lg inline-flex gap-2 items-center mb-3">
                                        Fondo: {fila[0].color1.nombre} <span className="w-5 h-5 block" style={{ backgroundColor: fila[0].color1.hex }}></span>
                                    </p>
                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                        {fila.map((combinacion) => (
                                            <PiezaCombinacion combinacion={combinacion} key={combinacion.id} />
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <section>
                        <article ref={ref} className="flex justify-center">
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
                        </article>
                        <div className="px-3 md:px-10 lg:px-20 flex justify-center mt-4">
                            <Button variant={"outline"} onClick={onButtonClickMatrix}> <DownloadIcon /> Descargar matriz</Button>
                        </div>
                    </section>
                )
            }

        </main>
    )
}