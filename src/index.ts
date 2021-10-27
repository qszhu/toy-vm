import VM from "./VM"

const code = Buffer.from([
  0x00, 0x11, 0x0a, // movi r1, 10
  0x00, 0x21, 0x00, // movi r2, 0
  0x00, 0x31, 0x01, // movi r3, 1
  0x00, 0x41, 0x02, // movi r4, 2
// loop:
  0x10, 0x41,       // cmp r4, r1
  0x21, 0x00, 0x00, 0x00, 0x21, // jgt end
  0x01, 0x52,       // mov r5, r2
  0x01, 0x23,       // mov r2, r3
  0x31, 0x35,       // add r3, r5
  0x30, 0x41, 0x01, // addi r4, 1
  0x20, 0x00, 0x00, 0x00, 0x0c, // jmp loop
// end:
  0xfe, 0x03,       // print r3
  0xff,             // quit
])
const vm = new VM(code)
vm.run()