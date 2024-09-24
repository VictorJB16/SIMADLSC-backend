"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncargadosLegales = void 0;
const typeorm_1 = require("typeorm");
const Estudiantes_1 = require("./Estudiantes");
let EncargadosLegales = class EncargadosLegales {
};
exports.EncargadosLegales = EncargadosLegales;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id_encargados_legales" }),
    __metadata("design:type", Number)
], EncargadosLegales.prototype, "idEncargadosLegales", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Nombre_Encargado", length: 100 }),
    __metadata("design:type", String)
], EncargadosLegales.prototype, "nombreEncargado", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Apellido1_Encargado", length: 100 }),
    __metadata("design:type", String)
], EncargadosLegales.prototype, "apellido1Encargado", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Apellido2_Encargado",
        nullable: true,
        length: 100,
    }),
    __metadata("design:type", String)
], EncargadosLegales.prototype, "apellido2Encargado", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Cedula_Encargado", length: 20 }),
    __metadata("design:type", String)
], EncargadosLegales.prototype, "cedulaEncargado", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Ocupacion_Encargado",
        nullable: true,
        length: 100,
    }),
    __metadata("design:type", String)
], EncargadosLegales.prototype, "ocupacionEncargado", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Direccion_Encargado",
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", String)
], EncargadosLegales.prototype, "direccionEncargado", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Nacionalidad_Encargado", length: 100 }),
    __metadata("design:type", String)
], EncargadosLegales.prototype, "nacionalidadEncargado", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Parentezco_Encargado", length: 100 }),
    __metadata("design:type", String)
], EncargadosLegales.prototype, "parentezcoEncargado", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Telefono_Encargado", length: 15 }),
    __metadata("design:type", String)
], EncargadosLegales.prototype, "telefonoEncargado", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Telefono_habitacion_Encargado",
        nullable: true,
        length: 15,
    }),
    __metadata("design:type", String)
], EncargadosLegales.prototype, "telefonoHabitacionEncargado", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Email_Encargado", nullable: true, length: 255 }),
    __metadata("design:type", String)
], EncargadosLegales.prototype, "emailEncargado", void 0);
__decorate([
    (0, typeorm_1.Column)("longblob", {
        name: "Documentos_Obligatorios_Encargado",
        nullable: true,
    }),
    __metadata("design:type", Buffer)
], EncargadosLegales.prototype, "documentosObligatoriosEncargado", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Documentos_Tipo_Encargado",
        nullable: true,
        length: 50,
    }),
    __metadata("design:type", String)
], EncargadosLegales.prototype, "documentosTipoEncargado", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_estudiante" }),
    __metadata("design:type", Number)
], EncargadosLegales.prototype, "idEstudiante", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Estudiantes_1.Estudiantes, (estudiantes) => estudiantes.encargadosLegales, { onDelete: "RESTRICT", onUpdate: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)([{ name: "id_estudiante", referencedColumnName: "idEstudiante" }]),
    __metadata("design:type", Estudiantes_1.Estudiantes)
], EncargadosLegales.prototype, "idEstudiante2", void 0);
exports.EncargadosLegales = EncargadosLegales = __decorate([
    (0, typeorm_1.Index)("id_estudiante", ["idEstudiante"], {}),
    (0, typeorm_1.Entity)("encargados_legales", { schema: "simadlsc" })
], EncargadosLegales);
//# sourceMappingURL=EncargadosLegales.js.map