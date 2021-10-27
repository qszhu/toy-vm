export default class BinaryWriter {
  private idx = 0
  private data: Buffer

  constructor(private cap: number) {
    this.data = Buffer.alloc(cap)
  }

  writeByte(n: number) {
    if (this.idx + 1 >= this.cap) throw new Error('buffer overflow')

    this.data.writeUInt8(n, this.idx++)
  }

  writeShort(n: number) {
    if (this.idx + 2 >= this.cap) throw new Error('buffer overflow')

    this.data.writeInt16BE(n, this.idx)
    this.idx += 2
  }

  writeInt(n: number) {
    if (this.idx + 4 >= this.cap) throw new Error('buffer overflow')

    this.data.writeInt32BE(n, this.idx)
    this.idx += 4
  }

  getData(): Buffer {
    return this.data.slice(0, this.idx)
  }
}