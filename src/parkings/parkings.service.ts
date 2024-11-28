import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Parking } from './entities/parking.entity';

@Injectable()
export class ParkingsService {
    private readonly logger = new Logger('ParkingsService');

    constructor(
        @InjectRepository(Parking)
        private readonly parkingRepository: Repository<Parking>,
        private readonly dataSource: DataSource,
    ) {}

    findAll(paginationDto: PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        return this.parkingRepository.find({
            relations: ['offers','announcements', 'rules'],

        });
    }

    async findOne(id: string) {
        const parking = await this.parkingRepository
            .createQueryBuilder('parking')
            .leftJoinAndSelect('parking.offers', 'offers')
            .leftJoinAndSelect('parking.announcements', 'announcements')
            .leftJoinAndSelect('parking.rules', 'rules')
            .where('parking.id = :id', { id })
            .getOne();


        if (!parking) {
            throw new NotFoundException(`Parking with id ${id} not found`);
        }

        return parking;
    }

    async update(id: string, updateParkingDto: UpdateParkingDto) {
        const { idManager, ...toUpdate } = updateParkingDto;

        // First check if the parking exists
        const exists = await this.parkingRepository.findOne({ where: { id } });
        if (!exists) {
            throw new NotFoundException(`Parking with id ${id} not found`);
        }

        // Create the update object
        const parking = await this.parkingRepository.create({
            ...exists,
            ...toUpdate,
            manager: idManager ? { id: idManager } : exists.manager,
        });

        // Create Query Runner
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(parking);
            await queryRunner.commitTransaction();
            return this.findOne(id);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException('Error updating parking data');
        } finally {
            await queryRunner.release();
        }
    }

    async remove(id: string) {
        try {
            const parking = await this.parkingRepository.findOne({ 
                where: { id } 
            });
            
            if (!parking) {
                throw new NotFoundException(`Parking with id ${id} not found`);
            }

            await this.parkingRepository.remove(parking);
            
            return {
                message: `Parking with id ${id} was successfully deleted.`
            };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error while removing parking');
        }
    }

    async deleteAllParkings() {
        try {
            return await this.parkingRepository
                .createQueryBuilder('parking')
                .delete()
                .execute();
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }
}