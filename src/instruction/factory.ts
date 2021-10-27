import BinaryReader from '../io/reader'
import { ADD, ADDI } from './add'
import { CMP, JGT, JMP } from './branch'
import { MOV, MOVI } from './mov'
import { PRINT, QUIT } from './sys'

export default class InstructionFactory {
  private static next(reader: BinaryReader) {
    const opCode = reader.readByte()
    if (opCode === 0x00) return new MOVI()
    if (opCode === 0x01) return new MOV()
    if (opCode === 0x10) return new CMP()
    if (opCode === 0x20) return new JMP()
    if (opCode === 0x21) return new JGT()
    if (opCode === 0x30) return new ADDI()
    if (opCode === 0x31) return new ADD()
    if (opCode === 0xfe) return new PRINT()
    if (opCode === 0xff) return new QUIT()
    throw new Error(`unknown instruction: ${opCode}`)
  }

  static fetch(reader: BinaryReader) {
    if (reader.eof) return

    const inst = this.next(reader)
    inst.decode(reader)
    return inst
  }
}
