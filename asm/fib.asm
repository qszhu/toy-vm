        movi r1, 10
        movi r2, 0
        movi r3, 1
        movi r4, 2
loop:
        cmp r4, r1
        jgt end
        mov r5, r2
        mov r2, r3
        add r3, r5
        addi r4, 1
        jmp loop
end:
        print r3