import { Combinacion } from "@/types/tpyes";
import DialogInfo from "./DialogInfoA";
import { testAccesibilidad } from "@/lib/utils";
import { useMemo } from "react";


export default function PiezaCombinacion({
    combinacion
}: {
    combinacion: Combinacion
}) {

    const resultados = useMemo(() => testAccesibilidad(combinacion), [combinacion]);
    const minimoRatio = 3
    const ratioIdentico = 1

    let bgColor;

    if (combinacion.esMismoColor) {
        bgColor = {

        }
    } else if (resultados[0].ratio === ratioIdentico) {
        bgColor = {
            backgroundColor: "azure",
            color: "#000"
        }
    } else {
        bgColor = {
            backgroundColor: combinacion.color1.hex,
            color: combinacion.color2.hex,
        }
    }


    return (
        <td
            className={`border border-gray-300 text-center relative ${(combinacion.esMismoColor) && "ee"}`}
            style={bgColor}
        >
            {/*Verifcar distinto de ID */}
            {!combinacion.esMismoColor && (
                /*Veficar ratio distinto de 1 */
                resultados[0].ratio === ratioIdentico ? (
                    <div className="cursor-not-allowed text-center">
                        <span>⚠️</span>
                        <p className="text-sm">Mismo color detectado.</p>
                    </div>
                ) : (
                    <DialogInfo resultados={resultados}>
                        <div className="flex px-4 py-4 flex-col gap-2 cursor-pointer">
                            <p>Texto</p>
                            <div>
                                {
                                    resultados[0].ratio < minimoRatio ? (
                                        <span className="text-white p-[3px] text-sm border rounded-sm bg-red-900">
                                            Ratio: {resultados[0].ratio}
                                        </span>
                                    ) : (
                                        <span className="text-white p-[3px] text-sm border rounded-sm bg-black">
                                            Ratio: {resultados[0].ratio}
                                        </span>
                                    )
                                }

                            </div>
                        </div>
                    </DialogInfo>
                )
            )}
        </td>
    )
}