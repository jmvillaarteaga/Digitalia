// ---------------------------------------
// Email: quickapp@ebenmonney.com
// Templates: www.ebenmonney.com/templates
// (c) 2024 www.ebenmonney.com/mit-license
// ---------------------------------------

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableColumn } from '@swimlane/ngx-datatable';

import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { AppTranslationService } from '../../services/app-translation.service';
//import { AccountService } from '../../services/account.service';
import { Utilities } from '../../services/utilities';
//import { Role } from '../../models/role.model';
import { Permissions } from '../../models/permission.model';
import { EncuestaEditorComponent } from './encuesta-editor.component';
import { Encuesta } from '../../models/encuesta.model';
import { Pregunta } from '../../models/pregunta.model';
import { EncuestadoraService } from '../../services/encuestadora.service';

interface EncuestaIndex extends Encuesta {
  index: number;
  cantidadPreguntas: number;
}

@Component({
  selector: 'app-encuestas-management',
  templateUrl: './encuestas-management.component.html',
  styleUrl: './encuestas-management.component.scss'
})

export class EncuestasManagementComponent implements OnInit {
  columns: TableColumn[] = [];
  rows: Encuesta[] = [];
  rowsCache: Encuesta[] = [];
  allPreguntas: Pregunta[] = [];
  editedEncuesta: Encuesta | null = null;
  sourceEncuesta: Encuesta | null = null;
  editingEncuestaDescripcion: { descripcion: string } | null = null;
  loadingIndicator = false;
  nuevoEnc = false;
  encuestaDescripcion = '';

  //newEncuesta: Encuesta = new Encuesta();

  @ViewChild('indexTemplate', { static: true })
  indexTemplate!: TemplateRef<unknown>;

  @ViewChild('actionsTemplate', { static: true })
  actionsTemplate!: TemplateRef<unknown>;

  //@ViewChild('editorModal', { static: true })
  //editorModalTemplate!: TemplateRef<unknown>;

  //encuestaEditor: RoleEditorComponent | null = null;

  constructor(private alertService: AlertService, private translationService: AppTranslationService,
    private encuestadoraService: EncuestadoraService, private modalService: NgbModal) {
  }

  ngOnInit() {
    //const gT = (key: string) => this.translationService.getTranslation(key);

    this.columns = [
      { prop: 'index', name: '#', width: 50, cellTemplate: this.indexTemplate, canAutoResize: false },
      { prop: 'descripcion', name: 'Descripción', width: 320 },
      { prop: 'cantidadPreguntas', name: 'Cantidad de Preguntas', width: 320 },
      { name: '', width: 160, cellTemplate: this.actionsTemplate, resizeable: false, canAutoResize: false, sortable: false, draggable: false }
    ];

    this.loadData();
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

  loadData() {
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;

    this.encuestadoraService.getEncuestas(1,10)
      .subscribe({
        next: results => {
          this.alertService.stopLoadingMessage();
          this.loadingIndicator = false;
          const encuestas = results[0];

          encuestas.forEach((encuesta, index) => {
            (encuesta as EncuestaIndex).index = index + 1;
            (encuesta as EncuestaIndex).cantidadPreguntas = encuesta.preguntas.length;
          });

          this.rowsCache = [...encuestas];
          this.rows = encuestas;

        },
        error: error => {
          this.alertService.stopLoadingMessage();
          this.loadingIndicator = false;

          this.alertService.showStickyMessage('Load Error',
            `Unable to retrieve encuestas from the server.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
            MessageSeverity.error, error);
        }
      });
  }

  onSearchChanged(value: string) {
    this.rows = this.rowsCache.filter(r => Utilities.searchArray(value, false, r.descripcion));
  }

  nuevaEncuesta() {
    this.nuevoEnc = true;
    this.editingEncuestaDescripcion = null;
    this.sourceEncuesta = null;
    this.editedEncuesta = new Encuesta();

    //this.openRoleEditor();
  }

  cancelarNuevaEncuesta(message: string) {
    this.nuevoEnc = false;
  }

  editaEncuesta(row: Encuesta) {
    this.editingEncuestaDescripcion = { descripcion: row.descripcion };
    this.sourceEncuesta = row;

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

  eliminarEncuesta(row: Encuesta) {
    this.alertService.showDialog(`Esta seguro que desea eliminar la encuesta : "${row.descripcion}" ?`,
      DialogType.confirm, () => this.eliminarEncuestaHelper(row));
  }

  eliminarEncuestaHelper(row: Encuesta) {
    this.alertService.startLoadingMessage(`Eliminando... "${row.descripcion}"`);
    this.loadingIndicator = true;

    this.encuestadoraService.deleteEncuesta(row)
      .subscribe({
        next: () => {
          this.alertService.stopLoadingMessage();
          this.loadingIndicator = false;

          this.rowsCache = this.rowsCache.filter(item => item !== row);
          this.rows = this.rows.filter(item => item !== row);
        },
        error: error => {
          this.alertService.stopLoadingMessage();
          this.loadingIndicator = false;

          this.alertService.showStickyMessage('Error al eliminar:',
            `An error occurred whilst deleting the encuesta.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
            MessageSeverity.error, error);
        }
      });
  }

  get canManageEncuestas() {
    return this.encuestadoraService.userHasPermission(Permissions.manageEncuestas);
  }
}
