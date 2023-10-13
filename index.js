const chalk = require("chalk");

async function run() {
    console.log("started");
    let OLD_VARIABLE_TABLE = {};
    let CURRENT_VARIABLE_TABLE = {};

    const get = (varname) => CURRENT_VARIABLE_TABLE[varname];
    const set = (key, value) => {
        CURRENT_VARIABLE_TABLE[key] = value;
    };

    OLD_VARIABLE_TABLE["demo"] = "TESTING HERE :D";
    set("DEMO", "TESTING HERE :D");

    setInterval(() => {
        let changed = false;
        for (const [key, value] of Object.entries(CURRENT_VARIABLE_TABLE)) {
            if (value !== OLD_VARIABLE_TABLE[key]) {
                OLD_VARIABLE_TABLE[key] = value;
                changed = true;
            }
        }
        if (changed) {
            const maxlength = 200;
            const TABLE_DISPLAY = Object.entries(CURRENT_VARIABLE_TABLE)
                .map(
                    ([key, value]) =>
                        `${chalk.green(key)} (${chalk.red(typeof value === "object" && JSON.stringify(value).startsWith("[") ? "array" : typeof value)}): ${chalk.yellow(
                            JSON.stringify(value).length < maxlength ? JSON.stringify(value) : JSON.stringify(value).slice(0, maxlength)
                        )}`
                )
                .join("\n");
            process.stdout.write("\033c");
            console.log(TABLE_DISPLAY);
        }
    }, 500);

    while (true) {
        set("DEMO", ["TESTING HERE 2 :D", "TESTING HERE 2 :D", "TESTING HERE 2 :D", "TESTING HERE 2 :D", "TESTING HERE 2 :D"]);

        await sleep(2000);

        set("DEMO", "TESTING HERE 3 :D");
        set("name", "TESTING HERE 3 :D");

        await sleep(2000);
        set("DEMO", { key: "TESTING HERE :D" });

        await sleep(2000);
        set("DEMO", 5);

        await sleep(2000);
        set("DEMO", false);
        await sleep(2000);
    }
}

function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

function colour(text, colour) {
    const colours = new Map();
    colours.set("Reset", "\x1b[0m");
    colours.set("FgBlack", "\x1b[30m");
    colours.set("FgRed", "\x1b[31m");
    colours.set("FgGreen", "\x1b[32m");
    colours.set("FgYellow", "\x1b[33m");
    colours.set("FgBlue", "\x1b[34m");
    colours.set("FgMagenta", "\x1b[35m");
    colours.set("FgCyan", "\x1b[36m");
    colours.set("FgWhite", "\x1b[37m");
    return `${colours.get(colour)}${text}${colours.get(colour)}`;
}

run();
