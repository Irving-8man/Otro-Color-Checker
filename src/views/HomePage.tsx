import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import SheetColor from "@/components/components_OCC/SheetColor";
import { useHistorialStore } from "@/store/HistorialStore";
import ImportPaleta from "@/components/components_OCC/ImportPaleta";
import ExportPaleta from "@/components/components_OCC/ExportPaleta";



export default function HomePage() {
    const { paletaGlobal, agregarColor, actualizarColor, eliminarColor } = useHistorialStore();
    const [animationParent] = useAutoAnimate({ duration: 150 })
    const { colores } = paletaGlobal;

    // Manejar nuevo color
    const handleNuevoColor = () => {
        const nuevoColor = {
            id: Date.now().toString(),
            nombre: `Color ${colores.length + 1}`,
            hex: "#000000",
        };
        agregarColor(nuevoColor);
    };

    return (
        <main>
            <section className="mt-4">
                <article className="flex justify-end">
                    <ul className="flex gap-4 px-20">
                        <li>
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
                    className="flex flex-wrap gap-4 justify-center"
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
                                    className="group relative transition-transform transform hover:scale-105"
                                >
                                    {/* Caja de color */}
                                    <div
                                        className="min-w-[120px] min-h-[180px] sm:min-h-[250px] md:min-h-[350px] rounded-t-sm"
                                        style={{ backgroundColor: color.hex }}
                                    ></div>

                                    {/* Detalles */}
                                    <div className="flex flex-col items-center bg-white p-2 rounded-b-sm shadow-md group-hover:shadow-lg transition-all">
                                        <h3 className="text-sm md:text-base font-semibold text-gray-700 token-name">
                                            {color.nombre}
                                        </h3>
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
