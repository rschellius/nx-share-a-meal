/**
 * Base class for all entities that are part of communication to/from services.
 */
export abstract class Entity {
  readonly id?: number | undefined
  readonly userid?: number | undefined

  constructor(values: any) {
    this.id = values ? values.id : undefined
    this.userid = values ? values.userid : undefined
  }
}
