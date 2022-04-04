const Ticket = require('../models/ticket');
const Flight = require('../models/flight');
const ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show,
};

function index(req, res){
    Flight.find({}).sort([['departs', +1]]).exec(function(err, flights) {
        res.render('flights/index', {
        flights, 
        title: 'All Flights'
        });
      });
    }
  
    function show(req, res) {
      Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({ flight: flight._id }, function(err, tickets) {
          console.log(tickets)
          res.render('flights/show', {
            flight,
            tickets
          });
        });
      });
    };

  function newFlight(req, res) {
    res.render('flights/new');
  }


  function create(req, res) {
    const flight= new Flight(req.body);
    flight.save(function(err) {
        if (err) return res.render('flights/new');
        console.log(flight);
        res.redirect('/flights/new');
    })
}; 


