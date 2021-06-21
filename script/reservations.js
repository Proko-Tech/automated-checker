const schedule = require('node-schedule');
const spotsModel = require('../database/models/spotsModel');
const stripe = require('../services/stripe/payment');
async function startScript(){
    schedule.scheduleJob('*/5 * * * * *', async function() {
        console.log("startScript\n")
        try {
            const tickets = await spotsModel.getOutstandingReservations(); // gets outstanding reservations
            // Charge all tickets
            tickets.map(async ticket => {
                const chargeId = await stripe.authorizeByCustomerAndSource(400, 'Inactive violation', ticket.stripe_customer_id, ticket.card_id);
                console.log(chargeId);
                const status = await spotsModel.cancelReservationAndUpdateSpot(chargeId.id, chargeId.amount, ticket.id, ticket.spot_hash);
            });

        } catch (err){
            console.log(err);
        }
    });
}

module.exports={startScript};
