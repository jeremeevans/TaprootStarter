var DateHelper = /** @class */ (function () {
  class DateHelper {
    constructor(theDate) {
      this.theDate = theDate
    }
  }
  Object.defineProperty(DateHelper.prototype, "Day", {
    get: function () {
      return this.theDate.getDate().toString()
    },
    enumerable: false,
    configurable: true,
  })
  Object.defineProperty(DateHelper.prototype, "DayOfWeek", {
    get: function () {
      switch (this.theDate.getDay()) {
        case 0:
          return "Sunday"
        case 1:
          return "Monday"
        case 2:
          return "Tuesday"
        case 3:
          return "Wednesday"
        case 4:
          return "Thursday"
        case 5:
          return "Friday"
        case 6:
          return "Saturday"
        default:
          throw "Not a day"
      }
    },
    enumerable: false,
    configurable: true,
  })
  Object.defineProperty(DateHelper.prototype, "Ordinal", {
    get: function () {
      switch (this.theDate.getDate()) {
        case 1:
        case 21:
        case 31:
          return "st"
        case 2:
        case 22:
          return "nd"
        case 3:
        case 23:
          return "rd"
        default:
          return "th"
      }
    },
    enumerable: false,
    configurable: true,
  })
  Object.defineProperty(DateHelper.prototype, "Month", {
    get: function () {
      switch (this.theDate.getMonth()) {
        case 0:
          return "January"
        case 1:
          return "February"
        case 2:
          return "March"
        case 3:
          return "April"
        case 4:
          return "May"
        case 5:
          return "June"
        case 6:
          return "July"
        case 7:
          return "August"
        case 8:
          return "September"
        case 9:
          return "October"
        case 10:
          return "November"
        default:
          return "December"
      }
    },
    enumerable: false,
    configurable: true,
  })
  Object.defineProperty(DateHelper.prototype, "Year", {
    get: function () {
      return this.theDate.getFullYear().toString()
    },
    enumerable: false,
    configurable: true,
  })
  Object.defineProperty(DateHelper.prototype, "BlogPostDate", {
    get: function () {
      return (
        ""
          // .concat(this.DayOfWeek, ", ")
          .concat(this.Month, " ")
          .concat(this.Day, "<sup>")
          .concat(this.Ordinal, "</sup>, ")
          .concat(this.Year)
      )
    },
    enumerable: false,
    configurable: true,
  })
  return DateHelper
})()

export { DateHelper }
