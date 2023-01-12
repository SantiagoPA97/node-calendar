/* 
  Routes 
  host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { jwtValidator } = require('../middlewares/jwtValidator');
const { isDate } = require('../helpers/isDate');

const router = Router();

//Token for every endpoint
router.use(jwtValidator);

//Get events.
router.get('/', getEvents);

//Create event.
router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    fieldValidator
  ],
  createEvent
);

//Update event.
router.put(
  '/:id', 
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
  ],
  updateEvent
);

//Delete event.
router.delete('/:id', deleteEvent);

module.exports = router;