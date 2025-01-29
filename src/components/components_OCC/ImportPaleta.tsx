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
import { ArrowDownCircle } from "lucide-react"
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
import { useState } from "react"
import { useHistorialStore } from "@/store/HistorialStore"
import { ColorSimple } from "@/types/tpyes"
import { useToast } from "@/hooks/use-toast"



export default function ImportPaleta() {
    // Estados iniciales
    const initialCssInput = ":root {\n  --nuevoColor1: #0D433F;\n  --nuevoColor2: #5BB0A9;\n}";
    const initialJsonInput = JSON.stringify(
        {
            paleta: [
                { nombre: "nuevocolor1", hex: "#000000" },
                { nombre: "nuevocolor2", hex: "#ffffff" },
            ],
        },
        null,
        2
    );

    const [cssInput, setCssInput] = useState<string>(initialCssInput);
    const [jsonInput, setJsonInput] = useState<string>(initialJsonInput);
    const [activeTab, setActiveTab] = useState<"CSS" | "JSON">("CSS");
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const { importarColores } = useHistorialStore();
    const { toast } = useToast()

    // Restablece los estados al cerrar el diálogo
    const handleDialogClose = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            reinciarData()
        }
    };

    const reinciarData = () => {
        setCssInput(initialCssInput);
        setJsonInput(initialJsonInput);
        setActiveTab("CSS");
    }

    const isValidHex = (hex: string) => /^#[0-9A-Fa-f]{6}$|^#[0-9A-Fa-f]{3}$/.test(hex);

    const handleImport = () => {
        let exito: boolean = false;

        try {
            setLoading(true);
            if (activeTab === "CSS") {
                const cssVariables = cssInput
                    .match(/--([\w-]+):\s*#[0-9A-Fa-f]{3,6}/g) // Captura todas las líneas con formato --variable: #hex
                    ?.map((line) => {
                        const [key, value] = line.split(":").map((v) => v.trim());
                        return { nombre: key.replace("--", ""), hex: value };
                    });
                if (
                    !cssVariables ||
                    cssVariables.length === 0 ||
                    cssVariables.some(
                        (color) =>
                            !color.nombre ||
                            !color.hex ||
                            !isValidHex(color.hex)
                    )
                ) {
                    throw new Error("Formato CSS inválido.");
                } else {
                    setOpen(false);
                    reinciarData()
                    exito = importarColores(cssVariables)
                }

            } else if (activeTab === "JSON") {
                const parsedJson = JSON.parse(jsonInput);

                if (!parsedJson.paleta ||
                    !Array.isArray(parsedJson.paleta) ||
                    parsedJson.paleta.some(
                        (color: ColorSimple) => !color.nombre || !color.hex || !isValidHex(color.hex)
                    )) {
                    throw new Error("El JSON no tiene un formato válido.");
                } else {
                    setOpen(false);
                    reinciarData()
                    exito = importarColores(parsedJson.paleta)
                }
            }

            if (exito) {
                toast({
                    title: 'Paleta importada con exito.',
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: '¡Oh no!, la paleta no se ha importado.',
                });
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: `¡Oh no!, Error al importar. ${error}.`,
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    <ArrowDownCircle className="w-4 h-4" />
                    <span>Importar</span>
                </Button>
            </DialogTrigger>


            <DialogContent className="max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Importar</DialogTitle>
                    <DialogDescription>
                        Importa tu paleta como variables CSS u objeto JSON
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="CSS" onValueChange={(value) => setActiveTab(value as "CSS" | "JSON")}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="CSS">Variables CSS</TabsTrigger>
                        <TabsTrigger value="JSON">JSON</TabsTrigger>
                    </TabsList>

                    <TabsContent value="CSS">
                        <Card>
                            <Textarea className="min-h-56 max-h-56 resize-none" value={cssInput} disabled={loading} onChange={(e) => setCssInput(e.target.value)} />
                        </Card>
                    </TabsContent>

                    <TabsContent value="JSON">
                        <Card>
                            <Textarea className="min-h-56 max-h-56 resize-none" value={jsonInput} disabled={loading} onChange={(e) => setJsonInput(e.target.value)} />
                        </Card>
                    </TabsContent>
                </Tabs>

                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button variant={"ghost"} disabled={loading}>Cancelar</Button>
                    </DialogClose>
                    <Button onClick={handleImport} disabled={loading}>Importar {activeTab}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}