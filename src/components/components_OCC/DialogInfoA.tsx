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
import { ResultadoTest } from "@/types/tpyes";
import { ReactNode } from "react";




export default function DialogInfo(
    { children, resultados }:
    { children: ReactNode, resultados: ResultadoTest[] }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        {
                            resultados.map(({ nivel, resultado }, idx) => (
                                <p key={idx}>{nivel}-{resultado ? "pasa" : "no pasa"}</p>
                            ))
                        }
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>

                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}