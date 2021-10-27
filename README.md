### Requirements
* Node.js v12+

### Install
```bash
$ npm i
$ npm run build
```

### Run
```bash
# assembler
$ node dist/tools/asm.js asm/fib.asm 

# disassembler
$ node dist/tools/dasm.js fib.bin
[0] movi r1, 10
[3] movi r2, 0
[6] movi r3, 1
[9] movi r4, 2
[12] cmp r4, r1
[14] jgt 33
[19] mov r5, r2
[21] mov r2, r3
[23] add r3, r5
[25] addi r4, 1
[28] jmp 12
[33] print r3

# interpreter
$ node dist/index.js fib.bin 
55
```