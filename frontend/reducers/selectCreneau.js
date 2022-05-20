export default function (selectCreneau = [], action) {
    if (action.type == 'addCreneau') {
        var copyselectCreneau = []
        copyselectCreneau.push(action.date)
        copyselectCreneau.push(action.slot)
        return copyselectCreneau
    } else {
        return selectCreneau
    }
}