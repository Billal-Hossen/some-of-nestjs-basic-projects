import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateProductDto } from './dtos/create.product.dto';
import { UpdateProductDto } from './dtos/update.product.dto';
import { ProductDocument } from './product.schema';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDocument> {
    console.log(createProductDto);
    return this.productService.createProduct(createProductDto);
  }
  @Get()
  async getAllProduct(): Promise<ProductDocument[]> {
    return this.productService.getAllProduct();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:productId')
  getProductById(@Param('productId') productId: string) {
    console.log(productId);
    return this.productService.getProductById(productId);
  }
  @Put('/:productId')
  @UsePipes(ValidationPipe)
  async updateProduct(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const { newPrice } = updateProductDto;
    console.log(typeof newPrice);
    return this.productService.updateProduct(productId, updateProductDto);
  }
  @Delete('/:productId')
  deleteProductById(@Param('productId') productId: string) {
    return this.productService.deleteProductById(productId);
  }
}
