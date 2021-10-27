import { InstructionRI, InstructionRR } from '.'
import VM from '../VM'

export class MOVI extends InstructionRI {
  get opCode(): number {
    return 0x00
  }

  run(vm: VM): void {
    vm.setR(this.r!, this.i!)
  }

  toString(): string {
    return `movi r${this.r}, ${this.i}`
  }
}

export class MOV extends InstructionRR {
  get opCode(): number {
    return 0x01
  }

  run(vm: VM): void {
    vm.setR(this.r1!, vm.getR(this.r2!))
  }

  toString(): string {
    return `mov r${this.r1}, r${this.r2}`
  }
}
