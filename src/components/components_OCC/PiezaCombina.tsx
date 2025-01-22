import { Combinacion } from "@/types/tpyes";
import DialogInfo from "./DialogInfoA";
import { encontrarTestMayor, testAccesibilidad } from "@/lib/utils";
export default function PiezaCombinacion({
    combinacion
}: {
    combinacion: Combinacion
}) {

    const resultados = testAccesibilidad(combinacion);
    const testMayor = encontrarTestMayor(resultados);
    const minimo = 3
    return (
        <td
            className="border border-gray-300 text-center "
            style={{
                backgroundColor: combinacion.color1.hex,
                color: combinacion.color2.hex,
            }}
        >
            {combinacion.esMismoColor ? (
                <p className="text-xs font-bold text-gray-500 cursor-not-allowed ">
                    Misma combinación
                </p>
            ) : (

                <DialogInfo resultados={resultados}>
                    {testMayor.ratio < minimo ?
                        (
                            <div>
                                <p className="text-xs font-bold hover:scale-110 cursor-pointer">No paso test {testMayor.ratio}</p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-xs font-bold hover:scale-110 cursor-pointer">Paso {testMayor.ratio}</p>
                            </div>
                        )
                    }

                </DialogInfo>
            )}

        </td>
    )
}