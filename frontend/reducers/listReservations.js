export default function (listReservation = [], action) {
    if (action.type == 'ShowListReservations') {
        return action.reservations;
    }
    if (action.type === 'onDeleteReservation') {
        let tab = [... listReservation]
        
        for (let i = 0; i < tab.length; i++) {
            if (tab[i]._id == action.id) {
                tab[i].status = 'Annulée'
            }
        }
        return tab

    }
    if (action.type === 'onAddReservation') {
        return [...listReservation, action.reservation]
    }
    return listReservation
}