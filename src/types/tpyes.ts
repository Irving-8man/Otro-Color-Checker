
export interface Color {
	id: string;
	nombre: string;
	hex: string;
}


export interface PaletaColor {
	id: string;
	nombre: string;
	fechaCreado: string;
	fechadActualizado: string;
	colores: Color[]
}


export interface colorRGB {
	r: number;
	g: number;
	b: number;
}

export interface Combinacion {
    color1: Color;
    color2: Color;
    esMismoColor: boolean;
}


export interface ResultadoTest{
	nivel:string;
	resultado:boolean;
	ratio:number;
}
