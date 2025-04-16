import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ExpenseCategory } from '../entity/expense.entity';

export class CreateExpenseDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(ExpenseCategory)
  category: ExpenseCategory;
}
