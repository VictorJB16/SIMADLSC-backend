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
exports.Estudiantes = void 0;
const typeorm_1 = require("typeorm");
const EncargadosLegales_1 = require("./EncargadosLegales");
const Usuario_1 = require("./Usuario");
const Grados_1 = require("./Grados");
const Asistencia_1 = require("./Asistencia");
const Periodo_1 = require("./Periodo");
let Estudiantes = class Estudiantes {
};
exports.Estudiantes = Estudiantes;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id_Estudiante" }),
    __metadata("design:type", Number)
], Estudiantes.prototype, "idEstudiante", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "estado_Estudiante", length: 50 }),
    __metadata("design:type", String)
], Estudiantes.prototype, "estadoEstudiante", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Institucion_de_procedencia_Estudiante",
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", String)
], Estudiantes.prototype, "institucionDeProcedenciaEstudiante", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "Repite_materia_Estudiante", width: 1 }),
    __metadata("design:type", Boolean)
], Estudiantes.prototype, "repiteMateriaEstudiante", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Lugar_Nacimiento_Estudiante", length: 255 }),
    __metadata("design:type", String)
], Estudiantes.prototype, "lugarNacimientoEstudiante", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Estatus_Migratorio_Estudiante", length: 100 }),
    __metadata("design:type", String)
], Estudiantes.prototype, "estatusMigratorioEstudiante", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "Adecuacion_Estudiante", width: 1 }),
    __metadata("design:type", Boolean)
], Estudiantes.prototype, "adecuacionEstudiante", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Tipo_Adecuacion_Estudiante",
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", String)
], Estudiantes.prototype, "tipoAdecuacionEstudiante", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "Recibe_religion_Estudiante", width: 1 }),
    __metadata("design:type", Boolean)
], Estudiantes.prototype, "recibeReligionEstudiante", void 0);
__decorate([
    (0, typeorm_1.Column)("longblob", { name: "Carta_religion_Estudiante", nullable: true }),
    __metadata("design:type", Buffer)
], Estudiantes.prototype, "cartaReligionEstudiante", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Carta_religion_Tipo",
        nullable: true,
        length: 50,
    }),
    __metadata("design:type", String)
], Estudiantes.prototype, "cartaReligionTipo", void 0);
__decorate([
    (0, typeorm_1.Column)("longblob", { name: "Presenta_dictamen_Estudiante", nullable: true }),
    __metadata("design:type", Buffer)
], Estudiantes.prototype, "presentaDictamenEstudiante", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Dictamen_Tipo", nullable: true, length: 50 }),
    __metadata("design:type", String)
], Estudiantes.prototype, "dictamenTipo", void 0);
__decorate([
    (0, typeorm_1.Column)("longblob", { name: "Documentos_Obligatorios_Est", nullable: true }),
    __metadata("design:type", Buffer)
], Estudiantes.prototype, "documentosObligatoriosEst", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Documentos_Tipo", nullable: true, length: 50 }),
    __metadata("design:type", String)
], Estudiantes.prototype, "documentosTipo", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Enfermedad_Estudiante", length: 255 }),
    __metadata("design:type", String)
], Estudiantes.prototype, "enfermedadEstudiante", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Medicamentos_Estudiante",
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", String)
], Estudiantes.prototype, "medicamentosEstudiante", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Ruta_viaje_Estudiante",
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", String)
], Estudiantes.prototype, "rutaViajeEstudiante", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_Usuario" }),
    __metadata("design:type", Number)
], Estudiantes.prototype, "idUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_grado" }),
    __metadata("design:type", Number)
], Estudiantes.prototype, "idGrado", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_Asistencia" }),
    __metadata("design:type", Number)
], Estudiantes.prototype, "idAsistencia", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_Periodo" }),
    __metadata("design:type", Number)
], Estudiantes.prototype, "idPeriodo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EncargadosLegales_1.EncargadosLegales, (encargadosLegales) => encargadosLegales.idEstudiante2),
    __metadata("design:type", Array)
], Estudiantes.prototype, "encargadosLegales", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuario_1.Usuario, (usuario) => usuario.estudiantes, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_Usuario", referencedColumnName: "idUsuario" }]),
    __metadata("design:type", Usuario_1.Usuario)
], Estudiantes.prototype, "idUsuario2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Grados_1.Grados, (grados) => grados.estudiantes, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_grado", referencedColumnName: "idGrado" }]),
    __metadata("design:type", Grados_1.Grados)
], Estudiantes.prototype, "idGrado2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Asistencia_1.Asistencia, (asistencia) => asistencia.estudiantes, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_Asistencia", referencedColumnName: "idAsistencia" }]),
    __metadata("design:type", Asistencia_1.Asistencia)
], Estudiantes.prototype, "idAsistencia2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Periodo_1.Periodo, (periodo) => periodo.estudiantes, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_Periodo", referencedColumnName: "idPeriodo" }]),
    __metadata("design:type", Periodo_1.Periodo)
], Estudiantes.prototype, "idPeriodo2", void 0);
exports.Estudiantes = Estudiantes = __decorate([
    (0, typeorm_1.Index)("id_Usuario", ["idUsuario"], {}),
    (0, typeorm_1.Index)("id_grado", ["idGrado"], {}),
    (0, typeorm_1.Index)("id_Asistencia", ["idAsistencia"], {}),
    (0, typeorm_1.Index)("id_Periodo", ["idPeriodo"], {}),
    (0, typeorm_1.Entity)("estudiantes", { schema: "simadlsc" })
], Estudiantes);
//# sourceMappingURL=Estudiantes.js.map