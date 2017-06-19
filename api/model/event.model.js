/**
 * Created by lukedavis on 12/29/16.
 */
const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var EventSchema = new Schema({
    eventType: String,
    created: Date,
    payload: Object,
});

module.exports = mongoose.model('Event', EventSchema);