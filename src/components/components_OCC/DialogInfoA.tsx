import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Combinacion, ResultadoTest } from "@/types/tpyes";
import { ReactNode } from "react";
import { Button } from "../ui/button";




export default function DialogInfo(
    {
        children,
        resultados,
        combinacion

    }: { children: ReactNode, resultados: ResultadoTest[], combinacion: Combinacion }
) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Resultados de la Prueba de Contraste WCAG</DialogTitle>
                    <DialogDescription>
                        Evaluación de accesibilidad: contraste entre fondo y texto.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="mb-5 mt-2 flex justify-center gap-6">
                        <div className="inline-flex gap-2 items-center">
                            <span className="">Fondo:</span>
                            <div className="w-10 h-6" style={{ backgroundColor: combinacion.color1.hex }}></div>
                        </div>

                        <div className="inline-flex gap-2 items-center">
                            <span className="">Texto:</span>
                            <div className="w-10 h-6" style={{ backgroundColor: combinacion.color2.hex }}></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 grid-rows-2 flex-1 gap-x-2 gap-y-6 border border-gray-300 px-3 py-3 rounded-sm">
                        {
                            resultados.map(({ nivel, resultado }, idx) => (
                                <div key={combinacion.id + idx} >
                                    <p className="mb-1"><span className="font-medium">({idx+1})</span> {nivel}</p>
                                    <span className="text-[15px]">{resultado ? "✅ Cumple" : "❌ No cumple"}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <DialogFooter className="">
                    <DialogClose asChild>
                        <Button variant={"default"}>Cerrar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}