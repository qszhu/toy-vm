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
}

export abstract class InstructionRR implements Instruction {
  public r1?: Register
  public r2?: Register

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
}

export abstract class InstructionRI implements Instruction {
  public r?: Register
  public i?: number
  private n?: number

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
    else if (this.n === 3) this.i = reader.readInt()
    else throw new Error('unsupported')
  }

  encode(writer: BinaryWriter) {
    writer.writeByte(this.opCode)
    writer.writeByte((this.r! << 4) | this.n!)
    if (this.n === 1) writer.writeByte(this.i!)
    else if (this.n === 2) writer.writeShort(this.i!)
    else if (this.n === 3) writer.writeInt(this.i!)
    else throw new Error('unsupported')
  }

  abstract run(vm: VM): void
}

export abstract class InstructionA implements Instruction {
  public a?: Register

  abstract get opCode(): number

  get bytes(): number {
    return 5
  }

  decode(reader: BinaryReader) {
    this.a = reader.readUInt()
  }

  encode(writer: BinaryWriter) {
    writer.writeByte(this.opCode)
    writer.writeInt(this.a!)
  }

  abstract run(vm: VM): void
}
