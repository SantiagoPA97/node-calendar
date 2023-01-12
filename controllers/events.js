const Event = require('../models/Event');

const getEvents = async (req, res) => {
  const events = await Event.find().where('user').in(req.uid).populate('user', 'name');

  res.json({
    ok: true,
    events
  });
}

const createEvent = async (req, res) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;

    const savedEvent = await event.save();

    res.status(201).json({
      ok: true,
      savedEvent
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Something went wrong. Please contact the administrator.' });
  }
}

const updateEvent = async (req, res) => {

  const { id: eventId } = req.params;
  const { uid } = req;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ ok: false, msg: 'The event does not exist.' });

    if (event.user.toString() !== uid)
      return res.status(401).json({
        ok: false,
        msg: "You are not authorized to access this resource."
      });
    
    const newEvent = {
      ...req.body,
      user: uid
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

    res.status(200).json({ ok: true, event: updatedEvent});

  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Something went wrong. Please contact the administrator.' });
  }
}

const deleteEvent = async (req, res) => {
  const { id: eventId } = req.params;
  const { uid } = req;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ ok: false, msg: 'The event does not exist.' });

    if (event.user.toString() !== uid)
      return res.status(401).json({
        ok: false,
        msg: "You are not authorized to access this resource."
      });

    await Event.findByIdAndDelete(eventId);
    res.status(200).json({ ok: true });

  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Something went wrong. Please contact the administrator.' });
  }
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}