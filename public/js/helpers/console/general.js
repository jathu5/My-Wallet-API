export const myIncludes = (user, field, expect) => {
    const arr = user.accounts;
    for (let i in arr) {
        if (arr[i][field] === expect) {
            return i;
        }
    }
    return -1;
}

export const updateUser = user => {
    const path = `user/update-account/${user.username}`;
    const option = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }

    fetch(path, option)
        .then(res => res.json()).then(retval => {
            if (retval.error) {
                return { error: retval.error };
            }
        }).catch(err => { return { error: err } });
    return {};
}