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
import { usePaletaStore } from "@/store/PaletaStore";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast"

export default function ExportPaleta() {
    const {paletaGlobal} = usePaletaStore();
    const [activeTab, setActiveTab] = useState<"CSS" | "JSON" | "TEXTO">("CSS");
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const {toast} = useToast()

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
        }else if( activeTab === "TEXTO"){
            const css = paletaGlobal.colores
                .map((color) => `${color.nombre}: ${color.hex}`)
                .join("\n");
            return `${css}\n`;
        }
        return "";
    };

    const copiarAlPortapapeles = () => {
        setLoading(true)
        const contenido = generarExportacion();
        navigator.clipboard.writeText(contenido)
            .then(() => {
                setOpen(false)
                toast({
                    title: `${activeTab} copiado al portapapeles.`,
                });
            })
            .catch((err) => {
                console.error("Error al copiar al portapapeles:", err);
                toast({
                    variant: 'destructive',
                    title: '¡Oh no!, No se pudo copiar. Inténtalo nuevamente.',
                });

            }).finally(()=>{
                setLoading(false)
            });
    };



    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    <ArrowUpCircle className="w-4 h-4" />
                    <span>Exportar</span>
                </Button>
            </DialogTrigger>


            <DialogContent className="max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Exportar</DialogTitle>
                    <DialogDescription>
                        Exportar paleta como variables CSS , objeto JSON o Texto plano
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="CSS" onValueChange={(value) => setActiveTab(value as "CSS" | "JSON" | "TEXTO")}>
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="CSS">Variables CSS</TabsTrigger>
                        <TabsTrigger value="JSON">JSON</TabsTrigger>
                        <TabsTrigger value="TEXTO">Texto plano</TabsTrigger>
                    </TabsList>

                    <TabsContent value="CSS">
                        <Card>
                            <Textarea className="min-h-56 max-h-56" value={generarExportacion()} readOnly   />
                        </Card>
                    </TabsContent>

                    <TabsContent value="JSON">
                        <Card>
                            <Textarea className="min-h-56 max-h-56" value={generarExportacion()} readOnly   />
                        </Card>
                    </TabsContent>

                    <TabsContent value="TEXTO">
                        <Card>
                            <Textarea className="min-h-56 max-h-56" value={generarExportacion()} readOnly   />
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