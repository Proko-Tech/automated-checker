const db = require('../dbConfig');

/**
 * update dead lots with their new information
 * @param updateJson
 * @returns {Promise<{status: string}>}
 */
async function updateLotAndSpot3MinsNoUpdate(updateJson) {
        const result = {status: 'failed'};
        const date_3_mins_ago = new Date();
        date_3_mins_ago.setMinutes(date_3_mins_ago.getMinutes() - 3);
        await db.transaction(async (transaction) => {
            try {
                await db('lots')
                    .where('updated_at', '<', date_3_mins_ago)
                    .update(updateJson)
                    .transacting(transaction);
                const spotUpdate = {
                    'SPOTS.alive_status': false,
                };
                await db('lots as LOTS')
                    .join('spots as SPOTS','SPOTS.lot_id', 'LOTS.id' )
                    .where('LOTS.updated_at', '<', date_3_mins_ago)
                    .update(spotUpdate)
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


module.exports={ updateLotAndSpot3MinsNoUpdate}
