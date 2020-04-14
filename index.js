#!/usr/bin/env node
//var timeReg = /d-t=*\d*\s/g;
const yargs = require('yargs');
const player = require('play-sound')(opts = {})
const notifier = require('node-notifier');
const path = require('path');	
const colors = require('colors');
const reg = {
              id:0,
              startTime:0,
              endTime:0
            }


function alarm(){
    player.play('finish.mp3',function(err){
        if (err) console.log(err)
      });
      console.log("Well Done!")
      notifier.notify(
        {
          title: 'Pomogo',
          message: 'Well done! Now take a rest!',
          icon: path.join(__dirname, 'pomodoro.png'), // Absolute path (doesn't work on balloons)
          sound: true, // Only Notification Center or Windows Toasters
          wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
        },
        function(err, response) {
          // Response is response from notification
        }
      );
}

function startConsoleUpdate(endTime){
  if((new Date().getTime() + 1000) < endTime.getTime()){
    remainingTime =(endTime.getTime() - (new Date().getTime() + 1000))/1000
    remainingTimeMinutes = Math.round(remainingTime/60)
    console.clear();
    console.log("Remaining:"+remainingTimeMinutes+" minutes")
    setTimeout(function(){ startConsoleUpdate(endTime); }, 1000);
  }
}

function startTimer(timeout){
    reg.startTime = new Date();
    reg.endTime = new Date(reg.startTime.getTime()+timeout);

    player.play('start.mp3',function(err){
        //if (err) console.log(err)
      });    
    console.log("starting now:"+reg.startTime)
    console.log("work until:"+reg.endTime)
    reg.id = setTimeout(alarm,timeout)
    
    startConsoleUpdate(reg.endTime)
}

const argv = yargs
    .command('start', 'Starts the timer', {
        minutes: {
            description: 'The duratin time in minutes',
            alias: 'm',
            type: 'number',
        }
    })
    .option('minutes', {
        alias: 'm',
        description: 'Set de duration time in munutes',
        type: 'int',
    })
    .help()
    .alias('help', 'h')
    .argv;

var duration = 25;

if (argv.minutes) {
    //console.log('The current time is: ', new Date().toLocaleTimeString());
    duration = argv.minutes;
}

process.on('SIGINT', function() {
    console.log("\nAborting timer");
    clearTimeout(reg.id)
    process.exit();
});


startTimer(duration*60*1000);


