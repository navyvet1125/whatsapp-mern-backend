import mongoose from 'mongoose';
mongoose.Promise = import('bluebird');

const Schema = mongoose.Schema;
import mongooseBcrypt from 'mongoose-bcrypt';

// RFC 5322 compliant email regex 
const emailValidate = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

// Define our model
const userSchema = new Schema({
  email: { 
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    match: emailValidate
 },
  name: {type: String, required: true},
  username: {type: String, required: true, default: `newUser${Date.now()}`},
  avatar: String,
  status: String,
  friends:[ {type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  requests:[ {type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  blocked:[ {type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  password: {type: String, required: true, bcrypt: true},
  joined: {type: Date, default: Date.now()},
  lastUpdated: Date
});
userSchema.plugin(mongooseBcrypt, { rounds: 10 });

// userSchema.post('save',  (doc) => console.log('this fired after a document was saved: ', doc));

userSchema.statics.findByEmail = function (email, cb) { this.findOne({email: email}, cb)};

userSchema.statics.findByUsername = function (username, cb) { this.findOne({username: username}, cb)};

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

userSchema.methods.addRequest = async function (from_user){
  try {
    this.requests.push(from_user);
    await this.save();
    return this;
  } catch (err) {
    return err;
  }
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
export default ModelClass;