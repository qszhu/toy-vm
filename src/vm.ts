import InstructionFactory from './instruction/factory'
import { QUIT } from './instruction/sys'
import BinaryReader from './io/reader'
import Register from './register'

export default class VM {
  private reg: Register[] = new Array(16).fill(0)
  private pc = 0
  private lt = false
  private eq = false
  private gt = false

  private reader: BinaryReader

  constructor(buf: Buffer) {
    this.reader = new BinaryReader(buf)
  }

  run() {
    while (true) {
      this.reader.pos = this.pc

      const inst = InstructionFactory.fetch(this.reader)
      if (!inst || inst instanceof QUIT) break

      this.pc += inst.bytes
      inst.run(this)
    }
  }

  setR(r: number, v: number) {
    this.reg[r] = v
  }

  getR(r: number): number {
    return this.reg[r]
  }

  compare(r1: number, r2: number) {
    const a = this.getR(r1)
    const b = this.getR(r2)
    this.lt = a < b
    this.eq = a === b
    this.gt = a > b
  }

  jump(a: number) {
    this.pc = a
  }

  jumpGT(a: number) {
    if (this.gt) this.jump(a)
  }
}
