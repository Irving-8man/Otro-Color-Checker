import { Button } from "@/components/ui/button";
import { Eye, Grid2x2, ScanEye ,Palette} from "lucide-react";
import { Link } from "wouter";
import PaletaRapida from "./PaletaRapida";


export default function NavBar() {

    
    const RUTAS_APP = [
        {
            nombre: "Mi Paleta",
            link: "/",
            icon: Palette
        },
        {
            nombre: "Matriz de accesibilidad",
            link: "/matriz-accesibilidad",
            icon: Grid2x2 
        },{
            nombre: "Vista Previa",
            link: "/vista-previa",
            icon: Eye
        },{
            nombre:"Daltonismo",
            link:"/daltonismo",
            icon: ScanEye
        }
        
    ]

    return (
        <div className="flex justify-between items-center gap-5 px-20 mt-3 mb-2">
            <nav>
                <ul className="flex justify-between gap-4">
                    {
                        RUTAS_APP.map((Ruta) => (

                            <li key={Ruta.nombre}>
                                <Button asChild variant="link" className="font-normal border border-gray-200">
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

            <PaletaRapida />
        </div>
    )
}

