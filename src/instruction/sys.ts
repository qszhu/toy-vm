import Instruction from '.'
import reader from '../io/reader'
import writer from '../io/writer'
import Register from '../Register'
import VM from '../VM'

export class PRINT implements Instruction {
  public r?: Register

  get opCode(): number {
    return 0xfe
  }

  get bytes(): number {
    return 2
  }

  decode(reader: reader): void {
    this.r = reader.readByte()
  }

  encode(writer: writer): void {
    writer.writeByte(this.opCode)
    writer.writeByte(this.r!)
  }

  run(vm: VM): void {
    console.log(vm.getR(this.r!))
  }

  toString(): string {
    return `print r${this.r}`
  }
}

export class QUIT implements Instruction {
  get opCode(): number {
    return 0xff
  }
  get bytes(): number {
    return 1
  }

  decode(reader: reader): void {}

  encode(writer: writer): void {
    writer.writeByte(this.opCode)
  }

  run(vm: VM): void {}

  toString(): string {
    return 'quit'
  }
}
