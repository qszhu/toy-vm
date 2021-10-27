import { InstructionRI, InstructionRR } from '.'
import VM from '../VM'

export class ADDI extends InstructionRI {
  get opCode(): number {
    return 0x30
  }

  run(vm: VM): void {
    vm.setR(this.r!, vm.getR(this.r!) + this.i!)
  }

  toString(): string {
    return `addi r${this.r}, ${this.i}`
  }
}

export class ADD extends InstructionRR {
  get opCode(): number {
    return 0x31
  }

  run(vm: VM): void {
    vm.setR(this.r1!, vm.getR(this.r1!) + vm.getR(this.r2!))
  }

  toString(): string {
    return `add r${this.r1}, r${this.r2}`
  }
}
