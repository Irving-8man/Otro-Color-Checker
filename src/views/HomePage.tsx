import { PaletaColor } from "@/types/tpyes";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownCircle, ArrowUpCircle, Plus } from "lucide-react";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import NavBar from "@/components/components_OCC/NavBar";
import SheetColor from "@/components/components_OCC/SheetColor";


// Paleta predeterminada
const defaultPaleta: PaletaColor = {
    id: "1",
    nombre: "MiPaleta",
    colores: [{ id: "1", nombre: "color1", hex: "#ff5733" }, { id: "2", nombre: "color2", hex: "#33cfff" }, { id: "3", nombre: "color3", hex: "#000" }],
    fechaCreado: Date.now().toString(),
    fechadActualizado: Date.now().toString(),
};

export default function HomePage() {
    const [paleta,setPaleta] = useState(defaultPaleta);
    const [animationParent] = useAutoAnimate({duration:150})
    const { colores } = paleta;

    // Manejar nuevo color
    const handleAddColor = () => {
        const newColor = {
            id: Date.now().toString(),
            nombre: `Color ${colores.length + 1}`,
            hex: "#fff",
        };
        setPaleta((prev) => ({
            ...prev,
            colores: [...prev.colores, newColor],
            fechadActualizado: Date.now().toString(),
        }));
    };

    return (
        <main>
            <NavBar paleta={paleta} />
            <hr />

            <section className="mt-4">
                <article className="flex justify-end">
                    <ul className="flex gap-4 px-20">
                        <li>

                        </li>
                        <li>
                            <Button className="items-center" onClick={handleAddColor}>
                                <Plus />
                                <span>Nuevo color</span>
                            </Button>
                        </li>
                        <li>
                            <Button variant={"secondary"}>
                                <ArrowDownCircle className="w-4 h-4" />
                                <span>Importar</span>
                            </Button>
                        </li>
                        <li>
                            <Button variant={"secondary"}>
                                <ArrowUpCircle className="w-4 h-4" />
                                <span>Exportar</span>
                            </Button>
                        </li>
                    </ul>
                </article>
            </section>

            <section className="flex justify-center mt-10 px-20">
                <ul className="flex gap-1 flex-col-reverse" ref={animationParent}>
                    {
                        colores.map((color) => (
                            <li key={color.id} >
                                <SheetColor color={color}>
                                    <div
                                        style={{ backgroundColor: color.hex }}
                                        className="min-w-[670px] px-20 py-10 relative hover:scale-105 transition-all rounded-sm shadow-xl border border-gray-300">
                                        <h3
                                            className="bg-white inline-block absolute bottom-1 right-1 ">
                                            {color.nombre}-{color.hex}
                                        </h3>
                                    </div>
                                </SheetColor>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </main>
    )
}
