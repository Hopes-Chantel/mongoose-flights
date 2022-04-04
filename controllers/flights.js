const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

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
  Flight.findById(req.params.id)
  .populate('ticket') 
  .exec(function(err, flight) {
    Ticket.find(
     {_id: {$nin: flight.ticket}},
     function(err, tickets) {
       console.log(tickets);
       res.render('flights/show', {
         title: 'Ticket Detail', flight, tickets
       });
     }
   );
  });
}



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


