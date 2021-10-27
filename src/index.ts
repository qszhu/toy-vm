import fs from 'fs'
import VM from './VM'

async function main(fn: string) {
  const code = fs.readFileSync(fn)
  const vm = new VM(code)
  vm.run()
}

if (require.main === module) {
  if (process.argv.length < 3) {
    console.log('Usage: node indexjs <bin>')
    process.exit(1)
  }
  main(process.argv[2]).catch(console.error)
}
