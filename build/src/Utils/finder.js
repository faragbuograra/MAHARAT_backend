"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "UtilDatabase", {
    enumerable: !0,
    get: ()=>UtilDatabase
});
const _knexfile = require("../../knexfile");
class UtilDatabase {
    static filter(columns, relations, filterString) {
        let filtersArray = [];
        return filterString.split(",").forEach((filter)=>{
            let [criteria, op, value] = filter.split(":", 3);
            if (criteria && op && value) {
                switch(criteria = criteria.toLowerCase().replace(/ /g, ""), value = value.replace(/ /g, ""), op){
                    case "eq":
                    default:
                        op = "=";
                        break;
                    case "nq":
                        op = "!=";
                        break;
                    case "gt":
                        op = ">";
                        break;
                    case "gte":
                        op = ">=";
                        break;
                    case "lt":
                        op = "<";
                        break;
                    case "lte":
                        op = "<=";
                }
                columns.concat(relations).includes(criteria) && filtersArray.push({
                    criteria,
                    op,
                    value
                });
            }
        }), filtersArray;
    }
    static sort(columns, sortString) {
        let sorts = sortString.split(","), sortsArray = [];
        return sorts.forEach((item)=>{
            let order = item.startsWith("-") ? "desc" : "asc", column = item.toLowerCase().replace("-", "").replace(/ /g, "");
            columns.includes(column) && sortsArray.push({
                column,
                order
            });
        }), sortsArray;
    }
    static async finder(model, args, query) {
        let offset, total, lastPage, from, to, fraction, { q , lang , page , paginate , sorts , filters  } = args;
        void 0 != q && (q = q.trim().replace(";")), paginate || (paginate = 8), !page || page <= 1 ? (page = 1, offset = 0) : offset = page * paginate - paginate;
        let columns = await (0, _knexfile.knex)(model.tableName).columnInfo().then((c)=>Object.keys(c)), relations = Object.keys(model.getRelations()), filtersArray = [], sortsArray = [
            {
                column: "created_at"
            }
        ];
        sorts && (sortsArray = this.sort(columns, sorts)), filters && (filtersArray = this.filter(columns, relations, filters));
        let inquiry = await query.context({
            lang
        }).modify((qb)=>{
            if (filtersArray.length > 0 && filtersArray.forEach((filter)=>{
                let { criteria , op , value  } = filter;
                relations.includes(criteria) ? qb.joinRelated(criteria).where(`${criteria}.id`, op, value) : qb.where(criteria, op, value);
            }), q) {
                let columnValueMatch = q.match(/(\w+):(.*)/);
                if (console.log("subject: ", q), columnValueMatch) {
                    let column = columnValueMatch[1], value = columnValueMatch[2];
                    if (columns.includes(column)) {
                        if ("subject" === column) {
                            let tsQuery = `${value}:*`;
                            qb.whereRaw("subject @@ to_tsquery(?)", [
                                tsQuery
                            ]);
                        } else if ("regsir" === column) {
                            let tsQuery1 = `${value}:*`;
                            qb.whereRaw("regsir @@ to_tsquery(?)", [
                                tsQuery1
                            ]);
                        } else console.log("Unsupported column: ", column);
                    } else console.log("Column not in columns array: ", column);
                } else console.log("Invalid q parameter format: ", q);
            }
        }).orderBy(sortsArray).page(page - 1, paginate);
        lastPage = Math.ceil((total = inquiry.total) / paginate);
        let remainingItems = total % paginate;
        return fraction = 0 == remainingItems ? paginate : remainingItems, from = 0 == offset ? 1 : Number(offset + 1), to = page == lastPage ? Number(offset) + Number(fraction) : Number(offset) + Number(paginate), {
            meta: {
                total,
                per_page: Number(paginate),
                current_page: Number(page),
                first_page: 1,
                last_page: lastPage,
                from,
                to,
                columns,
                relations,
                page_sizes: [
                    12,
                    24,
                    50
                ]
            },
            data: inquiry.results
        };
    }
}
