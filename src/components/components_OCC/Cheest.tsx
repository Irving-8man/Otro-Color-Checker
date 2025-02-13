import { ResultadoTest } from "@/types/tpyes";

export default function Cheest({
    resultados
}: { resultados: ResultadoTest[] }) {

    return (
        <div>
            {
                resultados.map(({ resultado, nivel }) => {
                    const stylo = !resultado ? "red" : "green";
                    return (<span key={nivel} className="w-2 h-2 rounded-full bg-black inline-block" style={{backgroundColor:stylo}}></span>)
                })
            }

        </div>
    )
}