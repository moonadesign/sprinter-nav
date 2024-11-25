const dayjs = require('dayjs')
const fedHolidays = require('@18f/us-federal-holidays')
const fs = require('fs')

function adjustSprints(year = new Date().getFullYear()) {
  if (year < 100) {
    year = 2000 + year
  }

  // Read the sprints file
  const filename = `sprints-${year.toString().slice(-2)}.json`
  let sprints
  try {
    sprints = JSON.parse(fs.readFileSync(filename, 'utf8'))
  } catch (e) {
    console.error(`Error: Could not read ${filename}. Make sure to run weeks.js first to generate the sprints file.`)
    process.exit(1)
  }

  // Get holidays for the year
  const yearHolidays = fedHolidays.allForYear(year)

  // Process each sprint
  sprints.forEach(sprint => {
    sprint.days = sprint.days.filter(date => {
      const holiday = yearHolidays.find(h => h.dateString === date)
      if (holiday) {
        sprint.note = `Federal holiday: ${holiday.name}`
        return false
      }
      return true
    })
  })

  // Write back to file
  fs.writeFileSync(filename, JSON.stringify(sprints, null, 2))

  console.log(`✅ Successfully adjusted sprints for ${year} holidays in ${filename}`)
}

const yearArg = process.argv[2]
adjustSprints(yearArg ? parseInt(yearArg) : undefined)
