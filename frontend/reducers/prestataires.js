export default function (prestataires = [], action) {
    if (action.type == 'addPrestataire') {
        return action.prestataires
    } else {
        return prestataires
    }
}