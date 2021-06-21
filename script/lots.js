const schedule = require('node-schedule');
const lotsModel = require('../database/models/lotsModel');

function startScript(){
    schedule.scheduleJob('*/2 * * * *', async function() {
        try {
            const updateJson = {
                alive_status: false,
            };
            await lotsModel.updateLotAndSpot3MinsNoUpdate(updateJson);
        } catch (err){
            console.log(err);
        }
    });
}

module.exports={startScript};
