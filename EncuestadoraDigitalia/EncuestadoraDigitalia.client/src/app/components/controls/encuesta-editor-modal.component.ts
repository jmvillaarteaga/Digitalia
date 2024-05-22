// ---------------------------------------
// Email: quickapp@ebenmonney.com
// Templates: www.ebenmonney.com/templates
// (c) 2024 www.ebenmonney.com/mit-license
// ---------------------------------------

import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableColumn } from '@swimlane/ngx-datatable';

import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { AppTranslationService } from '../../services/app-translation.service';
//import { AccountService } from '../../services/account.service';
//import { Utilities } from '../../services/utilities';
//import { Role } from '../../models/role.model';
//import { RoleEditorComponent } from './role-editor.component';
//import { Encuesta } from '../../models/encuesta.model';
import { Pregunta } from '../../models/pregunta.model';
import { EncuestadoraService } from '../../services/encuestadora.service';
import { Alternativa } from '../../models/alternativa.model';
//import { Alternativa } from '../../models/alternativa.model';

interface AlternativaIndex extends Alternativa {
  index: number;
}

@Component({
  selector: 'app-encuesta-modal-editor',
  templateUrl: './encuesta-editor-modal.component.html',
  styleUrl: './encuesta-editor-modal.component.scss'
})

export class EncuestaEditorModalComponent implements OnInit {
  columnsAlternativas: TableColumn[] = [];
  rowsAlternativas: AlternativaIndex[] = [];
  rowsCacheAlternativas: AlternativaIndex[] = [];
  //allAlternativas: Alternativa[] = [];
  //editedEncuesta: Encuesta | null = null;
  //sourceEncuesta: Encuesta | null = null;
  newPreguntaDescripcion: { descripcion: string } | null = null;
  newAlternativaDescripcion: { descripcion: string } | null = null;
  loadingIndicatorAlternativa = false;
  isSavingPregunta = false;

  newPregunta: Pregunta = new Pregunta();
  newAlternativa: Alternativa = new Alternativa();
  @Output() cancelarPreguntaEvent = new EventEmitter<string>();

  @Output() grabarPreguntaEvent = new EventEmitter<Pregunta>();

  @ViewChild('indexTemplateAlternativa', { static: true })
  indexTemplateAlternativa!: TemplateRef<unknown>;

  @ViewChild('actionsTemplateAlternativa', { static: true })
  actionsTemplateAlternativa!: TemplateRef<unknown>;
  //encuestaEditor: RoleEditorComponent | null = null;

  constructor(private alertService: AlertService, private translationService: AppTranslationService,
    private encuestadoraService: EncuestadoraService, private modalService: NgbModal) {
  }

  ngOnInit() {
    //const gT = (key: string) => this.translationService.getTranslation(key);
    this.columnsAlternativas = [
      { prop: 'index', name: '#', width: 50, cellTemplate: this.indexTemplateAlternativa, canAutoResize: false },
      { prop: 'descripcion', name: 'Alternativa', width: 320 },
      { name: 'Acción', width: 160, cellTemplate: this.actionsTemplateAlternativa, resizeable: false, canAutoResize: false, sortable: false, draggable: false }
    ];

   // this.loadData();
  }

  //setRoleEditorComponent(roleEditor: RoleEditorComponent) {
    //this.roleEditor = roleEditor;

    //if (this.sourceRole == null)
    //  this.editedRole = this.roleEditor.newRole(this.allPermissions);
    //else
    //  this.editedRole = this.roleEditor.editRole(this.sourceRole, this.allPermissions);
  //}

  //addNewRoleToList() {
    //if (this.sourceRole) {
    //  Object.assign(this.sourceRole, this.editedRole);

    //  let sourceIndex = this.rowsCache.indexOf(this.sourceRole, 0);
    //  if (sourceIndex > -1) {
    //    Utilities.moveArrayItem(this.rowsCache, sourceIndex, 0);
    //  }

    //  sourceIndex = this.rows.indexOf(this.sourceRole, 0);
    //  if (sourceIndex > -1) {
    //    Utilities.moveArrayItem(this.rows, sourceIndex, 0);
    //  }

    //  this.editedRole = null;
    //  this.sourceRole = null;
    //} else {
    //  const role = new Role();
    //  Object.assign(role, this.editedRole);
    //  this.editedRole = null;

    //  let maxIndex = 0;
    //  for (const r of this.rowsCache) {
    //    if ((r as EncuestaIndex).index > maxIndex) {
    //      maxIndex = (r as EncuestaIndex).index;
    //    }
    //  }

    //  (role as EncuestaIndex).index = maxIndex + 1;

    //  this.rowsCache.splice(0, 0, role);
    //  this.rows.splice(0, 0, role);
    //  this.rows = [...this.rows];
    //}
  //}

  //loadData() {
  //  this.alertService.startLoadingMessage();
  //  this.loadingIndicatorPregunta = true;

  //  this.encuestadoraService.getEncuestas(1,10)
  //    .subscribe({
  //      next: results => {
  //        this.alertService.stopLoadingMessage();
  //        this.loadingIndicatorPregunta = false;
  //        const encuestas = results[0];

  //        //encuestas.forEach((encuesta, index) => {
  //        //  (encuesta as PreguntaIndex).index = index + 1;
  //        //  (encuesta as PreguntaIndex).cantidadAlternativas = encuesta.preguntas.length;
  //        //});

  //        //this.rowsCachePreguntas = [...encuestas];
  //        //this.rowsPreguntas = encuestas;

  //      },
  //      error: error => {
  //        this.alertService.stopLoadingMessage();
  //        this.loadingIndicatorPregunta = false;

  //        this.alertService.showStickyMessage('Load Error',
  //          `Unable to retrieve encuestas from the server.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
  //          MessageSeverity.error, error);
  //      }
  //    });
  //}


  nuevaAlternativa() {
    let maxIndex = 0;
      for (const r of this.rowsAlternativas) {
        if ((r as AlternativaIndex).index > maxIndex) {
          maxIndex = (r as AlternativaIndex).index;
        }
    }

    const alternativaCache = new Alternativa();
    alternativaCache.descripcion = this.newAlternativa.descripcion;
    (alternativaCache as AlternativaIndex).index = maxIndex + 1;

    this.rowsCacheAlternativas.splice(0, 0, alternativaCache as AlternativaIndex);
    this.rowsAlternativas.splice(0, 0, alternativaCache as AlternativaIndex);
    this.rowsAlternativas = [...this.rowsAlternativas];
    this.newAlternativa.descripcion = '';

    //this.editingEncuestaDescripcion = null;
    //this.sourceEncuesta = null;
    //this.editedEncuesta = new Encuesta();

    //this.openRoleEditor();
  }
  cancelarPregunta() {
    this.cancelarPreguntaEvent.emit('Cancelar...');
  }

  grabarPregunta() {
    this.newPregunta.alternativas = this.rowsAlternativas;
    this.grabarPreguntaEvent.emit(this.newPregunta);
  }
  //editaPregunta(row: Alternativa) {
    //this.editingEncuestaDescripcion = { descripcion: row.descripcion };
    //this.sourceEncuesta = row;

    //this.openRoleEditor();
  //}

  //openRoleEditor() {
  //  const modalRef = this.modalService.open(this.editorModalTemplate, {
  //    size: 'lg',
  //    backdrop: 'static'
  //  });

  //  modalRef.shown.subscribe(() => {
  //    if (!this.roleEditor)
  //      throw new Error('The role editor component was not set.');

  //    this.roleEditor.changesSavedCallback = () => {
  //      this.addNewRoleToList();
  //      modalRef.close();
  //    };

  //    this.roleEditor.changesCancelledCallback = () => {
  //      this.editedRole = null;
  //      this.sourceRole = null;
  //      modalRef.close();
  //    };
  //  });

  //  modalRef.hidden.subscribe(() => {
  //    if (!this.roleEditor)
  //      throw new Error('The role editor component was not set.');

  //    this.editingRoleName = null;
  //    this.roleEditor.resetForm(true);
  //    this.roleEditor = null;
  //  });
  //}

  eliminarAlternativa(row: Alternativa) {
    this.alertService.showDialog(`Esta seguro que desea eliminar la alternativa : "${row.descripcion}" ?`,
      DialogType.confirm, () => this.eliminarAlternativaHelper(row));
  }

  eliminarAlternativaHelper(row: Alternativa) {
    this.alertService.startLoadingMessage(`Eliminando... "${row.descripcion}"`);
    this.loadingIndicatorAlternativa = true;

    this.alertService.stopLoadingMessage();
    this.loadingIndicatorAlternativa = false;

    this.rowsCacheAlternativas = this.rowsCacheAlternativas.filter(item => item !== row);
    this.rowsAlternativas = this.rowsAlternativas.filter(item => item !== row);

    //this.encuestadoraService.deleteEncuesta(row)
    //  .subscribe({
    //    next: () => {
    //      this.alertService.stopLoadingMessage();
    //      this.loadingIndicator = false;

    //      this.rowsCachePreguntas = this.rowsCachePreguntas.filter(item => item !== row);
    //      this.rowsPreguntas = this.rowsPreguntas.filter(item => item !== row);
    //    },
    //    error: error => {
    //      this.alertService.stopLoadingMessage();
    //      this.loadingIndicator = false;

    //      this.alertService.showStickyMessage('Error al eliminar:',
    //        `An error occurred whilst deleting the encuesta.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
    //        MessageSeverity.error, error);
    //    }
    //  });
  }

}
