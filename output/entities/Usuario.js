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
exports.Usuario = void 0;
const typeorm_1 = require("typeorm");
const Estudiantes_1 = require("./Estudiantes");
const Profesores_1 = require("./Profesores");
const Evento_1 = require("./Evento");
const SeguridadEvento_1 = require("./SeguridadEvento");
const UsuarioRol_1 = require("./UsuarioRol");
let Usuario = class Usuario {
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id_Usuario" }),
    __metadata("design:type", Number)
], Usuario.prototype, "idUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "nombre_Usuario", length: 100 }),
    __metadata("design:type", String)
], Usuario.prototype, "nombreUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "apellido1_Usuario", length: 100 }),
    __metadata("design:type", String)
], Usuario.prototype, "apellido1Usuario", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "apellido2_Usuario", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Usuario.prototype, "apellido2Usuario", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "fecha_nacimiento_Usuario" }),
    __metadata("design:type", String)
], Usuario.prototype, "fechaNacimientoUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "contacto_Usuario", nullable: true, length: 35 }),
    __metadata("design:type", String)
], Usuario.prototype, "contactoUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "email_Usuario", length: 255 }),
    __metadata("design:type", String)
], Usuario.prototype, "emailUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "cedula_Usuario", length: 40 }),
    __metadata("design:type", String)
], Usuario.prototype, "cedulaUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "contraseña_Usuario", length: 255 }),
    __metadata("design:type", String)
], Usuario.prototype, "contraseAUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "rol_Usuario", length: 50 }),
    __metadata("design:type", String)
], Usuario.prototype, "rolUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", {
        name: "bloqueo_Usuario",
        nullable: true,
        width: 1,
        default: () => "'0'",
    }),
    __metadata("design:type", Boolean)
], Usuario.prototype, "bloqueoUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_evento" }),
    __metadata("design:type", Number)
], Usuario.prototype, "idEvento", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_seguridad" }),
    __metadata("design:type", Number)
], Usuario.prototype, "idSeguridad", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Estudiantes_1.Estudiantes, (estudiantes) => estudiantes.idUsuario2),
    __metadata("design:type", Array)
], Usuario.prototype, "estudiantes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Profesores_1.Profesores, (profesores) => profesores.idUsuario2),
    __metadata("design:type", Array)
], Usuario.prototype, "profesores", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Evento_1.Evento, (evento) => evento.usuarios, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_evento", referencedColumnName: "idEvento" }]),
    __metadata("design:type", Evento_1.Evento)
], Usuario.prototype, "idEvento2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SeguridadEvento_1.SeguridadEvento, (seguridadEvento) => seguridadEvento.usuarios, { onDelete: "RESTRICT", onUpdate: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)([{ name: "id_seguridad", referencedColumnName: "idSeguridad" }]),
    __metadata("design:type", SeguridadEvento_1.SeguridadEvento)
], Usuario.prototype, "idSeguridad2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UsuarioRol_1.UsuarioRol, (usuarioRol) => usuarioRol.idUsuario2),
    __metadata("design:type", Array)
], Usuario.prototype, "usuarioRols", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Index)("id_evento", ["idEvento"], {}),
    (0, typeorm_1.Index)("id_seguridad", ["idSeguridad"], {}),
    (0, typeorm_1.Entity)("usuario", { schema: "simadlsc" })
], Usuario);
//# sourceMappingURL=Usuario.js.map