import { Grid2x2, Palette } from "lucide-react";
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
        },/* {
            nombre: "En acción",
            link: "/vista-previa",
            icon: Eye
        }, {
            nombre: "Daltonismo",
            link: "/daltonismo",
            icon: ScanEye
        }*/

    ]

    return (
        <div className="w-full flex justify-between  mt-3 mb-2  lg:justify-start items-center lg:gap-5 px-3 md:px-10 lg:px-20">
            <nav>
                <ul className="flex justify-between lg:gap-4">
                    {
                        RUTAS_APP.map((Ruta) => (
                            <li key={Ruta.nombre}>
                            
                                <Link to={Ruta.link} className="inline-flex items-center gap-1 rounded-sm px-2 py-2 hover:underline font-normal ">
                                    <Ruta.icon className="h-4 w-4" />
                                    <span className="text-wrap">{Ruta.nombre}</span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}

