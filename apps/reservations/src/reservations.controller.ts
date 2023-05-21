import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    try {
      return this.reservationsService.create({
        ...createReservationDto,
        endDate: new Date(),
      });
    } catch (err) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const reservations = await this.reservationsService.findAll();

      if (reservations.length > 0) {
        return reservations;
      }

      return new HttpException('Not Found', HttpStatus.NOT_FOUND);
    } catch (err) {
      return new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.reservationsService.findOne(_id);
  }

  @Patch(':id')
  update(
    @Param('id') _id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(_id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') _id: string) {
    return this.reservationsService.remove(_id);
  }
}
