import { Combinacion } from "@/types/tpyes";
import DialogInfo from "./DialogInfoA";
import { testAccesibilidad } from "@/lib/utils";
import { useMemo } from "react";
import TooltipCc from "./TooltipCc";

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
        bgColor = {}
    } else if (resultados[0].ratio === ratioIdentico) {
        bgColor = { backgroundColor: "azure", color: "#000" }
    } else {
        bgColor = { backgroundColor: combinacion.color1.hex, color: combinacion.color2.hex }
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
                    <div className="cursor-not-allowed text-center px-5 py-5">
                        <span>⚠️</span>
                        <p className="text-sm">Mismo color detectado.</p>
                    </div>
                ) : (
                    <DialogInfo resultados={resultados} combinacion={combinacion}>
                        <button className="flex px-5 py-5 flex-col items-center gap-2 pd w-full">
                            <p className="text-[17px] ">Texto</p>
                            <div>
                                {
                                    resultados[0].ratio < minimoRatio ? (
                                        <TooltipCc resultados={resultados}  combinacion={combinacion}>
                                            <span className="text-white p-[3px] text-xs border rounded-sm bg-red-900">
                                                Contraste: {resultados[0].ratio}
                                            </span>
                                        </TooltipCc>
                                    ) : (
                                        <TooltipCc resultados={resultados}  combinacion={combinacion}>
                                            <span className="text-white p-[3px] text-xs border rounded-sm bg-black">
                                                Contraste: {resultados[0].ratio}
                                            </span>
                                        </TooltipCc>
                                    )
                                }
                            </div>
                        </button>
                    </DialogInfo>
                )
            )}
        </td>
    )
}