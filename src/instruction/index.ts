import BinaryReader from '../io/reader'
import BinaryWriter from '../io/writer'
import Register from '../Register'
import VM from '../VM'

export default interface Instruction {
  get opCode(): number
  get bytes(): number
  decode(reader: BinaryReader): void
  encode(writer: BinaryWriter): void
  run(vm: VM): void
  fromString(s: string): void
}

export abstract class InstructionRR implements Instruction {
  constructor(public r1?: Register, public r2?: Register) {}

  get opCode(): number {
    throw new Error('Method not implemented.')
  }

  get bytes(): number {
    return 2
  }

  decode(reader: BinaryReader) {
    const b = reader.readByte()
    this.r1 = (b & 0xf0) >> 4
    this.r2 = b & 0x0f
  }

  encode(writer: BinaryWriter) {
    writer.writeByte(this.opCode)
    writer.writeByte((this.r1! << 4) | this.r2!)
  }

  abstract run(vm: VM): void

  fromString(s: string) {
    const [_, ...rest] = s.trim().split(' ')
    const [a, b] = rest
    ;[this.r1, this.r2] = [Number(a[1]), Number(b[1])]
  }
}

function getBytes(i: number) {
  const byte = 2 ** 7
  if (i >= -byte && i < byte) return 1

  const short = 2 ** 15
  if (i >= -short && i < short) return 2

  const int = 2 ** 31
  if (i >= -int && i < int) return 4

  throw new Error('number too big')
}

export abstract class InstructionRI implements Instruction {
  private n?: number

  constructor(public r?: Register, public i?: number) {
    if (this.i !== undefined) this.n = getBytes(this.i!)
  }

  abstract get opCode(): number

  get bytes(): number {
    return 2 + this.n!
  }

  decode(reader: BinaryReader) {
    const b = reader.readByte()
    this.r = (b & 0xf0) >> 4
    this.n = b & 0x0f
    if (this.n === 1) this.i = reader.readByte()
    else if (this.n === 2) this.i = reader.readShort()
    else if (this.n === 4) this.i = reader.readInt()
    else throw new Error('unsupported')
  }

  encode(writer: BinaryWriter) {
    writer.writeByte(this.opCode)
    writer.writeByte((this.r! << 4) | this.n!)
    if (this.n === 1) writer.writeByte(this.i!)
    else if (this.n === 2) writer.writeShort(this.i!)
    else if (this.n === 4) writer.writeInt(this.i!)
    else throw new Error('unsupported')
  }

  abstract run(vm: VM): void

  fromString(s: string) {
    const [_, ...rest] = s.trim().split(' ')
    const [a, b] = rest
    ;[this.r, this.i] = [Number(a[1]), Number(b)]
    this.n = getBytes(this.i)
  }
}

export abstract class InstructionA implements Instruction {
  constructor(public a?: number | string) {}

  abstract get opCode(): number

  get bytes(): number {
    return 5
  }

  decode(reader: BinaryReader) {
    this.a = reader.readUInt()
  }

  encode(writer: BinaryWriter) {
    writer.writeByte(this.opCode)
    writer.writeInt(this.a as number)
  }

  abstract run(vm: VM): void

  fromString(s: string) {
    const [_, ...rest] = s.trim().split(' ')
    const [label] = rest
    this.a = label
  }
}
