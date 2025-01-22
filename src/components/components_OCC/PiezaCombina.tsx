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
    const { testMayor } = encontrarTestMayor(resultados);
    const minimo = 3

    const bgTex = combinacion.esMismoColor ?
        {
            backgroundColor: "#000",
            color: "#00"
        } :
        {
            backgroundColor: combinacion.color1.hex,
            color: combinacion.color2.hex,
        }


    return (
        <td
            className={`border border-gray-300 text-center px-4 py-5 ${combinacion.esMismoColor && "bg_e"}`}
            style={bgTex}
        >
            {combinacion.esMismoColor ? (
                <p className="text-xs font-bold text-white cursor-not-allowed ">
                    
                </p>
            ) : (

                <DialogInfo resultados={resultados}>
                    {testMayor.ratio >= minimo ?
                        (
                            <div className="max-w-[14ch] text-center">
                                <p className="text-xs font-bold hover:underline cursor-pointer">Hola mundo! {testMayor.ratio}</p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-xs font-bold hover:underline cursor-pointer">No paso test {testMayor.ratio}</p>
                            </div>
                        )
                    }

                </DialogInfo>
            )}

        </td>
    )
}