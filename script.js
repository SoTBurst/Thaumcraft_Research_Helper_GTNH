const stepsField = document.querySelector('#steps');
const stepsField2 = document.querySelector('#steps2');
const aspectData = {
    "Aer": null,
    "Alienis": ["Vacuos", "Tenebrae"],
    "Aqua": null,
    "Arbor": ["Aer", "Herba"],
    "Auram": ["Aer", "Praecantatio"],
    "Bestia": ["Motus", "Victus"],
    "Cognitio": ["Ignis", "Spiritus"],
    "Corpus": ["Bestia", "Mortuus"],
    "Custom1": ["Gelum", "Ignis"],
    "Custom2": ["Praecantatio", "Limus"],
    "Custom3": ["Potentia", "Tutamen"],
    "Custom4": ["Metallum", "Venenum"],
    "Custom5": ["Lux", "Spiritus"],
    "Desidia": ["Vinculum", "Spiritus"],
    "Electrum": ["Machina", "Potentia"],
    "Exanimis": ["Motus", "Mortuus"],
    "Fabrico": ["Humanus", "Instrumentum"],
    "Fames": ["Vacuos", "Victus"],
    "Gelum": ["Ignis", "Perditio"],
    "Gula": ["Vacuos", "Fames"],
    "Herba": ["Terra", "Victus"],
    "Humanus": ["Bestia", "Cognitio"],
    "Ignis": null,
    "Infernus": ["Ignis", "Praecantatio"],
    "Instrumentum": ["Ordo", "Humanus"],
    "Invidia": ["Fames", "Sensus"],
    "Ira": ["Ignis", "Telum"],
    "Iter": ["Terra", "Motus"],
    "Limus": ["Aqua", "Victus"],
    "Lucrum": ["Fames", "Humanus"],
    "Lux": ["Aer", "Ignis"],
    "Luxuria": ["Fames", "Corpus"],
    "Machina": ["Motus", "Instrumentum"],
    "Magneto": ["Metallum", "Iter"],
    "Messis": ["Herba", "Humanus"],
    "Metallum": ["Terra", "Vitreus"],
    "Meto": ["Instrumentum", "Messis"],
    "Mortuus": ["Perditio", "Victus"],
    "Motus": ["Aer", "Ordo"],
    "Nebrisum": ["Lucrum", "Perfodio"],
    "Ordo": null,
    "Pannus": ["Bestia", "Instrumentum"],
    "Perditio": null,
    "Perfodio": ["Terra", "Humanus"],
    "Permutatio": ["Ordo", "Perditio"],
    "Potentia": ["Ignis", "Ordo"],
    "Praecantatio": ["Potentia", "Vacuos"],
    "Radio": ["Potentia", "Lux"],
    // "Sagrausten": ["Xenil", "Radio"],
    "Sano": ["Ordo", "Victus"],
    "Sensus": ["Aer", "Spiritus"],
    //    "Slusium": ["Xenil", "Nebrisum"],
    "Spiritus": ["Victus", "Mortuus"],
    "Strontio": ["Cognitio", "Perditio"],
    "Superbia": ["Vacuos", "Volatus"],
    "Telum": ["Ignis", "Instrumentum"],
    "Tempestas": ["Aer", "Aqua"],
    "Tempus": ["Ordo", "Vacuos"],
    "Tenebrae": ["Lux", "Vacuos"],
    "Terminus": ["Alienis", "Lucrum"],
    "Terra": null,
    "Tutamen": ["Terra", "Instrumentum"],
    "Vacuos": ["Aer", "Perditio"],
    "Venenum": ["Aqua", "Perditio"],
    "Victus": ["Aqua", "Terra"],
    "Vinculum": ["Perditio", "Motus"],
    "Vitium": ["Perditio", "Praecantatio"],
    "Vitreus": ["Ordo", "Terra"],
    "Volatus": ["Aer", "Motus"],
    // "Xablum": ["Xenil", "Slusium"],
    // "Xenil": ["Magneto", "Radio"],
    // "Zetralt": ["Xablum", "Auram"],
};
const aspectList = Object.keys(aspectData);


for (let i = 0; i < aspectList.length; i++) {
    if (aspectData[aspectList[i]] !== null && aspectData[aspectList[i]].length != 2) {
        console.log("Problem with: " + aspectList[i]);
    }
}

const aspectLinks = {}
for (let i = 0; i < aspectList.length; i++) {
    aspectLinks[aspectList[i]] = [];
    if (aspectData[aspectList[i]] !== null) {
        aspectLinks[aspectList[i]].push(...aspectData[aspectList[i]]);
    }

    for (let j = 0; j < aspectList.length; j++) {
        if (i != j && aspectData[aspectList[j]] !== null) {
            if (aspectData[aspectList[j]] !== null && Object.values(aspectData[aspectList[j]]).indexOf(aspectList[i]) > -1) {
                aspectLinks[aspectList[i]].push(aspectList[j]);
            }
        }
    }

}

let optionString = "";
for (let i = 0; i < aspectList.length; i++) {
    optionString = optionString + "<option value=\"" + aspectList[i] + "\" >" + aspectList[i] + "</option > ";
}

document.getElementById('startAspect').innerHTML = optionString;
document.getElementById('endAspect').innerHTML = optionString;
document.getElementById('endAspect2').innerHTML = optionString;

function getTooltip(aspect) {
    let returnString = "";
    if (aspectData[aspect] != null) {
        returnString = "<div style='background: url(\"images/" + aspectData[aspect][0].toLowerCase() + ".png\") no-repeat center center;background-size: contain;' class='tooltip'></div>"
            + aspectData[aspect][0] + " + "
            + "<div style='background: url(\"images/" + aspectData[aspect][1].toLowerCase() + ".png\") no-repeat center center;background-size: contain;' class='tooltip'></div>"
            + aspectData[aspect][1] + " = "
            + "<div style='background: url(\"images/" + aspect.toLowerCase() + ".png\") no-repeat center center;background-size: contain;' class='tooltip'></div>" + aspect;
    }
    return returnString;
}

function makeResult(div, path, note) {
    resultString = note;
    for (let i = 0; i < path.length; i++) {
        resultString = resultString + "<p>" + path[i] + "</p>";
        resultString = resultString + "<div style='background: url(\"images/" + path[i].toLowerCase() + ".png\") no-repeat center center;background-size: contain;' " +
            "class='tooltip'><div class='tooltiptext'>" + getTooltip(path[i]) + "</div></div>";
        if (i < path.length - 1) {
            resultString = resultString + " => ";
        }
    }
    div.innerHTML = resultString;
    div.classList.remove('disabled');
}

function calculate() {
    let steps = parseInt(stepsField.value);

    document.getElementById('result').classList.add("disabled");
    document.getElementById('result2').classList.add("disabled");
    // I have no fucking clue...
    // steps = steps - 1;

    secBreakpoint: while (steps < 16) {
        for (let counter = 0; counter < 1000000; counter++) {
            const path = [document.getElementById('startAspect').value];

            for (let i = 1; i < steps + 1; i++) {
                path[i] = aspectLinks[path[i - 1]][getRandomInt(aspectLinks[path[i - 1]].length)];
            }
            if (aspectLinks[path[path.length - 1]].includes(document.getElementById('endAspect').value)) {
                path.push(document.getElementById('endAspect').value);
                const startPosition = document.getElementById('startPosition').value;
                let steps2 = parseInt(stepsField2.value);

                if (startPosition >= 1) {
                    if (path.length > startPosition) {
                        for (let counter = 0; counter < 1000000; counter++) {
                            const path2 = [path[startPosition]];
                            for (let i = 1; i < steps2 + 1; i++) {
                                path2[i] = aspectLinks[path2[i - 1]][getRandomInt(aspectLinks[path2[i - 1]].length)];
                            }
                            if (aspectLinks[path2[path2.length - 1]].includes(document.getElementById('endAspect2').value)) {
                                path2.push(document.getElementById('endAspect2').value);

                                makeResult(document.getElementById('result'), path, "Mainchain: ");
                                makeResult(document.getElementById('result2'), path2, "2nd chain: ");
                                break secBreakpoint;
                            }
                        }
                    }
                } else {
                    makeResult(document.getElementById('result'), path, "");
                    break secBreakpoint;
                }
            }
        }
        console.log("No Solution, one step more...");
        steps++;
    }
    if (steps >= 16) {
        document.getElementById('result').innerHTML = "No Solution";
    }

}









function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}