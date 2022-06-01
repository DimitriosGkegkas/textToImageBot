export function validImage(url, callback, timeout) {
    timeout = timeout || 5000;
    var timedOut = false, timer;
    var img = new Image();
    img.onerror = img.onabort = function () {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, false);
        }
    };
    img.onload = function () {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, true);
        }
    };
    img.src = url;
    timer = setTimeout(function () {
        timedOut = true;
        // reset .src to invalid URL so it stops previous
        // loading, but doesn't trigger new load
        img.src = "//!!!!/test.jpg";
        callback(url, "timeout");
    }, timeout);
}

export function validURL(url, callback) {
    try {
        new URL(url);
        callback(url, true)
    } catch (e) {
        callback(url, false);
    }
}

export function unpackFilter(filter) {
    const unpacked = {
        ...filter
    }
    if (filter.$or) {
        if (filter.$or.teams === '') {
            delete unpacked.$or
        }
    }
    if (filter.games) {
        if (unpacked.games.length === 0) {
            delete unpacked.games;
        }
    }
    if (unpacked.filterBy) {
        for (let value of unpacked.filterBy) {
            switch (value) {
                case 'male' || 'female':
                    unpacked.gender = value
                    break;
                case 'female':
                    unpacked.gender = value
                    break;
                case 'muted':
                    unpacked.subscribed = false
                    break;
                default:
                    unpacked[value] = true
                    break;
            }
        }
        delete unpacked.filterBy
    }
    return unpacked
}