const fs = require('fs')

const SPRINT_IDENTITIES = [
  { name: 'New Year Sprint', emoji: '🎯' },
  { name: 'MLK Dream Sprint', emoji: '✊' },
  { name: 'Groundhog Glory', emoji: '🦫' },
  { name: 'Heart Presidents', emoji: '🎩' },
  { name: 'Leap Year Leap', emoji: '🦘' },
  { name: 'Shamrock Sprint', emoji: '☘️' },
  { name: 'Easter Hop', emoji: '🐰' },
  { name: 'Tax Trek', emoji: '📊' },
  { name: 'Mayo Fiesta', emoji: '🪅' },
  { name: 'Thirty Eight', emoji: '🎂' },
  { name: 'Memorial March', emoji: '🎖️' },
  { name: 'Juneteenth Journey', emoji: '⭐' },
  { name: 'Independence Dash', emoji: '🎆' },
  { name: 'Midsummer Surge', emoji: '🌊' },
  { name: 'August Ascent', emoji: '🚀' },
  { name: 'Back to School', emoji: '📚' },
  { name: 'Labor Day Launch', emoji: '🛠️' },
  { name: 'Fall Forward', emoji: '🍂' },
  { name: 'October Opening', emoji: '🎃' },
  { name: 'Harvest Hustle', emoji: '🌾' },
  { name: 'Halloween Hurrah', emoji: '👻' },
  { name: 'Veterans Victory', emoji: '🎖️' },
  { name: 'Turkey Trot', emoji: '🦃' },
  { name: 'December Dash', emoji: '🎄' },
]

// Find all sprints-*.json files
const sprintFiles = fs.readdirSync('.').filter(file => file.match(/^sprints-\d{2}\.json$/))

sprintFiles.forEach(file => {
  const sprints = JSON.parse(fs.readFileSync(file, 'utf8'))

  // Apply identities to each sprint
  sprints.forEach((sprint, index) => {
    if (index < SPRINT_IDENTITIES.length) {
      sprint.name = SPRINT_IDENTITIES[index].name
      sprint.emoji = SPRINT_IDENTITIES[index].emoji
    }
  })

  // Write back to file
  fs.writeFileSync(file, JSON.stringify(sprints, null, 2))
  console.log(`✅ Added identities to ${file}`)
})
