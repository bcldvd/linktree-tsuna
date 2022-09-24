const {get} = require('axios');
const {existsSync, mkdirSync, writeFileSync} = require('fs');
const path = require('path');
const gSheet = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRsjp81T9ZgnrILbUU3reGXHTKcm5rMOgt6-rr_dsAJ20lTmgp66AP2KnbFo3AZ2ooSdo5kekTP41r7/pub?gid=0&single=true&output=csv';
const DIST = 'dist';

async function main () {
    const csv = (await get(gSheet, {responseType: 'text'})).data;
    const links = csv.split('\r\n').map(row => row.split(',')).slice(1).map(row => ({
        name: row[0],
        url: row[1],
        icon: row[2],
    }));
    console.log(links);

    const dir = path.resolve(process.cwd(), DIST);
    if (!existsSync(dir)){
        mkdirSync(dir);
    }

    writeFileSync(path.resolve(dir, 'links.json'), JSON.stringify({data: links}), );
}
main();