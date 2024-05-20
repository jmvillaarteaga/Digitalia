// ---------------------------------------
// Email: quickapp@ebenmonney.com
// Templates: www.ebenmonney.com/templates
// (c) 2024 www.ebenmonney.com/mit-license
// ---------------------------------------

import { Pregunta } from './pregunta.model';

export class Encuesta {
  constructor(
    public descripcion = '',
    public preguntas: Pregunta[] = []
  ) { }

  public id = 0;
}
