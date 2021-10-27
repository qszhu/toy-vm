import fs from 'fs'
import InstructionFactory from '../instruction/factory'
import BinaryReader from '../io/reader'

async function main(fn: string) {
  const buf = fs.readFileSync(fn)
  const reader = new BinaryReader(buf)
  while (true) {
    const pos = reader.pos
    const inst = InstructionFactory.fetch(reader)
    if (!inst) break
    console.log(`[${pos}] ${inst.toString()}`)
  }
}

if (require.main === module) {
  if (process.argv.length < 3) {
    console.log('Usage: node dasm.js <bin>')
    process.exit(1)
  }
  main(process.argv[2]).catch(console.error)
}
