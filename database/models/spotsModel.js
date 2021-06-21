const db = require('../dbConfig');
/**
 * update dead lots with their new information
 * @param
 * @returns {Promise<{status: string}>}
 */
async function cancelReservationAndUpdateSpot(stripe_charge_id, total_price, id, secret) {
    let result = {status: 'failed'};
    await db.transaction(async (transaction) => {
        try {
            await db('reservations')
                .where({id})
                .update({status: 'CANCELED', stripe_charge_id, total_price, is_paid:true})
                .transacting(transaction);

            await db('spots')
                .where({secret})
                .update({spot_status: 'UNOCCUPIED'});
            result.status = 'success';
            await transaction.commit();
        } catch (err) {
            console.log(err);
            result.status = 'failed';
            await transaction.rollback();
        }
    });
    return result;
};

/**
 * update dead lots with their new information
 * @param
 * @returns {Promise<{status: string}>}
 */
async function getOutstandingReservations() {
    const reservation_time_limit = new Date();
    reservation_time_limit.setHours(reservation_time_limit.getHours() - 48);

    const data  = await db('reservations')
        .join('users', 'users.id', 'reservations.user_id')
        .where('reserved_at', '>', reservation_time_limit)
        .andWhere({status:'RESERVED'})
        .select('*', 'reservations.id as id', 'users.id as user_id');
    return data;
};



module.exports={ cancelReservationAndUpdateSpot,getOutstandingReservations}
