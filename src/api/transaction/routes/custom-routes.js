module.exports = {
    routes : [
        {
            method: 'GET',
            path: '/transactions/market-insights',
            handler: 'transaction.marketInsights'
        },
        {
            method: 'GET',
            path: '/transactions/recent-transactions',
            handler: 'transaction.recentTransactions'
        }
    ]
}