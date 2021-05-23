const db = require('../dbConfig');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
/**
 * update dead lots with their new information
 * @param
 * @returns {Promise<{status: string}>}
 */
async function cancelOutstandingReservations() {
    const result = {status: 'failed'};
    const reservation_time_limit = new Date();
    reservation_time_limit.setHours(reservation_time_limit.getHours() - 48);
    await db.transaction(async (transaction) => {
        console.log(reservation_time_limit+"\n"+updateJson)
        try {
            await db('reservations')
                .where('reserved_at', '<', reservation_time_limit)
                .update(updateJson)
                .transacting(transaction);
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
async function checkOutstandingReservations() {
    const result = {status: 'failed'};
    const reservation_time_limit = new Date();
    reservation_time_limit.setHours(reservation_time_limit.getHours() - 48);
    await db.transaction(async (transaction) => {
        console.log(reservation_time_limit+"\n"+updateJson)
        try {
            await db('reservations')
                .where('reserved_at', '<', reservation_time_limit)
                .select('*')
                .transacting(transaction);
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

async function chargereservation(email){
    stripe.customers.create({email})
        .then(customer => console.log(customer.id))
        .catch(error => console.error(error));
    const charge = await stripe.charges.create({
        amount: 100,
        currency: 'usd',
        source: 'tok_amex',
        description: 'TEST',
    });
}


module.exports={ cancelOutstandingReservations,checkOutstandingReservations}
