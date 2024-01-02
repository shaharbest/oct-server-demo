const mainEl = document.querySelector('main');

const entities = [
    {
        title: 'Users',
        route: '/users',
        headers: ['Name'],
        createEntityRow: entry => createRow([
            entry.name,
        ]),
    },
    // {
    //     title: 'Suppliers',
    //     route: '/suppliers',
    //     headers: ['Name', 'Email', 'City', 'Street'],
    //     createEntityRow: entry => createRow([
    //         entry.name,
    //         entry.email,
    //         entry.address.city,
    //         entry.address.street,
    //     ]),
    // },
    // {
    //     title: 'Products',
    //     route: '/products',
    //     headers: ['Name', 'Price', 'Supplier'],
    //     createEntityRow: entry => createRow([
    //         entry.name,
    //         entry.price,
    //         entry.supplier.name
    //     ]),
    // },
];

initPage();

async function initPage() {
    const entitiesEntries =
        await Promise.all(entities.map(e => fetchAllEntities(e.route)));
    const entityElements = entities.map((entity, index) =>
        createEntityElement(entity, entitiesEntries[index]));
    mainEl.append(...entityElements);
}

async function fetchAllEntities(route) {
    const res = await fetch(route);
    return await res.json();
}

function createEntityElement({ title, headers, createEntityRow }, allEntries) {
    const entityEl = document.createElement('div');
    entityEl.classList.add('entities-element');
    const titleEl = document.createElement('h2');
    titleEl.innerText = title;
    const tableEl = document.createElement('table');
    const headerRowEl = document.createElement('tr');
    const headerCells = headers.map(title => {
        const headCell = document.createElement('th');
        headCell.innerText = title;
        return headCell;
    });
    headerRowEl.append(...headerCells);
    const rows = allEntries.map(e => createEntityRow(e));
    tableEl.append(headerRowEl, ...rows);
    entityEl.append(titleEl, tableEl);
    return entityEl;
}

function createRow(vals) {
    const rowEl = document.createElement('tr');
    const cells = vals.map(v => {
        const cellEl = document.createElement('td');
        cellEl.innerText = v;
        return cellEl
    });
    rowEl.append(...cells);
    return rowEl;
}
