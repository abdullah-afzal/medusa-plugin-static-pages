import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/utils"
import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm"

@Entity()
export class Page extends BaseEntity {

   @Index({ unique: true })
   @Column({ type: "varchar", nullable: false })
   handle: string

   @Column({ type: "varchar", nullable: false })
   title: string

   @Column({ type: "jsonb", nullable: true })
   metadata: string | null

   @Column({ type: "text", nullable: true })
   body: string | null

   @BeforeInsert()
   private beforeInsert(): void {
      this.id = generateEntityId(this.id, "page")
   }
}