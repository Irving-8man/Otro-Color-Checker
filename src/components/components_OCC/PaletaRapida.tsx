import { useHistorialStore } from "@/store/HistorialStore";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function PaletaRapida() {
    const { paletaGlobal, actualizarColor } = useHistorialStore();
    const [animationParent] = useAutoAnimate({ duration: 150 })
    const { colores } = paletaGlobal

    const handleColorChange = (id: string, hex: string) => {
        actualizarColor({ id, hex, nombre: colores.find(color => color.id === id)?.nombre || ""  });
    };


    return (
        <div>
            <ul className="flex gap-2" ref={animationParent}>
                {
                    colores.map((color) => (
                        <li key={color.id} >

                            <input
                                type="color"
                                className="w-9 h-9 p-1 rounded-sm cursor-pointer"
                                value={color.hex}
                                onChange={(e) => handleColorChange(color.id, e.target.value)}
                            >
                            </input>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}