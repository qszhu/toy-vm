export default class BinaryReader {
  private idx = 0

  constructor(private data: Buffer) {}

  get eof(): boolean {
    return this.idx >= this.data.length
  }

  set pos(idx: number) {
    this.idx = idx
  }

  get pos(): number {
    return this.idx
  }

  readByte(): number {
    return this.data.readUInt8(this.idx++)
  }

  readShort(): number {
    const res = this.data.readInt16BE(this.idx)
    this.idx += 2
    return res
  }

  readInt(): number {
    const res = this.data.readInt32BE(this.idx)
    this.idx += 4
    return res
  }

  readUInt(): number {
    const res = this.data.readUInt32BE(this.idx)
    this.idx += 4
    return res
  }
}
