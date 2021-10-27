import { InstructionA, InstructionRR } from '.'
import VM from '../VM'

export class CMP extends InstructionRR {
  get opCode(): number {
    return 0x10
  }

  run(vm: VM): void {
    vm.compare(this.r1!, this.r2!)
  }

  toString(): string {
    return `cmp r${this.r1}, r${this.r2}`
  }
}

export class JMP extends InstructionA {
  get opCode(): number {
    return 0x20
  }

  run(vm: VM): void {
    vm.jump(this.a as number)
  }

  toString(): string {
    return `jmp ${this.a}`
  }
}

export class JGT extends InstructionA {
  get opCode(): number {
    return 0x21
  }

  run(vm: VM): void {
    vm.jumpGT(this.a as number)
  }

  toString(): string {
    return `jgt ${this.a}`
  }
}
