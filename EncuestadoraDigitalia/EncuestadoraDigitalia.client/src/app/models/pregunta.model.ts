// ---------------------------------------
// Email: quickapp@ebenmonney.com
// Templates: www.ebenmonney.com/templates
// (c) 2024 www.ebenmonney.com/mit-license
// ---------------------------------------

import { Alternativa } from './alternativa.model';

export class Pregunta {
  constructor(
    public descripcion = '',
    public alternativas: Alternativa[] = []
  ) { }

  public id = 0;
}
