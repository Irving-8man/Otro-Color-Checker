import { PaletaColor } from "@/types/tpyes";
import { Button } from "@/components/ui/button";
import { Eye, Grid2x2, History } from "lucide-react";
import { Link } from "wouter";


export default function NavBar({ paleta }: { paleta: PaletaColor }) {
    const RUTAS_APP = [
        {
            nombre: "Matriz de accesibilidad",
            link: "/matriz-accesibilidad",
            icon: Grid2x2 
        },{
            nombre: "Vista Previa",
            link: "/vista-previa",
            icon: Eye
        },{
            nombre:"Historial",
            link:"/historial",
            icon: History
        }
        
    ]

    return (
        <aside className="flex justify-start items-center gap-5 px-20 mt-3">
            <h2 className="text-lg font-semibold">{paleta.nombre}</h2>
            <nav>
                <ul className="flex justify-between gap-2">
                    {
                        RUTAS_APP.map((Ruta) => (

                            <li key={Ruta.nombre}>
                                <Button asChild variant="link" className="font-normal">
                                    <Link to={Ruta.link}>
                                        <Ruta.icon className="h-4 w-4" />
                                        <span>{Ruta.nombre}</span>
                                    </Link>
                                </Button>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </aside>
    )
}

