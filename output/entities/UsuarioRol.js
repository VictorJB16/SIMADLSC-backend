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
exports.UsuarioRol = void 0;
const typeorm_1 = require("typeorm");
const Usuario_1 = require("./Usuario");
const Roles_1 = require("./Roles");
let UsuarioRol = class UsuarioRol {
};
exports.UsuarioRol = UsuarioRol;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id_Usuario_Rol" }),
    __metadata("design:type", Number)
], UsuarioRol.prototype, "idUsuarioRol", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_Rol" }),
    __metadata("design:type", Number)
], UsuarioRol.prototype, "idRol", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_Usuario" }),
    __metadata("design:type", Number)
], UsuarioRol.prototype, "idUsuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuario_1.Usuario, (usuario) => usuario.usuarioRols, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_Usuario", referencedColumnName: "idUsuario" }]),
    __metadata("design:type", Usuario_1.Usuario)
], UsuarioRol.prototype, "idUsuario2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Roles_1.Roles, (roles) => roles.usuarioRols, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_Rol", referencedColumnName: "idRol" }]),
    __metadata("design:type", Roles_1.Roles)
], UsuarioRol.prototype, "idRol2", void 0);
exports.UsuarioRol = UsuarioRol = __decorate([
    (0, typeorm_1.Index)("id_Usuario", ["idUsuario"], {}),
    (0, typeorm_1.Index)("id_Rol", ["idRol"], {}),
    (0, typeorm_1.Entity)("usuario_rol", { schema: "simadlsc" })
], UsuarioRol);
//# sourceMappingURL=UsuarioRol.js.map