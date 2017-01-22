
import Vue from 'vue'
import moment from 'moment'

Vue.filter('smartDate', (date) => {
  const oneDayAgo = moment().subtract(1, 'day').toDate().getTime()

  if (date < oneDayAgo) {
    return moment(date).format('MMM D')
  } else {
    return moment(date).format('h:mm a')
  }
})

Vue.filter('smartName', (person, fullName=false) => {
  if (window.currentUser.email == person.email) {
    return 'me'
  } else if (fullName) {
    return `${person.firstName} ${person.lastName}`.trim()
  } else {
    return person.firstName
  }
})

const units = [
  { name: "second", limit: 60, inSeconds: 1 },
  { name: "minute", limit: 3600, inSeconds: 60 },
  { name: "hour", limit: 86400, inSeconds: 3600  },
  { name: "day", limit: 604800, inSeconds: 86400 },
  { name: "week", limit: 2629743, inSeconds: 604800  },
  { name: "month", limit: 31556926, inSeconds: 2629743 },
  { name: "year", limit: null, inSeconds: 31556926 }
]
Vue.filter('timeAgo', (date) => {
  const diff = (Date.now() - date) / 1000
  if (diff < 5) {
    return "just now"
  }

  for (let i=0; i<units.length; i++) {
    const unit = units[i]
    if (diff < unit.limit || !unit.limit) {
      const count =  Math.floor(diff / unit.inSeconds)
      return `${ count } ${ unit.name }${ count > 1 ? 's' : '' } ago`
    }
  }

})
