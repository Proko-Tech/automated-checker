const schedule = require('node-schedule');

function startScript(){
    schedule.scheduleJob('*/20 * * * *', async function() {
        try {
            console.log('here reservation');
        } catch (err){
            console.log(err);
        }
    });
}

module.exports={startScript};
