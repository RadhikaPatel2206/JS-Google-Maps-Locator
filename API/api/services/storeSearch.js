const Store = require('../models/store');
const GoogleMaps = require('../services/googleMaps');
const googleMaps = new GoogleMaps();

class StoreSearch {

    async searchNear(zipCode) {
        let coordinates = await googleMaps.getCoords(zipCode);
        let results = await Store.find({
            location: {
                $near: {
                    $maxDistance: 3218,
                    $geometry: {
                        type: "Point",
                        coordinates: coordinates
                    }
                }
            }
        });

        return results;
    }

}

module.exports = StoreSearch;