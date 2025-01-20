
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


export interface AppState {
	palette: PaletaColor | null; // Puede iniciar vacío
	historial: PaletaColor[]; // Historial de paletas modificadas
	setPaletaColor: (paleta: PaletaColor) => void;
	saveToHistory: () => void;
}