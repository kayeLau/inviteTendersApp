interface parameters {
    updateStart?:string,
    updateEnd?:string,
    productName?:string,
}

export function optionsGenerater(options, table) {
    const conditions = [];
    const parameters:parameters = {};
    for (const [key, value] of Object.entries(options)) {
        if (value === undefined || value === '' || value === null) continue;
        switch (key) {
            case 'updateDate':
                conditions.push(` ${table}.${key} BETWEEN :updateStart AND :updateEnd `)
                parameters.updateStart = options[key][0]
                parameters.updateEnd = options[key][1]
                break
            case 'productName':
                conditions.push(` ${table}.${key} LIKE :${key} `)
                parameters.productName = `%${value}%`;
                break
            default:
                if (Array.isArray(value)) {
                    const placeholders = value.map((_, index) => `:${key}${index}`).join(', ');
                    conditions.push(`${table}.${key} IN (${placeholders})`);
                    value.forEach((val, index) => {
                        parameters[`${key}${index}`] = val;
                    });
                } else {
                    conditions.push(` ${table}.${key} = :${key} `);
                    parameters[key] = value;
                }
                break
        }
    }
    return { conditions, parameters }
}