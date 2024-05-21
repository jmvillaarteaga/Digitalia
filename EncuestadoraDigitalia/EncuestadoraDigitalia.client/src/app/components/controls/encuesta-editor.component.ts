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
import { Utilities } from '../../services/utilities';
//import { Role } from '../../models/role.model';
//import { RoleEditorComponent } from './role-editor.component';
import { Encuesta } from '../../models/encuesta.model';
import { Pregunta } from '../../models/pregunta.model';
import { EncuestadoraService } from '../../services/encuestadora.service';
//import { Alternativa } from '../../models/alternativa.model';

interface PreguntaIndex extends Pregunta {
  index: number;
  cantidadAlternativas: number;
}

@Component({
  selector: 'app-encuesta-editor',
  templateUrl: './encuesta-editor.component.html',
  styleUrl: './encuesta-editor.component.scss'
})

export class EncuestaEditorComponent implements OnInit {
  columnsPreguntas: TableColumn[] = [];
  rowsPreguntas: PreguntaIndex[] = [];
  rowsCachePreguntas: PreguntaIndex[] = [];
  //allAlternativas: Alternativa[] = [];
  //editedEncuesta: Encuesta | null = null;
  //sourceEncuesta: Encuesta | null = null;
  newencuestaDescripcion: { descripcion: string } | null = null;
  loadingIndicatorPregunta = false;
  isSaving = false;

  newEncuesta: Encuesta = new Encuesta();
  @Output() cancelarEvent = new EventEmitter<string>();

  @ViewChild('indexTemplatePregunta', { static: true })
  indexTemplatePregunta!: TemplateRef<unknown>;

  @ViewChild('actionsTemplatePregunta', { static: true })
  actionsTemplatePregunta!: TemplateRef<unknown>;

  @ViewChild('editorModalPregunta', { static: true })
  editorModalPreguntaPregunta!: TemplateRef<unknown>;

  //encuestaEditor: RoleEditorComponent | null = null;

  constructor(private alertService: AlertService, private translationService: AppTranslationService,
    private encuestadoraService: EncuestadoraService, private modalService: NgbModal) {
  }

  ngOnInit() {
    //const gT = (key: string) => this.translationService.getTranslation(key);
    this.columnsPreguntas = [
      { prop: 'index', name: '#', width: 50, cellTemplate: this.indexTemplatePregunta, canAutoResize: false },
      { prop: 'descripcion', name: 'Descripción', width: 320 },
      { prop: 'cantidadAlternativas', name: 'Cantidad de Alternativas', width: 320 },
      { name: '', width: 160, cellTemplate: this.actionsTemplatePregunta, resizeable: false, canAutoResize: false, sortable: false, draggable: false }
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

  onSearchChanged(value: string) {
    this.rowsPreguntas = this.rowsCachePreguntas.filter(r => Utilities.searchArray(value, false, r.descripcion));
  }

  nuevaPregunta() {
    //this.editingEncuestaDescripcion = null;
    //this.sourceEncuesta = null;
    //this.editedEncuesta = new Encuesta();

    //this.openRoleEditor();
  }
  cancelar() {
    this.cancelarEvent.emit('Cancelar...');
  }
  editaPregunta(row: Pregunta) {
    //this.editingEncuestaDescripcion = { descripcion: row.descripcion };
    //this.sourceEncuesta = row;

    //this.openRoleEditor();
  }

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

  eliminarPregunta(row: Pregunta) {
    this.alertService.showDialog(`Esta seguro que desea eliminar la pregunta : "${row.descripcion}" ?`,
      DialogType.confirm, () => this.eliminarPreguntaHelper(row));
  }

  eliminarPreguntaHelper(row: Pregunta) {
    this.alertService.startLoadingMessage(`Eliminando... "${row.descripcion}"`);
    this.loadingIndicatorPregunta = true;

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
