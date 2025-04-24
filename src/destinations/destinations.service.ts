import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { AbstractService } from 'src/common/abstract.service';
import { Destination } from './entities/destination.entity';
import { QueryDestinationsDto } from './dto/query-destination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DestinationsService extends AbstractService<
  QueryDestinationsDto,
  Destination
> {
  private readonly gCloudStorage: Storage;
  constructor(
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>,
    private readonly configService: ConfigService,
  ) {
    super(destinationRepository);
    this.gCloudStorage = new Storage({
      projectId: this.configService.get<string>('GCP_PROJECT_ID'),
    });
  }

  async upload(file: Express.Multer.File) {
    const bucketName = this.configService.get<string>('GCP_BUCKET');
    if (!bucketName) throw new Error('GCP_BUCKET is not set');
    const fileName = `${new Date().getTime()}-${file.originalname}`;
    await this.gCloudStorage
      .bucket(bucketName)
      .file(fileName)
      .save(file.buffer, {
        public: true,
        contentType: file.mimetype,
      });
    return `https://storage.googleapis.com/${bucketName}/${fileName}`;
  }

  async create(
    createDestinationDto: CreateDestinationDto,
    file?: Express.Multer.File,
  ) {
    try {
      return await this.destinationRepository.manager.transaction(
        async (entityManager: EntityManager) => {
          const destination = entityManager.create(
            Destination,
            createDestinationDto,
          );

          const savedDestination = await entityManager.save(
            Destination,
            destination,
          );

          if (file) {
            savedDestination.media = await this.upload(file);
            await entityManager.save(Destination, destination);
          }

          return savedDestination;
        },
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
