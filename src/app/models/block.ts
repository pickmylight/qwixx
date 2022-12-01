export interface Game {
    rows: Array<ColorRow>;
    faults: Array<boolean>;
}

export interface ColorRow {
    numbers: Array<NumberItem>;
    lock: boolean;
    color: "red" | "green" | "blue" | "yellow"
}

export interface NumberItem {
    number: number;
    locked: boolean;
}

export interface Multiplier {
    times: number;
    points: number;
}

export interface Result {
    red: any;
    yellow: any;
    green: any;
    blue: any;
    result: any;
    fault: any;
}