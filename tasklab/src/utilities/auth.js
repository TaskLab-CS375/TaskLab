export async function checkLogin() {
    return await fetch('/checkToken').then(res => {
        return res.status === 200;
    }).catch(() => {
        return false;
    });
}