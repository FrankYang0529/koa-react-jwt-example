import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  username: { type: String, require: true, index: { unique: true } },
  password: { type: String, require: true }
})

UserSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    const retJson = {
      username: ret.username
    }
    return retJson
  }
})

const User = mongoose.model('User', UserSchema)
export default User