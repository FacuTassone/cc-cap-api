import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsEnum, IsString, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  instrumentId: number;

  @ApiProperty({ required: false, description: 'Cantidad de acciones a comprar/vender' })
  @IsOptional()
  @IsNumber()
  size?: number;

  @ApiProperty({ required: false, description: 'Monto total a invertir en pesos' })
  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @ApiProperty()
  @IsEnum(['MARKET', 'LIMIT'])
  type: 'MARKET' | 'LIMIT';

  @ApiProperty()
  @IsEnum(['BUY', 'SELL'])
  side: 'BUY' | 'SELL' | 'CASH_IN' | 'CASH_OUT';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  price?: number;
}
