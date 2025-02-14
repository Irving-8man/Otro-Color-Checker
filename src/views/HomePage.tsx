import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import SheetColor from "@/components/components_OCC/SheetColor";
import { usePaletaStore } from "@/store/PaletaStore";
import ImportPaleta from "@/components/components_OCC/ImportPaleta";
import ExportPaleta from "@/components/components_OCC/ExportPaleta";
import { generarId } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
    const { paletaGlobal, agregarColor, actualizarColor, eliminarColor } = usePaletaStore();
    const [animationParent] = useAutoAnimate({ duration: 150 })
    const { colores } = paletaGlobal;
    const { toast } = useToast();

    // Manejar nuevo color
    const handleNuevoColor = () => {
        const nuevoColor = {
            id: generarId(),
            nombre: `tokenColor${colores.length + 1}`,
            hex: "#000000",
        };
        const exito = agregarColor(nuevoColor);
        if (exito) {
            toast({
                title: 'Color agregado a la paleta.',
            });
        } else {
            toast({
                variant: 'destructive',
                title: '¡Oh no!, solo puedes tener 6 colores en la paleta.',
            });
        }
    };

    return (
        <main>
            <section className="mt-4">
                <article className="flex justify-center md:justify-end">
                    <ul className="grid grid-cols-2 justify-items-center gap-4 md:flex lg:gap-4 px-6 md:px-20">
                        <li className="col-span-2">
                            <Button className="items-center" onClick={handleNuevoColor}>
                                <Plus />
                                <span>Nuevo color</span>
                            </Button>
                        </li>
                        <li>
                            <ImportPaleta />
                        </li>
                        <li>
                            <ExportPaleta />
                        </li>
                    </ul>
                </article>
            </section>

            <section className="flex justify-center mt-10 px-6 md:px-20">
                <ul
                    className="flex flex-wrap md:flex-nowrap gap-4 justify-center"
                    ref={animationParent}
                >
                    {colores.map((color) => (
                        <li key={color.id}>
                            <SheetColor
                                color={color}
                                onBorrarColor={eliminarColor}
                                onActuliColor={actualizarColor}
                            >
                                <button
                                    className="group relative transition-transform transform hover:scale-105 border"
                                >
                                    {/* Caja de color */}
                                    <div
                                        className="min-w-[120px] min-h-[180px] sm:min-h-[250px] md:min-h-[320px] rounded-t-sm"
                                        style={{ backgroundColor: color.hex }}
                                    ></div>

                                    {/* Detalles */}
                                    <div className="flex flex-col items-center bg-white p-2 rounded-b-sm shadow-md group-hover:shadow-lg transition-all">
                                        <h2 className="text-sm md:text-sm font-medium text-gray-700 token-name">
                                            {color.nombre}
                                        </h2>
                                        <span className="text-xs md:text-sm text-gray-500">
                                            {color.hex}
                                        </span>
                                    </div>
                                </button>
                            </SheetColor>
                        </li>
                    ))}
                </ul>
            </section>

        </main>
    )
}
