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

export default function SheetColor(
    {
        children,
        color,
        onBorrarColor,
        onActuliColor
    }: {
        children: ReactNode,
        color: Color,
        onBorrarColor: (id: string) => void;
        onActuliColor: (updatedColor: Color) => void;
    }
) {
    //Parte del color
    const [nombreColor, setNombreColor] = useState(color.nombre)
    const [colorLocal, setColorLocal] = useState(color);
    const [error, setError] = useState<string | null>(null);
    const [open,setOpen] = useState<boolean>(false)

    // Esquema de validación con Valibot
    const colorNameSchema = v.object({
        nombre: v.pipe(
            v.string(),
            v.nonEmpty("El nombre no puede estar vacío."),
            v.minLength(1, "El nombre debe tener al menos 1 carácter."),
            v.maxLength(15, "El nombre no puede tener más de 15 caracteres.")
        ),
    });

    //Escuchar los cambios
    useEffect(() => {
        setColorLocal(color);
        setNombreColor(color.nombre);
    }, [color]);


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
        onActuliColor(updatedColor); // Actualizar estado global
        setOpen(false)
    };



    /*
    // Manejar cambio de color al seleccionar uno nuevo
    const handleColorChange = (nuevoColor: { hex: string }) => {
        if (nuevoColor.hex !== colorLocal.hex) {
            const updatedColor = { ...colorLocal, hex: nuevoColor.hex };
            setColorLocal(updatedColor);
            onActuliColor(updatedColor);
        }
    };

    // Función para manejar el cambio en el nombre del color
    const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nuevoNombre = event.target.value;
        if (nuevoNombre !== nombreColor) {
            setNombreColor(nuevoNombre);
            const updateColor = { ...colorLocal, nombre: nuevoNombre };
            onActuliColor(updateColor);
        }
    };
*/

    return (
        <Sheet open={open} onOpenChange={setOpen}>
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
                <div className="grid gap-4 py-4">
                    <input
                        type="text"
                        value={nombreColor}
                        onChange={handleNombreChange}
                        placeholder={color.nombre}
                        className="p-2 border rounded-md"
                    />

                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

                    <Chrome
                        color={colorLocal.hex}
                        onChange={handleColorChange}
                        showAlpha={false}
                    />
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant={"destructive"} onClick={() => onBorrarColor(color.id)}>Eliminar</Button>
                    </SheetClose>

                    <Button onClick={handleGuardarCambios}>Guardar cambios</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
