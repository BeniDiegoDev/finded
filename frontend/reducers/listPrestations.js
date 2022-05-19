export default function (selectPrestation = [], action) {
    if (action.type == 'addPrestation') {
        console.log("click")
        var copyselectPrestation = action.prestation
        return copyselectPrestation
    } 
    else {
        return selectPrestation
    }
}