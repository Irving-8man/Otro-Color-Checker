import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Color } from "@/types/tpyes"
import { ReactNode } from "react"

export default function SheetColor({children, color}:{children:ReactNode, color:Color}) {

    return (
        <Sheet>
            <SheetTrigger asChild>
                {
                    children
                }
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Editar color</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    {color.nombre}
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
