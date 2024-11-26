const { execSync } = require('child_process')

function generateSprints(year = new Date().getFullYear()) {
  console.log(`\n🗓️  Generating sprints for ${year}...`)

  try {
    // Generate base sprint file
    execSync(`node weeks.js ${year}`, { stdio: 'inherit' })

    // Add holiday adjustments
    execSync(`node holidays.js ${year}`, { stdio: 'inherit' })

    // Add sprint identities
    execSync(`node ids.js`, { stdio: 'inherit' })

    console.log('\n✨ Sprint file generated successfully!')
  } catch (error) {
    console.error(`❌ Error processing year ${year}:`, error.message)
    process.exit(1)
  }
}

const yearArg = process.argv[2]
generateSprints(yearArg ? parseInt(yearArg) : undefined)
