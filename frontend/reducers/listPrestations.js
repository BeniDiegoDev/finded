export default function (selectPrestation = [], action) {
    if (action.type == 'addPrestation') {
        var copyselectPrestation = action.prestation
        return copyselectPrestation
    } 
    else {
        return selectPrestation
    }
}