const dayjs = require('dayjs')
const weekOfYear = require('dayjs/plugin/weekOfYear')
const fs = require('fs')

dayjs.extend(weekOfYear)

function generateSprints(year = new Date().getFullYear()) {
  if (year < 100) {
    year = 2000 + year
  }

  const sprints = []
  let currentWeek = 1

  // Generate sprints for each quarter (12 weeks + 1 week off)
  for (let quarter = 1; quarter <= 4; quarter++) {
    for (let sprintIndex = 0; sprintIndex < 6; sprintIndex++) {
      let currentDate = dayjs().year(year).week(currentWeek).startOf('week')
      const days = []
      let fridaysFound = 0

      while (fridaysFound < 2) {
        if (currentDate.day() !== 0 && currentDate.day() !== 6) {
          days.push(currentDate.format('YYYY-MM-DD'))
          if (currentDate.day() === 5) fridaysFound++
        }
        currentDate = currentDate.add(1, 'day')
      }

      sprints.push({
        days,
        weeks: [currentWeek, currentWeek + 1],
      })

      currentWeek += 2
    }

    // Skip the "off week" at end of quarter (unless it's Q4)
    if (quarter < 4) {
      currentWeek += 1
    }
  }

  fs.writeFileSync(`sprints-${year.toString().slice(-2)}.json`, JSON.stringify(sprints, null, 2))

  console.log(
    `✅ Successfully generated ${sprints.length} sprints for ${year} in sprints-${year.toString().slice(-2)}.json`,
  )
}

const yearArg = process.argv[2]
generateSprints(yearArg ? parseInt(yearArg) : undefined)
