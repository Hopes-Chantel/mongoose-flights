const Flight = require('../models/flight');

module.exports = {
  create
};

function create(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        console.log(req.params.id);
        console.log(req.body);
        console.log(flight.departs);
        flight.destination.push(req.body);
        flight.save(function(err) {
            res.redirect(`/flights/${flight._id}`);
        });
    });
}