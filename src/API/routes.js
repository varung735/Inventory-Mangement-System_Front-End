export const routes_v_1 = {
    user: {
        login: 'v1/users/login',
        getUsers: 'v1/users/get',
        addUsers: 'v1/users/add',
        sendverificationLink: 'v1/users/send/verification_link',
        verifyEmail: 'v1/users/verify/email',
        forgetPassword: 'v1/users/forget/password', //url-queries: email
        resetPassword: 'v1/users/reset/password',
        updateEmail: 'v1/users/update/email',
        grantAccess: 'v1/users/access/grant',
        revokeAccess: 'v1/users/access/revoke'
    },
    stocks: {
        getByAlphabet: 'v1/stocks/get_by_alphabet',
        searchStock: 'v1/stocks/search',
        getStocks: 'v1/stocks/get',
        addStock: 'v1/stocks/add',
        restock: 'v1/stocks/restock',
        deleteStock: 'v1/stocks/delete'
    },
    bills: {
        generate: 'v1/bills/generate'
    }
}