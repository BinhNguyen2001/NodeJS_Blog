const Handlebars = require('handlebars');
module.exports = {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
        const icons = {
            default: `fas fa-sort`,
            asc: 'fas fa-sort-amount-down-alt',
            desc: 'fas fa-sort-amount-down',
        };
        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        };
        let sortType = field === sort.column ? sort.type : 'default';
        if (!Object.keys(types).includes(sort.type)) sortType = 'desc';
        const href = Handlebars.escapeExpression(
            `?_sort&column=${field}&type=${types[sortType]}`,
        );
        const result = `<a href="${href}"><i class="${icons[sortType]}"></i></a>`;
        return new Handlebars.SafeString(result);
    },
};
