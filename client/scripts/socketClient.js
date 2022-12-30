import { io } from 'socket.io-client';

var socket = io('http://localhost:3000');
const gearElement = document.getElementById('gear');
const engineRpmElement = document.getElementById('engine_rpm');
const speedElement = document.getElementById('speed');
const accGFrontalElement = document.getElementById('acc_g_frontal');
const absElement = document.getElementById('abs');
const tcElement = document.getElementById('tc');

socket.on("rtCarInfo", (rtCarInfo) => {
    if (gearElement != null) {
        let gear = rtCarInfo.gear - 1;
        switch (gear) {
            case -1:
                gear = 'R';
                break;
            case 0:
                gear = 'N';
            default:
                break;
        }
        gearElement.innerText = gear;
    }

    if (engineRpmElement != null) {
        engineRpmElement.innerText = rtCarInfo.engineRPM.toFixed(0);
    }

    if (speedElement != null) {
        speedElement.innerText = rtCarInfo.speedKmh.toFixed(0);
    }

    if (accGFrontalElement != null) {
        accGFrontalElement.innerText = rtCarInfo.accGFrontal.toFixed(1);
    }

    if (rtCarInfo.isTcInAction) {
        tcElement?.classList.remove('assistance-inactive');
    } else {
        tcElement?.classList.add('assistance-inactive');
    }

    if (rtCarInfo.isAbsInAction) {
        absElement?.classList.remove('assistance-inactive');
    } else {
        absElement?.classList.add('assistance-inactive');
    }
});