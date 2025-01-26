import { Combinacion } from "@/types/tpyes";
import DialogInfo from "./DialogInfoA";
import { encontrarTestMayor, testAccesibilidad } from "@/lib/utils";
import { useMemo } from "react";


export default function PiezaCombinacion({
    combinacion
}: {
    combinacion: Combinacion
}) {

    const resultados = useMemo(() => testAccesibilidad(combinacion), [combinacion]);
    const { testMayor ,testsPasados} = encontrarTestMayor(resultados);
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
            className={`border border-gray-300 text-center px-2 py-2 ${(combinacion.esMismoColor) && "ee"}`}
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
                    <div className="flex flex-col text-sm">
                        <p>Distinto hex, contraste normal</p>
                        {testsPasados}
                    </div>

                )
            )}
        </td>
    )
}