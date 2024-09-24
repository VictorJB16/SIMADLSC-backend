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
exports.SeguridadEvento = void 0;
const typeorm_1 = require("typeorm");
const Usuario_1 = require("./Usuario");
let SeguridadEvento = class SeguridadEvento {
};
exports.SeguridadEvento = SeguridadEvento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id_Seguridad" }),
    __metadata("design:type", Number)
], SeguridadEvento.prototype, "idSeguridad", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "evento_Seguridad", length: 255 }),
    __metadata("design:type", String)
], SeguridadEvento.prototype, "eventoSeguridad", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { name: "fecha_evento" }),
    __metadata("design:type", Date)
], SeguridadEvento.prototype, "fechaEvento", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "ip_usuario", length: 45 }),
    __metadata("design:type", String)
], SeguridadEvento.prototype, "ipUsuario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Usuario_1.Usuario, (usuario) => usuario.idSeguridad2),
    __metadata("design:type", Array)
], SeguridadEvento.prototype, "usuarios", void 0);
exports.SeguridadEvento = SeguridadEvento = __decorate([
    (0, typeorm_1.Entity)("seguridad_evento", { schema: "simadlsc" })
], SeguridadEvento);
//# sourceMappingURL=SeguridadEvento.js.map