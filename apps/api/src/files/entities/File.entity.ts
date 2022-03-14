import { Column, Index, PrimaryGeneratedColumn } from 'typeorm';

export abstract class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  key: string;
}
