export default function ( user = [], action) {
    if (action.type == 'createUser') {
        var newUser = action.user
        return newUser
    } else if (action.type == 'connectUser') {
        var newUser = action.user
        return newUser
    } else if (action.type == 'disconnectUser') {
        return []
    } else {
        return user
    }
}