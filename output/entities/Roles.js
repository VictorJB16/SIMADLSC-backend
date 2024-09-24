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
exports.Roles = void 0;
const typeorm_1 = require("typeorm");
const UsuarioRol_1 = require("./UsuarioRol");
let Roles = class Roles {
};
exports.Roles = Roles;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id_Rol" }),
    __metadata("design:type", Number)
], Roles.prototype, "idRol", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "nombre_Rol", length: 100 }),
    __metadata("design:type", String)
], Roles.prototype, "nombreRol", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "descripcion_Rol", nullable: true, length: 255 }),
    __metadata("design:type", String)
], Roles.prototype, "descripcionRol", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UsuarioRol_1.UsuarioRol, (usuarioRol) => usuarioRol.idRol2),
    __metadata("design:type", Array)
], Roles.prototype, "usuarioRols", void 0);
exports.Roles = Roles = __decorate([
    (0, typeorm_1.Entity)("roles", { schema: "simadlsc" })
], Roles);
//# sourceMappingURL=Roles.js.map