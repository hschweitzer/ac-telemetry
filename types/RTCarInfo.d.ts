export type RTCarInfo = {
    identifier: string,
    size: number,
    speedKmh: number,
    speedMph: number,
    speedMs: number,

    isAbsEnabled: boolean,
    isAbsInAction: boolean,
    isTcEnabled: boolean,
    isTcInAction: boolean,
    isInPit: boolean,
    isEngineLimiterOn: boolean,

    accGVertical: number,
    accGHorizontal: number,
    accGFrontal: number,

    lapTime: number,
    lastLap: number,
    bestLap: number,
    lapCount: number,

    gas: number,
    brake: number,
    clutch: number,
    engineRPM: number,
    steer: number,
    gear: number,
    cgHeight: number
};