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
    }
}