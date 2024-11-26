async function loadSprints(year = '24') {
  const response = await fetch(`sprints-${year}.json`)
  const sprints = await response.json()
  const container = document.getElementById('sprints')
  container.innerHTML = '' // Clear existing sprints

  // Update the year in h1
  document.querySelector('h1').textContent = `20${year}`

  // Group sprints into quarters (6 sprints per quarter)
  for (let quarter = 0; quarter < 4; quarter++) {
    const quarterDiv = document.createElement('div')
    quarterDiv.className = 'quarter'
    quarterDiv.innerHTML = `<h2>Q${quarter + 1}</h2>`

    const sprintsInQuarter = sprints.slice(quarter * 6, (quarter + 1) * 6)

    sprintsInQuarter.forEach(sprint => {
      const div = document.createElement('div')
      div.className = 'sprint'

      // Group days into weeks
      const weeks = []
      let currentWeek = []
      sprint.days?.forEach(date => {
        const day = new Date(date + 'T00:00:00')
        currentWeek.push(day)
        if (day.getDay() === 5 || date === sprint.days[sprint.days.length - 1]) {
          // Friday or last day
          // Pad the week with empty days if needed
          while (currentWeek.length < 5) {
            currentWeek.push(null)
          }
          weeks.push(currentWeek)
          currentWeek = []
        }
      })

      div.innerHTML = `
        <div class="sprint-info">
          <div>${sprint.name}</div>
          <div class="sprint-emoji">${sprint.emoji}</div>
        </div>
        <div class="days">
          ${weeks
            .map(
              week => `
            <div class="week">
              ${week
                .map(day => (day ? `<div class="day">${day.getDate()}</div>` : `<div class="day empty"></div>`))
                .join('')}
            </div>
          `,
            )
            .join('')}
        </div>
      `
      quarterDiv.appendChild(div)
    })

    container.appendChild(quarterDiv)
  }
}

function setupTabs() {
  const years = ['24', '25']
  const tabsContainer = document.getElementById('year-tabs')

  years.forEach(year => {
    const tab = document.createElement('button')
    tab.textContent = `20${year}`
    tab.onclick = () => {
      // Update active tab
      document.querySelectorAll('#year-tabs button').forEach(t => t.classList.remove('active'))
      tab.classList.add('active')
      // Load sprints for selected year
      loadSprints(year)
    }
    tabsContainer.appendChild(tab)
  })

  // Activate first tab
  tabsContainer.firstChild.click()
}

document.addEventListener('DOMContentLoaded', setupTabs)
