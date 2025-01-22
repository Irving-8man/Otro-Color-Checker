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


export default function ImportPaleta() {
    //Estados
    const [cssInput, setCssInput] = useState<string>(":root {\n  --nuevoColor1: #0D433F;\n  --nuevoColor2: #5BB0A9;\n}");
    const [jsonInput, setJsonInput] = useState<string>(JSON.stringify({
        paleta: [
            { nombre: "color1", hex: "#ff5733" },
            { nombre: "color2", hex: "#33cfff" },
        ]
    }, null, 2));
    const [activeTab, setActiveTab] = useState<"CSS" | "JSON">("CSS");
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);



    const handleImport = () => {
        try {
            setLoading(true);
            if (activeTab === "CSS") {
                const cssVariables = cssInput
                    .match(/--([\w-]+):\s*#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})/g)
                    ?.map(variable => {
                        const [key, value] = variable.split(":").map(v => v.trim());
                        return { nombre: key.replace("--", ""), hex: value };
                    });

                if (!cssVariables) {
                    setLoading(false);
                    throw new Error("Formato CSS inválido.");
                } else {
                    console.log("CSS Importado:", cssVariables);
                    setOpen(false);
                }


            } else if (activeTab === "JSON") {
                const parsedJson = JSON.parse(jsonInput);
                if (!parsedJson.paleta || !Array.isArray(parsedJson.paleta)) {
                    setLoading(false);
                    throw new Error("El JSON no tiene un formato válido.");
                } else {
                    console.log("JSON Importado:", parsedJson.paleta);
                    setOpen(false);
                }

            }
        } catch (error) {
            console.error("Error al importar la paleta:", error);
            alert("Error al importar. Revisa el formato.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"secondary"}>
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
                            <Textarea className="min-h-56 max-h-56" value={cssInput} disabled={loading} onChange={(e) => setCssInput(e.target.value)} />
                        </Card>
                    </TabsContent>

                    <TabsContent value="JSON">
                        <Card>
                            <Textarea className="min-h-56 max-h-56" value={jsonInput} disabled={loading} onChange={(e) => setJsonInput(e.target.value)} />
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