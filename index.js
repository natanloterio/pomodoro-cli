#!/usr/bin/env node
//var timeReg = /d-t=*\d*\s/g;
const yargs = require('yargs');
const player = require('play-sound')(opts = {})

function alarm(){
    player.play('finish.mp3',function(err){
        if (err) throw err
      });
      console.log("Well Done!")
}

function startTimer(timeout){
    now = new Date();
    player.play('start.mp3',function(err){
        if (err) throw err
      });    
    console.log("starting now:"+now)
    console.log("work until:"+new Date(now.getTime()+timeout))
    setTimeout(alarm,timeout)
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

startTimer(duration*60*1000);