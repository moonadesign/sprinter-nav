const dayjs = require('dayjs')
const weekOfYear = require('dayjs/plugin/weekOfYear')
const fs = require('fs')

dayjs.extend(weekOfYear)

function generateSprints(year = new Date().getFullYear()) {
  const sprints = []

  for (let quarter = 1; quarter <= 4; quarter++) {
    const quarterStartMonth = (quarter - 1) * 3

    for (let sprintIndex = 0; sprintIndex < 6; sprintIndex++) {
      let currentDate = dayjs(`${year}-${(quarterStartMonth + 1).toString().padStart(2, '0')}-01`).add(
        sprintIndex * 14,
        'day',
      )

      const days = []
      let daysAdded = 0

      while (daysAdded < 10) {
        if (currentDate.day() !== 0 && currentDate.day() !== 6) {
          days.push(currentDate.format('YYYY-MM-DD'))
          daysAdded++
        }
        currentDate = currentDate.add(1, 'day')
      }

      const startWeek = dayjs(days[0]).week()

      sprints.push({
        days,
        weeks: [startWeek, startWeek + 1],
      })
    }
  }

  const output = `export const sprints = ${JSON.stringify(sprints, null, 2)};`
  fs.writeFileSync(`sprints-${year.toString().slice(-2)}.js`, output)

  console.log(
    `✅ Successfully generated ${sprints.length} sprints for ${year} in sprints-${year.toString().slice(-2)}.js`,
  )
}

generateSprints(2024)
