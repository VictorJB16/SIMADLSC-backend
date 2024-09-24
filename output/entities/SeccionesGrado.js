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
exports.SeccionesGrado = void 0;
const typeorm_1 = require("typeorm");
const Profesores_1 = require("./Profesores");
let SeccionesGrado = class SeccionesGrado {
};
exports.SeccionesGrado = SeccionesGrado;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id_Seccion" }),
    __metadata("design:type", Number)
], SeccionesGrado.prototype, "idSeccion", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "nombre_Seccion", length: 100 }),
    __metadata("design:type", String)
], SeccionesGrado.prototype, "nombreSeccion", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_Estudiante" }),
    __metadata("design:type", Number)
], SeccionesGrado.prototype, "idEstudiante", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_grado" }),
    __metadata("design:type", Number)
], SeccionesGrado.prototype, "idGrado", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_asistencia" }),
    __metadata("design:type", Number)
], SeccionesGrado.prototype, "idAsistencia", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_horario" }),
    __metadata("design:type", Number)
], SeccionesGrado.prototype, "idHorario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Profesores_1.Profesores, (profesores) => profesores.idSeccion2),
    __metadata("design:type", Array)
], SeccionesGrado.prototype, "profesores", void 0);
exports.SeccionesGrado = SeccionesGrado = __decorate([
    (0, typeorm_1.Entity)("secciones_grado", { schema: "simadlsc" })
], SeccionesGrado);
//# sourceMappingURL=SeccionesGrado.js.map