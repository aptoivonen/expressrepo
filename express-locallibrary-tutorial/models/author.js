var mongoose = require("mongoose");
const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  family_name: { type: String, required: true, maxlength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case

  var fullname = "";
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ", " + this.first_name;
  }
  if (!this.first_name || !this.family_name) {
    fullname = "";
  }

  return fullname;
});

// Virtual for author's lifespan
AuthorSchema.virtual("lifespan").get(function () {
  if (!this.date_of_death) {
    return "Still alive today.";
  }
  return (
    this.date_of_death.getYear() - this.date_of_birth.getYear()
  ).toString();
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id;
});

// Virtual for nicefying birth date
AuthorSchema.virtual("date_of_birth_formatted").get(function () {
  return this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : "";
});

// Virtual for nicefying death date
AuthorSchema.virtual("date_of_death_formatted").get(function () {
  return this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    : "";
});

//Export model
module.exports = mongoose.model("Author", AuthorSchema);
