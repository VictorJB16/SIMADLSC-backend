import { CreateDirigidoADto } from './create-dirigido-a.dto';
import { PartialType} from '@nestjs/mapped-types';

export class UpdateDirigidoADto extends PartialType(CreateDirigidoADto) {}
