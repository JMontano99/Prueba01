// MODELO DE EJEMPLO, BORRAR EN PROYECTO REAL
export interface IColorsRes {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IColor[];
}

export interface IColorRes {
  data: IColor;
}

export interface IColor {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}
