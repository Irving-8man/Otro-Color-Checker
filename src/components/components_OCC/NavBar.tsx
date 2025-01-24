import { Button } from "@/components/ui/button";
import { Eye, Grid2x2, ScanEye ,Palette} from "lucide-react";
import { Link } from "wouter";


export default function NavBar() {

    
    const RUTAS_APP = [
        {
            nombre: "Paleta",
            link: "/",
            icon: Palette
        },
        {
            nombre: "Accesibilidad",
            link: "/matriz-accesibilidad",
            icon: Grid2x2 
        },{
            nombre: "En acción",
            link: "/vista-previa",
            icon: Eye
        },{
            nombre:"Daltonismo",
            link:"/daltonismo",
            icon: ScanEye
        }
        
    ]

    return (
        <div className="fixed bottom-0 lg:static w-full bge flex justify-between lg:justify-start items-center lg:gap-5 px-1 lg:px-20 mt-3 mb-2">
            <nav>
                <ul className="flex justify-between lg:gap-4">
                    {
                        RUTAS_APP.map((Ruta) => (
                            <li key={Ruta.nombre}>
                                <Button asChild variant="link" className="font-normal border border-gray-200" >
                                    <Link to={Ruta.link}>
                                        <Ruta.icon className="h-4 w-4" />
                                        <span className="text-wrap">{Ruta.nombre}</span>
                                    </Link>
                                </Button>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}

