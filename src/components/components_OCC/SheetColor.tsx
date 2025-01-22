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

    //Escuchar los cambios
    useEffect(() => {
        setColorLocal(color);
        setNombreColor(color.nombre);
    }, [color]);


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

                    <Chrome
                        style={{ marginLeft: 20 }}
                        color={colorLocal.hex}
                        onChange={handleColorChange}
                        showAlpha={false}
                    />
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button onClick={() => onBorrarColor(color.id)}>Eliminar</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
