"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "errorHandler", {
    enumerable: !0,
    get: ()=>errorHandler
});
const _objection = require("objection"), errorHandler = (err, req, res, next)=>{
    if (err instanceof _objection.ValidationError) switch(err.type){
        case "UnauthorizedAccess":
            res.status(403).send({
                message: err.message,
                type: err.type,
                data: err.data
            });
            break;
        case "ModelValidation":
            res.status(422).send({
                message: err.message,
                type: err.type,
                data: err.data
            });
            break;
        case "RelationExpression":
            res.status(400).send({
                message: err.message,
                type: "RelationExpression",
                data: {}
            });
            break;
        case "UnallowedRelation":
        case "InvalidGraph":
            res.status(400).send({
                message: err.message,
                type: err.type,
                data: {}
            });
            break;
        default:
            res.status(400).send({
                message: err.message,
                type: "UnknownValidationError",
                data: {}
            });
    }
    else err instanceof _objection.NotFoundError ? res.status(404).send({
        message: err.message,
        type: "NotFound",
        data: {}
    }) : err instanceof _objection.ConstraintViolationError ? res.status(400).send({
        message: err.message,
        type: "ConstraintViolation",
        data: {}
    }) : err instanceof _objection.UniqueViolationError ? res.status(409).send({
        message: err.message,
        type: "UniqueViolation",
        data: {
            columns: err.columns,
            table: err.table,
            constraint: err.constraint
        }
    }) : err instanceof _objection.NotNullViolationError ? res.status(400).send({
        message: err.message,
        type: "NotNullViolation",
        data: {
            column: err.column,
            table: err.table
        }
    }) : err instanceof _objection.ForeignKeyViolationError ? res.status(409).send({
        message: err.message,
        type: "ForeignKeyViolation",
        data: {
            table: err.table,
            constraint: err.constraint
        }
    }) : err instanceof _objection.CheckViolationError ? res.status(400).send({
        message: err.message,
        type: "CheckViolation",
        data: {
            table: err.table,
            constraint: err.constraint
        }
    }) : err instanceof _objection.DataError ? res.status(400).send({
        message: err.message,
        type: "InvalidData",
        data: {}
    }) : err instanceof _objection.DBError ? res.status(500).send({
        message: err.message,
        type: "UnknownDatabaseError",
        data: {}
    }) : res.status(500).send({
        message: err.message,
        type: "UnknownError",
        data: {}
    });
};
