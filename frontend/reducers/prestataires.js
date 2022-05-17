export default function (prestataires = [], action) {
    if (action.type == 'addPrestataire') {
        // console.log(prestatairesCopy)
        return action.prestataires
    } else {
        return prestataires
    }
}