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
import { ReactNode, useEffect, useState } from "react"
import { Chrome } from '@uiw/react-color';
import * as v from "valibot";
import { Input } from "../ui/input";
import { toast } from "sonner";

// Esquema de validación con Valibot
const colorNameSchema = v.object({
    nombre: v.pipe(
        v.string(),
        v.nonEmpty("El nombre no puede estar vacío."),
        v.minLength(1, "El nombre debe tener al menos 1 carácter.")
    ),
});


export default function SheetColor(
    {
        children,
        color,
        onBorrarColor,
        onActuliColor
    }: {
        children: ReactNode,
        color: Color,
        onBorrarColor: (id: string) => boolean;
        onActuliColor: (updatedColor: Color) => boolean;
    }
) {
    //Parte del color
    const [nombreColor, setNombreColor] = useState(color.nombre)
    const [colorLocal, setColorLocal] = useState(color);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        setColorLocal(color);
        setNombreColor(color.nombre);
    }, [color]);


    // Resetear estados locales al abrir/cerrar el Sheet
    const handleSheetChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            // Restaurar valores originales si se cierra sin guardar
            setColorLocal(color);
            setNombreColor(color.nombre);
            setError(null);
        }
    };


    const handleColorChange = (nuevoColor: { hex: string }) => {
        setColorLocal((prev) => ({ ...prev, hex: nuevoColor.hex }));
    };

    const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombreColor(event.target.value);
    };


    // Manejar guardado de cambios
    const handleGuardarCambios = () => {
        // Validar el nombre del color
        const result = v.safeParse(colorNameSchema, { nombre: nombreColor });

        if (!result.success) {
            setError(result.issues[0].message);
            return;
        }

        setError(null);
        const updatedColor = { ...colorLocal, nombre: nombreColor };
        const exito = onActuliColor(updatedColor); // Actualizar estado global
        if (exito) {
            setOpen(false)
            toast.success("Color actualizado", {
                closeButton: true
            });
        } else {
            toast.error("¡Oh no!, ha fallado actulizar el color", {
                closeButton: true
            });
        }
    };


    const handleEliminarColor = (id: string) => {
        const exito = onBorrarColor(id)
        if (exito) {
            toast.success('Color eliminado de la paleta',{
                closeButton:true
            });
        } else {
            toast.error('¡Oh no!, son necesarios 2 colores para la paleta',{
                closeButton:true
            });
        }
    }

    return (
        <Sheet open={open} onOpenChange={handleSheetChange}>
            <SheetTrigger asChild>
                {
                    children
                }
            </SheetTrigger>
            <SheetContent className="bge">
                <SheetHeader>
                    <SheetTitle>Editar color</SheetTitle>
                    <SheetDescription>
                        Realiza los cambios a tu color.
                    </SheetDescription>
                </SheetHeader>
                <div className="mt-2 mb-8">

                    <div className="flex flex-col gap-2">
                        <Input
                            type="text"
                            value={nombreColor}
                            onChange={handleNombreChange}
                            placeholder={color.nombre}
                            className="py-6 border rounded-md"
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>

                    <div className="flex justify-start mt-6">
                        <Chrome
                            color={colorLocal.hex}
                            onChange={handleColorChange}
                            showAlpha={false}
                            className="mt-4"
                        />
                    </div>

                </div>
                <SheetFooter className="gap-3">
                    <SheetClose asChild>
                        <Button variant={"destructive"} onClick={() => handleEliminarColor(color.id)}>Eliminar</Button>
                    </SheetClose>
                    <Button onClick={handleGuardarCambios}>Guardar cambios</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
