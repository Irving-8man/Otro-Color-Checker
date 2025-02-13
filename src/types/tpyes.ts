
export interface ColorSimple{
	nombre: string;
	hex: string;
}

export interface Color extends ColorSimple {
	id: string;
}


export interface PaletaColor {
	id: string;
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
	id:string;
    color1: Color;
    color2: Color;
    esMismoColor: boolean;
}


export interface ResultadoTest{
	id: string;
	nivel:string;
	resultado:boolean;
	ratio:number;
}


export interface TestNivel{
	nombre:string;
}
