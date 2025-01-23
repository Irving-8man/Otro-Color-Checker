import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { ArrowUpCircle } from "lucide-react"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../ui/tabs"
import {
    Card,
} from "../ui/card"
import { Textarea } from "../ui/textarea"
import { useHistorialStore } from "@/store/HistorialStore";
import { useState } from "react";

export default function ExportPaleta() {
    const {paletaGlobal} = useHistorialStore();
    const [activeTab, setActiveTab] = useState<"CSS" | "JSON">("CSS");
    const [loading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const generarExportacion = () => {
        if (activeTab === "CSS") {
            const css = paletaGlobal.colores
                .map((color) => `  --${color.nombre}: ${color.hex};`)
                .join("\n");
            return `:root {\n${css}\n}`;
        } else if (activeTab === "JSON") {
            const json = JSON.stringify(
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                { paleta: paletaGlobal.colores.map(({ id, ...rest }) => rest) },
                null,
                2
            );
            return json;
        }
        return "";
    };

    const copiarAlPortapapeles = () => {
        const contenido = generarExportacion();
        navigator.clipboard.writeText(contenido)
            .then(() => {
                alert(`${activeTab} copiado al portapapeles.`);
            })
            .catch((err) => {
                console.error("Error al copiar al portapapeles:", err);
                alert("No se pudo copiar. Inténtalo nuevamente.");
            });
    };



    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"secondary"}>
                    <ArrowUpCircle className="w-4 h-4" />
                    <span>Exportar</span>
                </Button>
            </DialogTrigger>


            <DialogContent className="max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Exportar</DialogTitle>
                    <DialogDescription>
                        Exportar paleta como variables CSS u objeto JSON
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="CSS" onValueChange={(value) => setActiveTab(value as "CSS" | "JSON")}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="CSS">Variables CSS</TabsTrigger>
                        <TabsTrigger value="JSON">JSON</TabsTrigger>
                    </TabsList>

                    <TabsContent value="CSS">
                        <Card>
                            <Textarea className="min-h-56 max-h-56" value={generarExportacion()} readOnly  disabled={loading}  />
                        </Card>
                    </TabsContent>

                    <TabsContent value="JSON">
                        <Card>
                            <Textarea className="min-h-56 max-h-56" value={generarExportacion()} readOnly disabled={loading}  />
                        </Card>
                    </TabsContent>
                </Tabs>

                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button variant={"ghost"} disabled={loading}>Cancelar</Button>
                    </DialogClose>
                    <Button  disabled={loading} onClick={copiarAlPortapapeles}>Copiar en Portapapeles</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}