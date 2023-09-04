import { check } from "express-validator";
// {
//     "cc": 1000000000,
//     "nombreCompleto": "Juan Perez",
//     "emailPersonal": "juanperez@gmail.com",
//     "emailCorporativo": "juanperez@campus.com",
//     "telMovil": "3112223344",
//     "telMovilEmpresa": "3115556677"
// },
export const validateTrainer = [
    check("cc")
    .notEmpty().withMessage("El campo 'cc' es Obligatorio")
    .isInt().withMessage("El parametro 'cc' debe ser un dato tipo int"),

    check("nombreCompleto")
    .notEmpty().withMessage("El campo 'nombreCompleto' es Obligatorio")
    .isString().withMessage("El campo 'nombreCompleto' debe ser de tipo string")
    .isLength({max:60}).withMessage("El campo 'nombreCompleto' sobrepaso los [60]caracteres permitidos")
    .matches(/^[a-zA-Z ]+$/).withMessage("El campo 'nombreCompleto' solo permite letras[a-z-A-z]")

]