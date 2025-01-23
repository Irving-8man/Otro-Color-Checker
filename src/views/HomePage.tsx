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

            <section className="flex justify-center mt-10 px-20">
                <ul className="flex gap-6" ref={animationParent}>
                    {
                        colores.map((color) => (
                            <li key={color.id} >
                                <SheetColor color={color} onBorrarColor={eliminarColor} onActuliColor={actualizarColor}>
                                    <button
                                        style={{ backgroundColor: color.hex }}
                                        className="min-w-[100px] min-h-[300px] px-16 py-20 relative hover:scale-105 transition-all rounded-sm shadow-xl border border-gray-300">
                                        <h3
                                            className="bg-white inline-block absolute bottom-1 right-1 ">
                                            {color.nombre}-{color.hex}
                                        </h3>
                                    </button>
                                </SheetColor>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </main>
    )
}
