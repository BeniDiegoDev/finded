export default function (location = [], action) {
    if (action.type == 'addLocation') {
        return action.location
    } else {
        return location
    }
}