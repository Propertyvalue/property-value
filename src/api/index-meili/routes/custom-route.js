module.exports = {
    routes : [
        {
            method: 'GET',
            path: '/index-meilis/units',
            handler: 'index-meili.indexUnits'
        },
        {
            method: 'GET',
            path: '/index-meilis/transactions',
            handler: 'index-meili.indexTransactions'
        }
    ]
}