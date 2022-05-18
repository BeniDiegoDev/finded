export default function (selectPresta = "", action) {
    if (action.type == 'selectPrestataire') {
        console.log("click")
        copyselectPresta = action.name
        return copyselectPresta
    } else {
        return selectPresta
    }
}