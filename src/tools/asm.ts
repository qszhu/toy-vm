import fs from 'fs'
import { basename } from 'path'
import { InstructionA } from '../instruction'
import { ADD, ADDI } from '../instruction/add'
import { CMP, JGT, JMP } from '../instruction/branch'
import { MOV, MOVI } from '../instruction/mov'
import { PRINT, QUIT } from '../instruction/sys'
import BinaryWriter from '../io/writer'

function getBinFn(fn: string) {
  return `${basename(fn).split('.')[0]}.bin`
}

async function main(fn: string) {
  const src = fs.readFileSync(fn).toString()
  const lines = src
    .trim()
    .split('\n')
    .map((line) => line.trim().toLowerCase())

  const insts = []
  const lables = new Map<string, number>()
  let addr = 0

  for (const line of lines) {
    const op = line.split(' ', 1)[0]
    let inst
    if (op === 'movi') inst = new MOVI()
    else if (op === 'addi') inst = new ADDI()
    else if (op === 'mov') inst = new MOV()
    else if (op === 'add') inst = new ADD()
    else if (op === 'cmp') inst = new CMP()
    else if (op === 'jmp') inst = new JMP()
    else if (op === 'jgt') inst = new JGT()
    else if (op === 'print') inst = new PRINT()
    else if (op === 'quit') inst = new QUIT()
    else if (op.endsWith(':')) {
      // record label address
      const label = op.slice(0, op.length - 1)
      if (lables.has(label)) throw new Error(`Label already exists: ${label}`)

      lables.set(label, addr)
    } else throw new Error(`Unknown op: ${op}`)

    if (inst) {
      inst.fromString(line)
      insts.push(inst)
      addr += inst.bytes
    }
  }

  // write back label address
  for (const inst of insts) {
    if (inst instanceof InstructionA) {
      const a = lables.get(inst.a as string)
      if (!a) throw new Error(`Unknown label: ${inst.a}`)

      inst.a = a
    }
  }

  // write binary
  const size = insts.reduce((acc, inst) => acc + inst.bytes, 0)
  const writer = new BinaryWriter(size)
  for (const inst of insts) {
    inst.encode(writer)
  }
  fs.writeFileSync(getBinFn(fn), writer.getData())
}

if (require.main === module) {
  if (process.argv.length < 3) {
    console.log('Usage: node asm.js <asm>')
    process.exit(1)
  }
  main(process.argv[2]).catch(console.error)
}
