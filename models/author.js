const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { DateTime } = require('luxon')

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
})

AuthorSchema.virtual('name').get(function () {
  let fullName = ''
  if (this.first_name && this.family_name) {
    fullName = `${this.family_name}, ${this.first_name}`
  }
  if (!this.first_name || !this.family_name) {
    fullName = ''
  }
  return fullName
})

AuthorSchema.virtual('lifespan').get(function () {
  let lifespan = ``

  if (!this.date_of_birth && !this.date_of_death) {
    return lifespan
  }

  if (this.date_of_birth) {
    lifespan = DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    )
  }

  if (this.date_of_death) {
    lifespan +=
      ' - ' +
      DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
  }

  return lifespan
})

AuthorSchema.virtual('url').get(function () {
  return `/catalog/author/${this._id}`
})

module.exports = mongoose.model('Author', AuthorSchema)

// return this.date_of_birth
//   ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
//   : ''
