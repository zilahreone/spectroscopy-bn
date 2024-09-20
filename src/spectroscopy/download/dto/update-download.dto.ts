import { IntersectionType } from '@nestjs/swagger';
import { AdditionalCreateDownloadInfo, CreateDownloadDto } from './create-download.dto';

export class UpdateDownloadDto extends IntersectionType(CreateDownloadDto, AdditionalCreateDownloadInfo) {}
