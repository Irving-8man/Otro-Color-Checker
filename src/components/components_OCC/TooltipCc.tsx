import { Combinacion, ResultadoTest } from '@/types/tpyes';
import { ReactNode } from 'react';
import { Tooltip } from 'react-tooltip';

export default function TooltipCc({
    children,
    resultados,
    combinacion
}: { children: ReactNode, resultados: ResultadoTest[] ,  combinacion:Combinacion}) {

    return (
        <div className='mt-1'>
            <p data-tooltip-id={combinacion.id} data-tooltip-place='top'>{children}</p>
            <Tooltip className='z-50' id={combinacion.id} >
                <div className='flex gap-2'>
                    {
                        resultados.map(({ resultado,id }) => {
                            const stylo = resultado ? "green" : "red";
                            return (<span key={id} className="w-3 border border-white h-3 rounded-full inline-block" style={{ backgroundColor: stylo }}></span>)
                        })
                    }
                </div>
            </Tooltip>
        </div>
    )
}